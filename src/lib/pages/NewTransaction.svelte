<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import TopHeader from "../components/TopHeader.svelte";
    const dispatch = createEventDispatcher();

    export let data = null;

    let transactionType = "expense"; // "expense" or "income"
    let categories = [];
    let loading = true;
    let selectedCategoryId = null;

    onMount(async () => {
        if (data && data.type) {
            transactionType = data.type;
        }

        try {
            categories = await api.getCategories();
            if (categories.length > 0) {
                selectedCategoryId = categories[0].id;
            }
        } catch (e) {
            console.error("Error loading categories:", e);
        } finally {
            loading = false;
        }
    });

    let amount = "0.00";
    let date = new Date().toISOString().split("T")[0];
    let description = "";
    let isBill = false;

    async function handleSave() {
        if (loading) return;

        const token = localStorage.getItem("auth_token");
        console.log(
            "[NewTransaction] Using token:",
            token ? "Token present" : "No token found",
        );

        try {
            const transactionData = {
                amount: parseFloat(amount),
                description:
                    description ||
                    (transactionType === "expense" ? "Gasto" : "Ingreso"),
                date: date,
                type: transactionType,
                category_id: selectedCategoryId || null,
                is_bill: isBill,
            };

            await api.createTransaction(transactionData);
            dispatch("navigate", "home");
        } catch (e) {
            console.error("[NewTransaction] Save error:", e);
            alert("Error al guardar transacción: " + e.message);
        }
    }

    function close() {
        dispatch("navigate", "home");
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
    $: pageTitle = transactionType === "expense" ? "New Expense" : "New Income";
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
        class="relative w-full max-w-md mx-auto my-auto flex flex-col min-h-full py-4"
    >
        <!-- Top App Bar -->
        <TopHeader title={pageTitle} on:back={close} />

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
            <div class="flex items-baseline gap-2">
                <span class="text-slate-600 text-4xl font-light">$</span>
                <input
                    class="bg-transparent border-none {activeColor} text-7xl font-black focus:ring-0 w-full text-center placeholder-slate-900 transition-colors duration-500"
                    placeholder="0.00"
                    type="text"
                    bind:value={amount}
                />
            </div>
        </div>

        <!-- Category Scroller -->
        <div class="flex flex-col gap-5 z-10">
            <div class="flex items-center justify-between px-8">
                <h3
                    class="text-slate-500 text-[10px] font-black uppercase tracking-widest"
                >
                    Select Category
                </h3>
            </div>
            <div class="flex gap-5 overflow-x-auto px-8 pb-6 hide-scrollbar">
                {#if loading}
                    <div
                        class="text-[10px] uppercase font-black text-slate-700"
                    >
                        Cargando...
                    </div>
                {:else}
                    {#each categories as category}
                        <div
                            class="flex flex-col items-center gap-3 shrink-0 group"
                        >
                            <button
                                class="size-16 rounded-full border flex items-center justify-center transition-all duration-300 {selectedCategoryId ===
                                category.id
                                    ? `${activeBorder} ${activeBg} ${activeColor} shadow-lg`
                                    : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/10'}"
                                on:click={() =>
                                    (selectedCategoryId = category.id)}
                            >
                                <span
                                    class="material-symbols-outlined text-2xl group-active:scale-90 transition-transform"
                                    >{category.icon}</span
                                >
                            </button>
                            <span
                                class="text-[10px] uppercase tracking-widest font-black {selectedCategoryId ===
                                category.id
                                    ? activeColor
                                    : 'text-slate-600'}">{category.name}</span
                            >
                        </div>
                    {/each}
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
            <!-- Date Picker -->
            <div
                class="flex items-center gap-5 bg-card-dark border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-colors"
            >
                <div
                    class="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20"
                >
                    <span class="material-symbols-outlined">calendar_today</span
                    >
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-slate-500 text-[9px] uppercase font-black tracking-[0.2em] mb-1"
                        >Transaction Date</span
                    >
                    <input
                        class="bg-transparent border-none p-0 text-slate-100 font-bold focus:ring-0 text-sm"
                        type="date"
                        bind:value={date}
                    />
                </div>
            </div>

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
                        placeholder="Add a note..."
                        type="text"
                        bind:value={description}
                    />
                </div>
            </div>

            <!-- Bill Toggle -->
            <div
                class="flex items-center justify-between bg-card-dark border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-colors"
            >
                <div class="flex items-center gap-5">
                    <div
                        class="size-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/10"
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
                            >Link to recurring</span
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
        </div>

        <!-- Floating Action Button Area -->
        <div class="mt-auto p-6 pt-10 z-10">
            <button
                class="w-full py-5 rounded-full text-black font-black text-sm shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em] {transactionType ===
                'expense'
                    ? 'bg-red-500 shadow-red-500/20'
                    : 'bg-emerald-500 shadow-emerald-500/20'}"
                on:click={handleSave}
            >
                Save {transactionType}
                <span class="material-symbols-outlined text-xl"
                    >arrow_forward</span
                >
            </button>
            <p
                class="text-center text-slate-600 text-[9px] mt-6 font-black uppercase tracking-[0.3em] italic opacity-50"
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
