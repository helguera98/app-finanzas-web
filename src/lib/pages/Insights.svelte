<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import TopHeader from "../components/TopHeader.svelte";
    const dispatch = createEventDispatcher();

    let activePeriod = "Mes";
    let transactions = [];
    let categories = [];
    let loading = true;

    let stats = {
        total_income: 0,
        total_expenses: 0,
        savings_rate: 0,
        category_breakdown: [],
    };

    onMount(async () => {
        try {
            stats = await api.getSummary();
        } catch (e) {
            console.error("Error loading insights:", e);
        } finally {
            loading = false;
        }
    });

    function goBack() {
        dispatch("navigate", { tab: "home" });
    }

    // Client-side calculateStats removed as we now use backend analysis
</script>

<main class="main-content hide-scrollbar bg-background-dark">
    <TopHeader title="Financial Insights" on:back={goBack} rightIcon="share" />

    <div class="px-6 space-y-8 pb-10 max-w-lg mx-auto">
        <!-- Time Period Selector -->
        <div
            class="flex p-1.5 bg-card-dark rounded-full border border-border-dark mt-6 mb-2 shadow-inner"
        >
            {#each ["Semana", "Mes", "Año"] as period}
                <button
                    class="flex-1 py-2 text-sm font-bold rounded-full transition-all {activePeriod ===
                    period
                        ? 'bg-primary text-black shadow-lg'
                        : 'text-slate-500'}"
                    on:click={() => (activePeriod = period)}
                >
                    {period}
                </button>
            {/each}
        </div>

        {#if loading}
            <div class="flex items-center justify-center h-64">
                <p
                    class="text-slate-500 animate-pulse font-black uppercase tracking-widest text-xs"
                >
                    Analizando tus finanzas...
                </p>
            </div>
        {:else}
            <!-- Hero Doughnut Chart Section -->
            <section class="flex flex-col items-center">
                <div class="chart-container size-64 relative">
                    <!-- SVG Semi-Doughnut Representation -->
                    <svg class="size-full -rotate-90" viewbox="0 0 100 100">
                        <circle
                            class="text-slate-800"
                            cx="50"
                            cy="50"
                            fill="transparent"
                            r="40"
                            stroke="currentColor"
                            stroke-width="12"
                        ></circle>
                        <!-- Gold Slice represents expenses ratio if we wanted multiple colors we'd need more logic, 
                             keeping it simple with one main slice for now -->
                        <circle
                            cx="50"
                            cy="50"
                            fill="transparent"
                            r="40"
                            stroke="url(#goldGradient)"
                            stroke-dasharray="251.2"
                            stroke-dashoffset={251.2 -
                                251.2 *
                                    (stats.total_expenses /
                                        (stats.total_income ||
                                            stats.total_expenses ||
                                            1))}
                            stroke-linecap="round"
                            stroke-width="12"
                        ></circle>
                        <!-- Definitions for Gradient -->
                        <defs>
                            <linearGradient
                                id="goldGradient"
                                x1="0%"
                                x2="100%"
                                y1="0%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    style="stop-color:#BF953F;stop-opacity:1"
                                ></stop>
                                <stop
                                    offset="50%"
                                    style="stop-color:#FCF6BA;stop-opacity:1"
                                ></stop>
                                <stop
                                    offset="100%"
                                    style="stop-color:#AA771C;stop-opacity:1"
                                ></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    <div
                        class="absolute flex flex-col items-center justify-center text-center"
                    >
                        <span
                            class="text-[10px] uppercase tracking-widest text-slate-500 font-bold"
                            >Gastos Totales</span
                        >
                        <span class="text-3xl font-black mt-1 text-slate-100"
                            >${stats.total_expenses.toLocaleString()}</span
                        >
                        <div
                            class="flex items-center gap-1 mt-1 text-accent-mint"
                        >
                            <span class="material-symbols-outlined text-sm"
                                >trending_down</span
                            >
                            <span class="text-[10px] font-bold"
                                >En tiempo real</span
                            >
                        </div>
                    </div>
                </div>
            </section>

            <!-- Summary Cards -->
            <div class="grid grid-cols-2 gap-4">
                <div
                    class="bg-card-dark p-6 rounded-xl border border-primary/20 shadow-xl"
                >
                    <div class="flex items-center gap-2 mb-3 text-slate-500">
                        <span class="material-symbols-outlined text-lg"
                            >payments</span
                        >
                        <span
                            class="text-[9px] font-bold uppercase tracking-widest"
                            >Ingresos</span
                        >
                    </div>
                    <p class="text-2xl font-black text-accent-mint">
                        ${stats.total_income.toLocaleString()}
                    </p>
                    <div
                        class="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"
                    >
                        <div
                            class="h-full bg-accent-mint rounded-full"
                            style="width: 100%"
                        ></div>
                    </div>
                </div>
                <div
                    class="bg-card-dark p-6 rounded-xl border border-primary/20 shadow-xl"
                >
                    <div class="flex items-center gap-2 mb-3 text-slate-500">
                        <span class="material-symbols-outlined text-lg"
                            >savings</span
                        >
                        <span
                            class="text-[9px] font-bold uppercase tracking-widest"
                            >Ahorro Neto</span
                        >
                    </div>
                    <p class="text-2xl font-black gold-gradient-text">
                        {stats.savings_rate.toFixed(1)}%
                    </p>
                    <div
                        class="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"
                    >
                        <div
                            class="h-full bg-primary rounded-full shadow-sm shadow-primary/40"
                            style="width: {Math.max(
                                0,
                                Math.min(100, stats.savings_rate),
                            )}%"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Category Breakdown List -->
            <section class="space-y-4">
                <h3 class="font-bold text-lg text-slate-100">
                    Desglose por Categoría
                </h3>
                <div class="space-y-4">
                    {#each stats.category_breakdown as cat}
                        <div
                            class="flex items-center gap-4 bg-card-dark p-5 rounded-xl border border-primary/10 shadow-lg"
                        >
                            <div
                                class="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary"
                                style="color: {cat.color}; background-color: {cat.color}20"
                            >
                                <span class="material-symbols-outlined"
                                    >{cat.icon}</span
                                >
                            </div>
                            <div class="flex-1">
                                <div
                                    class="flex justify-between items-center mb-1"
                                >
                                    <span
                                        class="font-bold text-sm text-slate-200"
                                        >{cat.name}</span
                                    >
                                    <span
                                        class="font-black text-sm text-slate-100"
                                        >${cat.amount.toLocaleString()}</span
                                    >
                                </div>
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden"
                                    >
                                        <div
                                            class="h-full bg-primary rounded-full shadow-sm shadow-primary/40"
                                            style="width: {cat.percentage}%; background-color: {cat.color}"
                                        ></div>
                                    </div>
                                    <span
                                        class="text-[10px] font-black text-slate-500"
                                        >{cat.percentage.toFixed(0)}%</span
                                    >
                                </div>
                            </div>
                        </div>
                    {/each}
                    {#if stats.category_breakdown.length === 0}
                        <div
                            class="p-10 text-center border border-dashed border-slate-800 rounded-2xl"
                        >
                            <p
                                class="text-xs text-slate-600 font-bold uppercase tracking-widest"
                            >
                                No hay gastos registrados
                            </p>
                        </div>
                    {/if}
                </div>
            </section>
        {/if}
    </div>
</main>

<style>
    .gold-gradient-text {
        background: linear-gradient(
            to right,
            #bf953f,
            #fcf6ba,
            #b38728,
            #fbf5b7,
            #aa771c
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .chart-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
