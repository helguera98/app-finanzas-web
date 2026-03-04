<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import { updateHeader, headerStore } from "../stores/headerStore";
    import { showToast } from "../stores/toastStore";
    const dispatch = createEventDispatcher();

    export let data = null;

    let transactionType = "expense"; // "expense" or "income"
    let categories = [];
    let loading = true;
    let selectedCategoryId = null;
    let amount = "";
    let date = new Date().toISOString().split("T")[0];
    let description = "";
    let isBill = false;
    let linkedBillId = null;
    let recurringBills = [];
    let isSaving = false;

    // Form Validation Reactive Statement
    $: isAmountValid = parseFloat(amount) > 0;
    $: isCategoryValid = selectedCategoryId !== null;
    $: isBillValid = !isBill || (isBill && linkedBillId !== null);
    $: isFormValid = isAmountValid && isCategoryValid && isBillValid;

    // Update Header Dynamic Title & Save Button State
    $: {
        updateHeader({
            title: transactionType === "expense" ? "NEW EXPENSE" : "NEW INCOME",
            rightIcon: "check",
            rightAction: handleSave,
            rightDisabled: !isFormValid,
            loading: isSaving,
        });
    }

    onMount(async () => {
        if (data && data.type) {
            transactionType = data.type;
        }

        try {
            const [cats, bills] = await Promise.all([
                api.getCategories(),
                api.getBills(),
            ]);
            categories = cats;
            recurringBills = bills.filter((b) => b.status !== "paid"); // Only show unpaid bills
        } catch (e) {
            console.error("Error loading initial data:", e);
        } finally {
            loading = false;
        }
    });

    /**
     * Amount input handling
     */
    function handleAmountInput(e) {
        let val = e.target.value.replace(/[^0-9.]/g, "");
        // Limit to 2 decimal places
        if (val.includes(".")) {
            const parts = val.split(".");
            val = parts[0] + "." + parts[1].slice(0, 2);
        }
        amount = val;
    }

    function addAmount(val) {
        const current = parseFloat(amount) || 0;
        amount = (current + val).toFixed(2);
    }

    async function handleSave() {
        if (!isFormValid || isSaving) return;

        isSaving = true;
        try {
            const transactionData = {
                amount: parseFloat(amount),
                description:
                    description ||
                    (transactionType === "expense" ? "Gasto" : "Ingreso"),
                date: date,
                type: transactionType,
                category_id: selectedCategoryId,
                is_bill: isBill,
                bill_id: isBill ? linkedBillId : null,
            };

            await api.createTransaction(transactionData);

            showToast(
                `${transactionType === "expense" ? "Expense" : "Income"} Added Successfully`,
            );
            dispatch("navigate", "home");
        } catch (e) {
            console.error("[NewTransaction] Save error:", e);
            alert("Error al guardar transacción: " + e.message);
        } finally {
            isSaving = false;
        }
    }

    function close() {
        // TODO: Implement "Discard changes?" modal if amount or description is set
        dispatch("navigate", "home");
    }

    function formatDateDisplay(dateStr) {
        const d = new Date(dateStr);
        const today = new Date().toISOString().split("T")[0];
        const label = dateStr === today ? "Today" : "";
        const options = { month: "short", day: "numeric", year: "numeric" };
        return `${label ? label + " — " : ""}${d.toLocaleDateString("en-US", options)}`;
    }

    // Dynamic helpers
    $: activeColor =
        transactionType === "expense" ? "text-red-500" : "text-emerald-400";
    $: activeBg =
        transactionType === "expense" ? "bg-red-500/10" : "bg-emerald-500/10";
    $: activeBorder =
        transactionType === "expense"
            ? "border-red-500/40"
            : "border-emerald-500/40";
    $: headerMsg =
        transactionType === "expense"
            ? "Tracking your spending..."
            : "Recording your earnings...";
</script>

<div
    class="transaction-page-container bg-background-dark font-display text-slate-100 h-screen w-full flex flex-col relative overflow-y-auto hide-scrollbar"
