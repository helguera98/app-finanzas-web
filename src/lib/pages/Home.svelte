<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let alexAvatar =
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBld12Gl2zoab74PX5dQ2SrlwoGnj_bL3NXcp26ZLxGauf0GEHMnYwAJfqQIcmjubLVQXDxkjfqw3e0mxyRfx8EpFdFjasyapIU4N1wjT_YLEGYE1bXyRs1SFpFxLnu3iZMCpcGpuIEhweHOxIjvxyB5oP1FoYoWXZg5KM460QAlGmtLhIpZ4XMIcwWO8pXs-RFkFEcPR_4yG59GR9PjxFk7e-nZmb7ewat9OW-fmnLEXrLt74JJBL8EVHh7XgUwsybZF2ZqZDncul7";

    function startTransaction(type) {
        dispatch("navigate", { tab: "new_transaction", data: { type } });
    }
</script>

<main class="main-content hide-scrollbar space-y-8">
    <!-- Header Section -->
    <header
        class="p-6 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-50"
    >
        <div class="flex items-center gap-3">
            <div class="size-12 rounded-full border-2 p-0.5 border-primary/40">
                <img
                    alt="User Profile"
                    class="w-full h-full rounded-full object-cover"
                    src={alexAvatar}
                />
            </div>
            <div>
                <h1 class="text-lg font-bold tracking-tight">
                    Good morning, Alex
                </h1>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                    Tuesday, Oct 24
                </p>
            </div>
        </div>
        <button
            class="size-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-card-dark border border-slate-300 dark:border-border-dark"
        >
            <span class="material-symbols-outlined text-xl">notifications</span>
        </button>
    </header>

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
                        class="text-5xl font-extrabold text-accent-mint tracking-tighter"
                    >
                        +$4,250.00
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
                            $1,820.00
                        </p>
                    </div>
                    <div class="h-8 w-px bg-border-dark"></div>
                    <div>
                        <p
                            class="text-xs text-slate-400 uppercase tracking-wider"
                        >
                            Savings Rate
                        </p>
                        <p class="text-xl font-bold text-primary">57%</p>
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

        <!-- Upcoming Bills -->
        <section class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold tracking-tight">Upcoming Bills</h3>
                <button class="text-sm font-semibold text-primary"
                    >See All</button
                >
            </div>
            <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                <!-- Fixed Bill -->
                <div
                    class="min-w-[280px] bg-card-dark p-5 rounded-xl border border-border-dark space-y-4"
                >
                    <div class="flex justify-between items-start">
                        <div class="space-y-1">
                            <span
                                class="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded uppercase tracking-wider"
                                >Due Soon</span
                            >
                            <h4 class="font-bold text-lg">Residential Rent</h4>
                        </div>
                        <div
                            class="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
                        >
                            <span class="material-symbols-outlined">home</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-end">
                        <p class="text-2xl font-bold">$1,500.00</p>
                        <p class="text-xs text-slate-500">Oct 28</p>
                    </div>
                    <button
                        class="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-bold rounded-full transition-colors"
                    >
                        Confirm Payment
                    </button>
                </div>

                <!-- Variable Bill -->
                <div
                    class="min-w-[280px] bg-card-dark p-5 rounded-xl border border-border-dark space-y-4"
                >
                    <div class="flex justify-between items-start">
                        <div class="space-y-1">
                            <span
                                class="px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-bold rounded uppercase tracking-wider"
                                >Overdue</span
                            >
                            <h4 class="font-bold text-lg">City Electric</h4>
                        </div>
                        <div
                            class="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
                        >
                            <span class="material-symbols-outlined">bolt</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-end">
                        <p class="text-2xl font-bold tracking-tight">
                            Variable
                        </p>
                        <p class="text-xs text-red-400">Oct 20</p>
                    </div>
                    <button
                        class="w-full py-3 bg-primary text-black text-sm font-bold rounded-full transition-colors"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </section>

        <!-- Recent Transactions -->
        <section class="space-y-4">
            <h3 class="text-xl font-bold tracking-tight">
                Recent Transactions
            </h3>
            <div
                class="bg-card-dark rounded-xl border border-border-dark divide-y divide-border-dark overflow-hidden"
            >
                <!-- Transaction Item -->
                <div class="flex items-center justify-between p-4">
                    <div class="flex items-center gap-4">
                        <div
                            class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined"
                                >shopping_cart</span
                            >
                        </div>
                        <div>
                            <p class="font-bold">Whole Foods Market</p>
                            <p class="text-xs text-slate-500">
                                Groceries • Today
                            </p>
                        </div>
                    </div>
                    <p class="font-bold text-red-400">-$142.50</p>
                </div>
                <!-- Transaction Item -->
                <div class="flex items-center justify-between p-4">
                    <div class="flex items-center gap-4">
                        <div
                            class="size-12 rounded-full bg-accent-mint/10 flex items-center justify-center text-accent-mint"
                        >
                            <span class="material-symbols-outlined"
                                >payments</span
                            >
                        </div>
                        <div>
                            <p class="font-bold">Freelance Deposit</p>
                            <p class="text-xs text-slate-500">
                                Income • Yesterday
                            </p>
                        </div>
                    </div>
                    <p class="font-bold text-accent-mint">+$850.00</p>
                </div>
                <!-- Transaction Item -->
                <div class="flex items-center justify-between p-4">
                    <div class="flex items-center gap-4">
                        <div
                            class="size-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"
                        >
                            <span class="material-symbols-outlined">coffee</span
                            >
                        </div>
                        <div>
                            <p class="font-bold">Starbucks Coffee</p>
                            <p class="text-xs text-slate-500">
                                Dining • Oct 22
                            </p>
                        </div>
                    </div>
                    <p class="font-bold text-red-400">-$6.45</p>
                </div>
            </div>
        </section>
    </div>
</main>
