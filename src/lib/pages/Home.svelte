<script>
    import { createEventDispatcher, onMount } from "svelte";
    import TopHeader from "../components/TopHeader.svelte";
    import { api } from "../api";
    const dispatch = createEventDispatcher();

    export let user = null;
    export let alexAvatar =
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBld12Gl2zoab74PX5dQ2SrlwoGnj_bL3NXcp26ZLxGauf0GEHMnYwAJfqQIcmjubLVQXDxkjfqw3e0mxyRfx8EpFdFjasyapIU4N1wjT_YLEGYE1bXyRs1SFpFxLnu3iZMCpcGpuIEhweHOxIjvxyB5oP1FoYoWXZg5KM460QAlGmtLhIpZ4XMIcwWO8pXs-RFkFEcPR_4yG59GR9PjxFk7e-nZmb7ewat9OW-fmnLEXrLt74JJBL8EVHh7XgUwsybZF2ZqZDncul7";

    let transactions = [];
    let loading = true;
    let error = null;

    let metrics = {
        cashflow: 0,
        expenses: 0,
        savingsRate: 0,
    };

    onMount(async () => {
        try {
            transactions = await api.getTransactions();
            calculateMetrics();
        } catch (e) {
            error = "Error al cargar datos";
            console.error(e);
        } finally {
            loading = false;
        }
    });

    function calculateMetrics() {
        const income = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        metrics.cashflow = income - expenses;
        metrics.expenses = expenses;
        metrics.savingsRate =
            income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
    }

    function startTransaction(type) {
        dispatch("navigate", { tab: "new_transaction", data: { type } });
    }
</script>

<main class="main-content hide-scrollbar space-y-4">
    <TopHeader title="Overview" showBack={false} rightIcon="notifications" />

    <div class="px-6 pb-4">
        <div
            class="flex items-center gap-3 mb-6 bg-primary/5 p-4 rounded-2xl border border-primary/10"
        >
            <div class="size-12 rounded-full border-2 p-0.5 border-primary/40">
                <img
                    alt="User Profile"
                    class="w-full h-full rounded-full object-cover"
                    src={alexAvatar}
                />
            </div>
            <div>
                <h1
                    class="text-sm font-bold tracking-tight text-slate-100 italic"
                >
                    Welcome back, {user?.full_name?.split(" ")[0] || "Member"}
                </h1>
                <p
                    class="text-[10px] uppercase font-black tracking-widest text-primary/60"
                >
                    Premium Member
                </p>
            </div>
        </div>
    </div>

    <div class="px-6 space-y-8 pb-10">
        <!-- Metrics Card -->
        <section
            class="relative overflow-hidden rounded-xl bg-card-dark p-8 shadow-2xl border border-border-dark"
        >
            <div
                class="absolute top-0 right-0 -mt-12 -mr-12 size-48 bg-primary/20 blur-3xl rounded-full bg-primary/10"
            ></div>
            <div class="relative z-10 space-y-6">
                <div>
                    <p
                        class="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1"
                    >
                        Available Cashflow
                    </p>
                    <h2
                        class="text-5xl font-extrabold {metrics.cashflow >= 0
                            ? 'text-accent-mint'
                            : 'text-accent-red'} tracking-tighter"
                    >
                        {metrics.cashflow >= 0 ? "+" : "-"}${Math.abs(
                            metrics.cashflow,
                        ).toLocaleString()}
                    </h2>
                </div>
                <div
                    class="flex items-center gap-4 pt-4 border-t border-border-dark"
                >
                    <div>
                        <p
                            class="text-xs text-slate-400 uppercase tracking-wider"
                        >
                            Monthly Expenses
                        </p>
                        <p class="text-xl font-bold text-slate-100">
                            ${metrics.expenses.toLocaleString()}
                        </p>
                    </div>
                    <div class="h-8 w-px bg-border-dark"></div>
                    <div>
                        <p
                            class="text-xs text-slate-400 uppercase tracking-wider"
                        >
                            Savings Rate
                        </p>
                        <p class="text-xl font-bold text-primary">
                            {metrics.savingsRate}%
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Actions -->
        <section class="grid grid-cols-2 gap-4">
            <button
                class="flex items-center justify-center gap-2 h-14 bg-primary text-black font-bold rounded-full shadow-lg active:scale-95 transition-transform shadow-primary/20"
                on:click={() => startTransaction("income")}
            >
                <span class="material-symbols-outlined">add_circle</span>
                <span>Add Income</span>
            </button>
            <button
                class="flex items-center justify-center gap-2 h-14 bg-card-dark border border-border-dark text-slate-100 font-bold rounded-full active:scale-95 transition-transform"
                on:click={() => startTransaction("expense")}
            >
                <span class="material-symbols-outlined">remove_circle</span>
                <span>Add Expense</span>
            </button>
        </section>

        <!-- Recent Transactions -->
        <section class="space-y-4">
            <h3 class="text-xl font-bold tracking-tight">
                Recent Transactions
            </h3>
            <div
                class="bg-card-dark rounded-xl border border-border-dark divide-y divide-border-dark overflow-hidden"
            >
                {#if loading}
                    <div class="p-8 text-center text-slate-500">
                        Cargando transacciones...
                    </div>
                {:else if transactions.length === 0}
                    <div class="p-8 text-center text-slate-500">
                        No hay transacciones recientes
                    </div>
                {:else}
                    {#each transactions.slice(-5).reverse() as txn}
                        <div class="flex items-center justify-between p-4">
                            <div class="flex items-center gap-4">
                                <div
                                    class="size-12 rounded-full {txn.type ===
                                    'income'
                                        ? 'bg-accent-mint/10 text-accent-mint'
                                        : 'bg-primary/10 text-primary'} flex items-center justify-center"
                                >
                                    <span class="material-symbols-outlined">
                                        {txn.type === "income"
                                            ? "payments"
                                            : "shopping_cart"}
                                    </span>
                                </div>
                                <div>
                                    <p class="font-bold">{txn.description}</p>
                                    <p class="text-xs text-slate-500">
                                        {txn.date}
                                    </p>
                                </div>
                            </div>
                            <p
                                class="font-bold {txn.type === 'income'
                                    ? 'text-accent-mint'
                                    : 'text-accent-red'}"
                            >
                                {txn.type === "income"
                                    ? "+"
                                    : "-"}${txn.amount.toLocaleString()}
                            </p>
                        </div>
                    {/each}
                {/if}
            </div>
        </section>
    </div>
</main>
