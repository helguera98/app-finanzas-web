<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import TopHeader from "../components/TopHeader.svelte";
    const dispatch = createEventDispatcher();

    let bills = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const txns = await api.getTransactions();
            // Filtrar solo las transacciones que son facturas/bills
            bills = txns.filter((t) => t.is_bill);
        } catch (e) {
            error = "Error al cargar facturas";
            console.error(e);
        } finally {
            loading = false;
        }
    });

    function startNewBill() {
        dispatch("navigate", "new_transaction"); // Por ahora usamos NewTransaction con flag isBill
    }

    function goBack() {
        dispatch("navigate", { tab: "home" });
    }
</script>

<main class="main-content hide-scrollbar bg-background-dark">
    <TopHeader title="Recurring Bills" on:back={goBack} rightIcon="search" />

    <div class="max-w-2xl mx-auto pb-10">
        {#if loading}
            <div class="p-20 text-center">
                <p
                    class="text-slate-500 animate-pulse font-black uppercase tracking-widest text-xs"
                >
                    Cargando tus compromisos...
                </p>
            </div>
        {:else}
            <!-- Category Selector -->
            <section class="py-6">
                <div class="flex gap-3 px-4 overflow-x-auto hide-scrollbar">
                    <button
                        class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-black px-5 transition-transform active:scale-95"
                    >
                        <span class="material-symbols-outlined text-[20px]"
                            >grid_view</span
                        >
                        <span class="text-sm font-bold">All</span>
                    </button>
                    <!-- Aquí podrían ir filtros por categorías reales si quisiéramos -->
                </div>
            </section>

            <!-- List Section Header -->
            <div class="px-4 py-2 flex items-center justify-between">
                <h2
                    class="text-sm font-bold text-slate-500 uppercase tracking-widest"
                >
                    Active Recurring Bills
                </h2>
                <span
                    class="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full border border-primary/20"
                    >{bills.length} ACTIVE</span
                >
            </div>

            <!-- Bill List -->
            <div class="px-4 space-y-4 mt-4">
                {#each bills as bill}
                    <div
                        class="bg-card-dark rounded-xl p-5 border border-border-dark shadow-2xl relative overflow-hidden"
                    >
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex gap-4">
                                <div
                                    class="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
                                >
                                    <span
                                        class="material-symbols-outlined text-2xl"
                                        >receipt_long</span
                                    >
                                </div>
                                <div>
                                    <h3 class="font-bold text-slate-100">
                                        {bill.description}
                                    </h3>
                                    <p
                                        class="text-xs font-medium text-slate-500"
                                    >
                                        Registrada el {bill.date}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span
                                    class="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full border border-primary/20"
                                    >FACTURA</span
                                >
                            </div>
                        </div>
                        <div class="flex items-end justify-between">
                            <div>
                                <div class="text-2xl font-bold text-slate-100">
                                    ${bill.amount.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}

                {#if bills.length === 0}
                    <div
                        class="p-10 text-center border border-dashed border-slate-800 rounded-2xl"
                    >
                        <p
                            class="text-xs text-slate-600 font-bold uppercase tracking-widest"
                        >
                            No hay facturas registradas
                        </p>
                        <button
                            on:click={startNewBill}
                            class="mt-4 text-primary text-[10px] font-black uppercase tracking-widest"
                            >Añadir Primera</button
                        >
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <!-- Content overlap safety -->
    <div class="h-20"></div>

    <!-- FAB -->
    <button
        on:click={startNewBill}
        class="fixed bottom-24 right-6 size-14 flex items-center justify-center rounded-full bg-primary text-black shadow-2xl active:scale-95 transition-transform z-40"
    >
        <span class="material-symbols-outlined text-3xl font-bold">add</span>
    </button>
</main>
