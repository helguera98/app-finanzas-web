<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function startNewBill() {
        dispatch("navigate", "new_bill");
    }
</script>

<main class="main-content hide-scrollbar">
    <!-- Sticky Header -->
    <header
        class="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-4 py-4"
    >
        <div class="flex items-center justify-between max-w-2xl mx-auto">
            <button
                class="flex items-center justify-center size-10 rounded-full hover:bg-card-dark transition-colors"
            >
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold tracking-tight">Manage Your Bills</h1>
            <button
                class="flex items-center justify-center size-10 rounded-full hover:bg-card-dark transition-colors"
            >
                <span class="material-symbols-outlined">search</span>
            </button>
        </div>
    </header>

    <div class="max-w-2xl mx-auto pb-10">
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
                <button
                    class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-card-dark text-slate-300 dark:text-slate-300 px-5 hover:bg-border-dark transition-colors border border-border-dark"
                >
                    <span class="material-symbols-outlined text-[20px]"
                        >home</span
                    >
                    <span class="text-sm font-medium">Rent</span>
                </button>
                <button
                    class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-card-dark text-slate-300 dark:text-slate-300 px-5 hover:bg-border-dark transition-colors border border-border-dark"
                >
                    <span class="material-symbols-outlined text-[20px]"
                        >bolt</span
                    >
                    <span class="text-sm font-medium">Utilities</span>
                </button>
                <button
                    class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-card-dark text-slate-300 dark:text-slate-300 px-5 hover:bg-border-dark transition-colors border border-border-dark"
                >
                    <span class="material-symbols-outlined text-[20px]"
                        >subscriptions</span
                    >
                    <span class="text-sm font-medium">Subs</span>
                </button>
                <button
                    class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-card-dark text-slate-300 dark:text-slate-300 px-5 hover:bg-border-dark transition-colors border border-border-dark"
                >
                    <span class="material-symbols-outlined text-[20px]"
                        >shield</span
                    >
                    <span class="text-sm font-medium">Insurance</span>
                </button>
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
                >6 ACTIVE</span
            >
        </div>

        <!-- Bill List -->
        <div class="px-4 space-y-4 mt-4">
            <!-- Fixed Bill Card -->
            <div
                class="bg-card-dark rounded-xl p-5 border border-border-dark shadow-2xl relative overflow-hidden"
            >
                <div class="flex items-start justify-between mb-4">
                    <div class="flex gap-4">
                        <div
                            class="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
                        >
                            <span class="material-symbols-outlined text-2xl"
                                >home</span
                            >
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-100">
                                Apartment Rent
                            </h3>
                            <p class="text-xs font-medium text-slate-500">
                                Real Estate Group Inc.
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <span
                            class="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full border border-primary/20"
                            >FIXED</span
                        >
                    </div>
                </div>
                <div class="flex items-end justify-between">
                    <div>
                        <div class="text-2xl font-bold text-slate-100">
                            $1,850.00
                        </div>
                        <div
                            class="text-xs text-slate-500 mt-1 flex items-center gap-1"
                        >
                            <span class="material-symbols-outlined text-sm"
                                >calendar_today</span
                            >
                            Next due: Oct 01
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                            >Auto-Reflect</span
                        >
                        <label
                            class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-border-dark has-[:checked]:bg-primary transition-colors"
                        >
                            <input
                                checked=""
                                class="sr-only peer"
                                type="checkbox"
                            />
                            <div
                                class="ml-1 size-4 rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-5"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Variable Bill Card -->
            <div
                class="bg-card-dark rounded-xl p-5 border border-border-dark shadow-2xl relative"
            >
                <div class="flex items-start justify-between mb-4">
                    <div class="flex gap-4">
                        <div
                            class="size-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center"
                        >
                            <span class="material-symbols-outlined text-2xl"
                                >bolt</span
                            >
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-100">
                                Electric Co.
                            </h3>
                            <p class="text-xs font-medium text-slate-500">
                                Utility Services
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <!-- Pending Indicator -->
                        <div class="flex items-center gap-1.5">
                            <span
                                class="size-1.5 rounded-full bg-orange-500 animate-pulse"
                            ></span>
                            <span
                                class="text-[9px] font-bold text-orange-500 uppercase tracking-wider"
                                >Pending</span
                            >
                        </div>
                        <span
                            class="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20 rounded-full"
                            >VARIABLE</span
                        >
                    </div>
                </div>
                <div class="flex items-end justify-between">
                    <div>
                        <div class="text-lg font-bold text-slate-500 italic">
                            Amount Varies
                        </div>
                        <div
                            class="text-sm font-semibold text-slate-100 mt-0.5"
                        >
                            Est. $142.50
                            <span class="text-[10px] font-normal text-slate-500"
                                >(avg)</span
                            >
                        </div>
                        <div
                            class="text-xs text-slate-500 mt-1 flex items-center gap-1"
                        >
                            <span class="material-symbols-outlined text-sm"
                                >calendar_today</span
                            >
                            Next due: Oct 12
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                            >Auto-Reflect</span
                        >
                        <label
                            class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-border-dark has-[:checked]:bg-primary transition-colors"
                        >
                            <input
                                checked=""
                                class="sr-only peer"
                                type="checkbox"
                            />
                            <div
                                class="ml-1 size-4 rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-5"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Variable Bill Card (Water) -->
            <div
                class="bg-card-dark rounded-xl p-5 border border-border-dark shadow-2xl relative"
            >
                <div class="flex items-start justify-between mb-4">
                    <div class="flex gap-4">
                        <div
                            class="size-12 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center"
                        >
                            <span class="material-symbols-outlined text-2xl"
                                >water_drop</span
                            >
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-100">
                                City Water Dept
                            </h3>
                            <p class="text-xs font-medium text-slate-500">
                                Utility Services
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <span
                            class="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20 rounded-full"
                            >VARIABLE</span
                        >
                    </div>
                </div>
                <div class="flex items-end justify-between">
                    <div>
                        <div class="text-lg font-bold text-slate-500 italic">
                            Amount Varies
                        </div>
                        <div
                            class="text-sm font-semibold text-slate-100 mt-0.5"
                        >
                            Est. $45.20
                            <span class="text-[10px] font-normal text-slate-500"
                                >(avg)</span
                            >
                        </div>
                        <div
                            class="text-xs text-slate-500 mt-1 flex items-center gap-1"
                        >
                            <span class="material-symbols-outlined text-sm"
                                >calendar_today</span
                            >
                            Next due: Oct 20
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                            >Auto-Reflect</span
                        >
                        <label
                            class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-border-dark has-[:checked]:bg-primary transition-colors"
                        >
                            <input class="sr-only peer" type="checkbox" />
                            <div
                                class="ml-1 size-4 rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-5"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
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
