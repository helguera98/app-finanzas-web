<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import TopHeader from "../components/TopHeader.svelte";
    const dispatch = createEventDispatcher();

    let loading = false;
    let billName = "";
    let amount = "0.00";
    let selectedCategoryName = "Hogar";
    let paymentDay = 15;
    let isFixed = true;

    const categories = [
        { id: 1, name: "Hogar", icon: "home" },
        { id: 2, name: "Servicios", icon: "bolt" },
        { id: 3, name: "Ocio", icon: "subscriptions" },
        { id: 4, name: "Otros", icon: "more_horiz" },
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    async function handleSave() {
        if (!billName.trim() || loading) return;

        loading = true;
        try {
            const billData = {
                name: billName,
                amount: parseFloat(amount),
                due_date: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    paymentDay,
                )
                    .toISOString()
                    .split("T")[0],
                category_id: null, // Optionally link to a real category ID here if needed
                frequency: isFixed ? "monthly" : "variable",
            };

            await api.createBill(billData);
            dispatch("navigate", "bills");
        } catch (e) {
            console.error("Error saving bill:", e);
            alert("Error al guardar factura: " + e.message);
        } finally {
            loading = false;
        }
    }

    function close() {
        dispatch("navigate", "bills");
    }
</script>

<div
    class="new-bill-page bg-background-dark font-display text-slate-100 h-[100dvh] w-full flex flex-col relative overflow-y-auto hide-scrollbar"
>
    <TopHeader title="Recurring Bill" on:back={close} />

    <main class="flex-1 px-6 pb-40">
        <form
            class="space-y-12 max-w-lg mx-auto"
            on:submit|preventDefault={handleSave}
        >
            <!-- Bill Name Input -->
            <section class="space-y-4">
                <label
                    for="bill-name"
                    class="text-sm font-semibold uppercase tracking-widest text-slate-400 ml-1"
                    >Nombre de la factura</label
                >
                <div class="relative group pt-2">
                    <input
                        id="bill-name"
                        bind:value={billName}
                        class="w-full bg-slate-900/50 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl px-5 py-4 text-lg font-medium transition-all outline-none"
                        placeholder="Ej. Alquiler Loft"
                        type="text"
                    />
                    <span
                        class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary"
                        >edit</span
                    >
                </div>
            </section>

            <!-- Amount Input -->
            <section class="space-y-4 text-center py-4">
                <label
                    for="bill-amount"
                    class="text-sm font-semibold uppercase tracking-widest text-slate-400"
                    >Monto Estimado</label
                >
                <div class="flex items-baseline justify-center gap-2 pt-2">
                    <span class="text-3xl font-light text-primary">$</span>
                    <input
                        id="bill-amount"
                        bind:value={amount}
                        class="w-40 bg-transparent border-none text-center text-5xl font-bold focus:ring-0 p-0 placeholder:text-slate-700 no-arrows"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                    />
                </div>
            </section>

            <!-- Category Selector -->
            <section class="space-y-4">
                <span
                    class="text-sm font-semibold uppercase tracking-widest text-slate-400 ml-1"
                    >Categoría</span
                >
                <div class="grid grid-cols-4 gap-4 pt-4">
                    {#each categories as cat}
                        <button
                            type="button"
                            on:click={() => (selectedCategoryName = cat.name)}
                            class="flex flex-col items-center gap-2 group"
                        >
                            <div
                                class="size-14 rounded-full flex items-center justify-center border-2 transition-all
                                {selectedCategoryName === cat.name
                                    ? 'bg-primary/10 text-primary border-primary ring-4 ring-primary/20'
                                    : 'bg-slate-800 text-slate-500 border-transparent hover:border-slate-600'}"
                            >
                                <span class="material-symbols-outlined text-2xl"
                                    >{cat.icon}</span
                                >
                            </div>
                            <span
                                class="text-xs font-medium {selectedCategoryName ===
                                cat.name
                                    ? 'text-primary'
                                    : 'text-slate-500'}">{cat.name}</span
                            >
                        </button>
                    {/each}
                </div>
            </section>

            <!-- Payment Day Selector -->
            <section class="space-y-4">
                <div class="flex justify-between items-center ml-1">
                    <span
                        class="text-sm font-semibold uppercase tracking-widest text-slate-400"
                        >Día de Pago</span
                    >
                    <span class="text-primary font-bold">Día {paymentDay}</span>
                </div>
                <div class="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                    {#each days as day}
                        <button
                            type="button"
                            on:click={() => (paymentDay = day)}
                            class="flex-shrink-0 flex items-center justify-center transition-all
                                {paymentDay === day
                                ? 'size-14 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30'
                                : 'size-12 rounded-full border border-slate-800 text-slate-400'}"
                        >
                            {day}
                        </button>
                    {/each}
                </div>
            </section>

            <!-- Toggle Fixed/Variable -->
            <section
                class="bg-slate-900/80 p-4 rounded-2xl flex items-center justify-between"
            >
                <div class="flex flex-col">
                    <span class="font-bold text-slate-100">Tipo de Monto</span>
                    <span class="text-sm text-slate-500"
                        >¿El monto es siempre el mismo?</span
                    >
                </div>
                <div
                    class="flex bg-slate-800 p-1 rounded-full relative w-48 h-10 overflow-hidden"
                >
                    <div
                        class="absolute inset-y-1 w-[48%] bg-primary rounded-full shadow-md z-0 transition-all duration-300"
                        style="transform: translateX({isFixed
                            ? '0px'
                            : '92px'})"
                    ></div>
                    <button
                        type="button"
                        on:click={() => (isFixed = true)}
                        class="relative z-10 flex-1 text-xs font-bold uppercase tracking-tighter {isFixed
                            ? 'text-white'
                            : 'text-slate-500'}"
                    >
                        Fijo
                    </button>
                    <button
                        type="button"
                        on:click={() => (isFixed = false)}
                        class="relative z-10 flex-1 text-xs font-bold uppercase tracking-tighter {!isFixed
                            ? 'text-white'
                            : 'text-slate-500'}"
                    >
                        Variable
                    </button>
                </div>
            </section>
        </form>
    </main>

    <!-- Bottom Action -->
    <footer
        class="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent"
    >
        <div class="max-w-lg mx-auto">
            <button
                on:click={handleSave}
                disabled={loading}
                class="w-full bg-gradient-to-r from-gold to-[#B8860B] hover:brightness-110 text-background-dark font-black py-5 rounded-full shadow-xl shadow-gold/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span class="material-symbols-outlined"
                    >{loading ? "sync" : "check_circle"}</span
                >
                {loading ? "GUARDANDO..." : "GUARDAR FACTURA"}
            </button>
        </div>
    </footer>
</div>

<style>
    /* Decision fix to hide logic */
    :global(input[type="number"].no-arrows::-webkit-outer-spin-button),
    :global(input[type="number"].no-arrows::-webkit-inner-spin-button) {
        -webkit-appearance: none !important;
        margin: 0 !important;
    }

    :global(input[type="number"].no-arrows) {
        -moz-appearance: textfield !important;
        appearance: none !important;
    }
</style>