>
    <!-- Decorative background elements -->
    <div
        class="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/5 blur-[120px] rounded-full"
    ></div>
    <div
        class="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-gold/5 blur-[120px] rounded-full"
    ></div>

    <div
        class="relative w-full max-w-md mx-auto my-auto flex flex-col min-h-full py-4 pb-20"
    >
        <!-- Dynamic Action Message -->
        <div class="px-6 py-2 z-10 text-center">
            <p
                class="text-[10px] font-black uppercase tracking-[0.3em] {activeColor} opacity-80"
            >
                {headerMsg}
            </p>
        </div>

        <!-- Amount Display -->
        <div class="flex flex-col items-center justify-center py-12 px-6 z-10">
            <span
                class="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50"
                >Enter Amount</span
            >
            <div class="flex flex-col items-center gap-6 w-full">
                <div class="flex items-baseline gap-2">
                    <span class="text-slate-600 text-4xl font-light">$</span>
                    <input
                        class="bg-transparent border-none {activeColor} text-7xl font-black focus:ring-0 w-full text-center placeholder-slate-900 transition-colors duration-500"
                        placeholder="0.00"
                        type="text"
                        inputmode="decimal"
                        bind:value={amount}
                        on:input={handleAmountInput}
                    />
                </div>

                <!-- Quick Amount Buttons -->
                <div class="flex gap-3">
                    {#each [10, 20, 50] as val}
                        <button
                            type="button"
                            class="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-gold hover:border-gold/30 transition-all active:scale-95"
                            on:click={() => addAmount(val)}
                        >
                            +{val}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Category Scroller -->
        <div class="flex flex-col gap-5 z-10">
            <div class="flex items-center justify-between px-8">
                <h3
                    class="text-[10px] font-black uppercase tracking-widest {isCategoryValid
                        ? 'text-slate-500'
                        : 'text-red-400/80 animate-pulse'}"
                >
                    {isCategoryValid
                        ? "Select Category"
                        : "Select category (required)"}
                </h3>
            </div>
            <div class="flex gap-5 overflow-x-auto px-8 pb-6 hide-scrollbar">
                {#if loading}
                    <div class="flex gap-5">
                        {#each Array(4) as _}
                            <div
                                class="size-16 rounded-full bg-white/5 animate-pulse"
                            ></div>
                        {/each}
                    </div>
                {:else}
                    {#each categories as category}
                        <div
                            class="flex flex-col items-center gap-3 shrink-0 group relative"
                        >
                            <button
                                type="button"
                                class="size-16 rounded-full border flex items-center justify-center transition-all duration-300 relative {selectedCategoryId ===
                                category.id
                                    ? `${activeBorder} ${activeBg} ${activeColor} shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]`
                                    : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/10'}"
                                on:click={() =>
                                    (selectedCategoryId = category.id)}
                            >
                                <span
                                    class="material-symbols-outlined text-2xl group-active:scale-90 transition-transform"
                                    >{category.icon}</span
                                >

                                {#if selectedCategoryId === category.id}
                                    <div
                                        class="absolute -top-1 -right-1 size-5 rounded-full bg-gold flex items-center justify-center border-2 border-background-dark shadow-lg"
                                    >
                                        <span
                                            class="material-symbols-outlined text-black text-[14px] font-black"
                                            >check</span
                                        >
                                    </div>
                                {/if}
                            </button>
                            <span
                                class="text-[10px] uppercase tracking-widest font-black {selectedCategoryId ===
                                category.id
                                    ? activeColor
                                    : 'text-slate-600'}">{category.name}</span
                            >
                        </div>
                    {/each}

                    <!-- More categories placeholder -->
                    <div
                        class="flex flex-col items-center gap-3 shrink-0 group opacity-40"
                    >
                        <button
                            type="button"
                            class="size-16 rounded-full border border-dashed border-white/20 flex items-center justify-center hover:border-white/40 transition-all"
                        >
                            <span
                                class="material-symbols-outlined text-2xl text-slate-500"
                                >add</span
                            >
                        </button>
                        <span
                            class="text-[10px] uppercase tracking-widest font-black text-slate-600"
                            >More</span
                        >
                    </div>

                    {#if categories.length === 0}
                        <div
                            class="text-[10px] uppercase font-black text-slate-600"
                        >
                            No hay categorías disponibles
                        </div>
                    {/if}
                {/if}
            </div>
        </div>

        <!-- Details Form -->
        <div class="flex flex-col gap-4 px-6 mt-2 z-10">
            <!-- Date Picker Card -->
            <label
                class="flex items-center gap-5 bg-card-dark border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-all cursor-pointer group active:scale-[0.98]"
            >
                <div
                    class="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-colors"
                >
                    <span class="material-symbols-outlined">calendar_today</span
                    >
                </div>
                <div class="flex flex-col grow">
                    <span
                        class="text-slate-500 text-[9px] uppercase font-black tracking-[0.2em] mb-1"
                        >Transaction Date</span
                    >
                    <span class="text-slate-100 font-bold text-sm">
                        {formatDateDisplay(date)}
                    </span>
                    <input class="sr-only" type="date" bind:value={date} />
                </div>
                <span class="material-symbols-outlined text-slate-700"
                    >chevron_right</span
                >
            </label>

            <!-- Description -->
            <div
                class="flex items-center gap-5 bg-card-dark border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-colors"
            >
                <div
                    class="size-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-500 border border-white/5"
                >
                    <span class="material-symbols-outlined">notes</span>
                </div>
                <div class="flex flex-col grow">
                    <span
                        class="text-slate-500 text-[9px] uppercase font-black tracking-[0.2em] mb-1"
                        >Description (Optional)</span
                    >
                    <input
                        class="bg-transparent border-none p-0 text-slate-100 font-bold focus:ring-0 text-sm placeholder-slate-700"
                        placeholder={transactionType === "expense"
                            ? "Example: Starbucks Coffee"
                            : "Example: Monthly Salary"}
                        type="text"
                        bind:value={description}
                    />
                </div>
            </div>

            <!-- Bill Toggle & Linked Bill Selector -->
            <div
                class="flex flex-col bg-card-dark border border-white/5 rounded-[32px] overflow-hidden transition-all {isBill
                    ? 'ring-1 ring-gold/20'
                    : ''}"
            >
                <div
                    class="flex items-center justify-between p-5 hover:border-white/10 transition-colors"
                >
                    <div class="flex items-center gap-5">
                        <div
                            class="size-12 rounded-2xl {isBill
                                ? 'bg-gold text-black'
                                : 'bg-gold/10 text-gold'} flex items-center justify-center border border-gold/10 transition-colors"
                        >
                            <span class="material-symbols-outlined"
                                >receipt_long</span
                            >
                        </div>
                        <div class="flex flex-col">
                            <span class="text-slate-100 font-bold text-sm"
                                >Bill Payment</span
                            >
                            <span
                                class="text-slate-500 text-[10px] uppercase font-bold tracking-widest"
                                >{isBill
                                    ? "Linked to recurring"
                                    : "Not linked"}</span
                            >
                        </div>
                    </div>
                    <!-- Custom Toggle Switch -->
                    <button
                        class="relative w-12 h-7 rounded-full transition-all duration-300 {isBill
                            ? 'bg-gold'
                            : 'bg-slate-800'}"
                        on:click={() => (isBill = !isBill)}
                    >
                        <div
                            class="absolute top-1 left-1 size-5 rounded-full bg-white transition-transform duration-300 {isBill
                                ? 'translate-x-5 shadow-lg shadow-black/20'
                                : ''}"
                        ></div>
                    </button>
                </div>

                {#if isBill}
                    <div
                        class="px-5 pb-5 pt-0 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                        <div class="h-px bg-white/5 w-full mb-2"></div>
                        <span
                            class="text-slate-500 text-[9px] uppercase font-black tracking-[0.2em]"
                            >Choose bill to link</span
                        >
                        <div class="grid grid-cols-1 gap-2">
                            {#if recurringBills.length === 0}
                                <p class="text-[10px] text-slate-600 italic">
                                    No pending bills found
                                </p>
                            {:else}
                                {#each recurringBills as bill}
                                    <button
                                        class="flex items-center justify-between p-3 rounded-2xl border transition-all {linkedBillId ===
                                        bill.id
                                            ? 'bg-gold/10 border-gold/40 text-gold'
                                            : 'bg-white/5 border-white/5 text-slate-400'}"
                                        on:click={() =>
                                            (linkedBillId = bill.id)}
                                    >
                                        <div class="flex flex-col items-start">
                                            <span class="text-xs font-bold"
                                                >{bill.name}</span
                                            >
                                            <span class="text-[10px] opacity-60"
                                                >${bill.amount} — Due {bill.due_date}</span
                                            >
                                        </div>
                                        {#if linkedBillId === bill.id}
                                            <span
                                                class="material-symbols-outlined text-sm"
                                                >check_circle</span
                                            >
                                        {/if}
                                    </button>
                                {/each}
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Floating Action Button Area (Hidden if button is in header, but user might want a backup or specific layout) -->
        <!-- We keep it but styled as a secondary visual or removed to match "Check in header" -->
        <div class="mt-auto p-6 pt-10 z-10 opacity-30 pointer-events-none">
            <p
                class="text-center text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] italic opacity-50"
            >
                Ensuring your wealth stays trackable
            </p>
        </div>
    </div>
</div>

<style>
    .transaction-page-container {
        z-index: 100;
    }
</style>
