<script>
    let activePeriod = "Mes";
</script>

<main class="main-content hide-scrollbar bg-background-dark">
    <!-- Header -->
    <header
        class="sticky top-0 z-10 flex items-center justify-between p-6 bg-background-dark/80 backdrop-blur-md"
    >
        <button
            class="flex items-center justify-center size-10 rounded-full hover:bg-slate-800 transition-colors text-slate-100"
        >
            <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="text-xl font-bold tracking-tight text-slate-100">
            Insights
        </h1>
        <button
            class="flex items-center justify-center size-10 rounded-full hover:bg-slate-800 transition-colors text-slate-100"
        >
            <span class="material-symbols-outlined">share</span>
        </button>
    </header>

    <div class="px-6 space-y-8 pb-10 max-w-lg mx-auto">
        <!-- Time Period Selector -->
        <div
            class="flex p-1 bg-card-dark rounded-full border border-border-dark"
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
                    <!-- Gold Slice -->
                    <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="40"
                        stroke="url(#goldGradient)"
                        stroke-dasharray="251.2"
                        stroke-dashoffset="62.8"
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
                        >Total Expenses</span
                    >
                    <span class="text-3xl font-black mt-1 text-slate-100"
                        >$4,250.00</span
                    >
                    <div class="flex items-center gap-1 mt-1 text-accent-mint">
                        <span class="material-symbols-outlined text-sm"
                            >trending_down</span
                        >
                        <span class="text-[10px] font-bold"
                            >12% vs last {activePeriod.toLowerCase()}</span
                        >
                    </div>
                </div>
            </div>
            <!-- Chart Legend -->
            <div class="flex flex-wrap justify-center gap-6 mt-4">
                <div class="flex items-center gap-2">
                    <div
                        class="size-2 rounded-full bg-primary shadow-sm shadow-primary/40"
                    ></div>
                    <span
                        class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                        >Housing</span
                    >
                </div>
                <div class="flex items-center gap-2">
                    <div class="size-2 rounded-full bg-slate-500"></div>
                    <span
                        class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                        >Food</span
                    >
                </div>
                <div class="flex items-center gap-2">
                    <div class="size-2 rounded-full bg-slate-700"></div>
                    <span
                        class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                        >Fun</span
                    >
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
                    <span class="text-[9px] font-bold uppercase tracking-widest"
                        >Income</span
                    >
                </div>
                <p class="text-2xl font-black text-accent-mint">$6,840</p>
                <div
                    class="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"
                >
                    <div
                        class="h-full bg-accent-mint rounded-full"
                        style="width: 75%"
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
                    <span class="text-[9px] font-bold uppercase tracking-widest"
                        >Net Savings</span
                    >
                </div>
                <p class="text-2xl font-black gold-gradient-text">38.4%</p>
                <div
                    class="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"
                >
                    <div
                        class="h-full bg-primary rounded-full shadow-sm shadow-primary/40"
                        style="width: 38.4%"
                    ></div>
                </div>
            </div>
        </div>

        <!-- Trend Chart Section -->
        <section class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="font-bold text-lg text-slate-100">Monthly Trend</h3>
                <span
                    class="text-xs font-bold text-slate-500 uppercase tracking-widest"
                    >Last 6 Months</span
                >
            </div>
            <div
                class="bg-card-dark p-8 rounded-xl border border-primary/10 h-56 relative overflow-hidden shadow-2xl"
            >
                <!-- Vector Line Chart Simulation -->
                <svg
                    class="absolute inset-0 w-full h-full p-4 overflow-visible"
                    preserveaspectratio="none"
                >
                    <path
                        d="M0,80 Q50,70 100,90 T200,40 T300,60 T400,20"
                        fill="none"
                        stroke="url(#goldGradientTrend)"
                        stroke-width="3"
                        vector-effect="non-scaling-stroke"
                    ></path>
                    <path
                        d="M0,80 Q50,70 100,90 T200,40 T300,60 T400,20 V120 H0 Z"
                        fill="url(#goldFill)"
                        opacity="0.1"
                        vector-effect="non-scaling-stroke"
                    ></path>
                    <defs>
                        <linearGradient
                            id="goldGradientTrend"
                            x1="0%"
                            x2="100%"
                            y1="0%"
                            y2="0%"
                        >
                            <stop offset="0%" style="stop-color:#BF953F;"
                            ></stop>
                            <stop offset="100%" style="stop-color:#AA771C;"
                            ></stop>
                        </linearGradient>
                        <linearGradient
                            id="goldFill"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop offset="0%" stop-color="#D4AF37"></stop>
                            <stop
                                offset="100%"
                                stop-color="#D4AF37"
                                stop-opacity="0"
                            ></stop>
                        </linearGradient>
                    </defs>
                    <!-- Points -->
                    <circle cx="0%" cy="80%" fill="#D4AF37" r="3"></circle>
                    <circle cx="20%" cy="75%" fill="#D4AF37" r="3"></circle>
                    <circle cx="40%" cy="85%" fill="#D4AF37" r="3"></circle>
                    <circle cx="60%" cy="40%" fill="#D4AF37" r="3"></circle>
                    <circle cx="80%" cy="60%" fill="#D4AF37" r="3"></circle>
                    <circle
                        class="animate-pulse"
                        cx="100%"
                        cy="20%"
                        fill="#D4AF37"
                        r="5"
                        stroke="white"
                        stroke-width="1"
                    ></circle>
                </svg>
                <div
                    class="absolute bottom-6 left-0 right-0 flex justify-between px-8 text-[9px] text-slate-500 uppercase font-black tracking-widest"
                >
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                </div>
            </div>
        </section>

        <!-- Category Breakdown List -->
        <section class="space-y-4">
            <h3 class="font-bold text-lg text-slate-100">Category Breakdown</h3>
            <div class="space-y-4">
                <!-- Item 1 -->
                <div
                    class="flex items-center gap-4 bg-card-dark p-5 rounded-xl border border-primary/10 shadow-lg"
                >
                    <div
                        class="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary"
                    >
                        <span class="material-symbols-outlined">home</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-sm text-slate-200"
                                >Housing</span
                            >
                            <span class="font-black text-sm text-slate-100"
                                >$2,100.00</span
                            >
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-primary rounded-full shadow-sm shadow-primary/40"
                                    style="width: 49%"
                                ></div>
                            </div>
                            <span class="text-[10px] font-black text-slate-500"
                                >49%</span
                            >
                        </div>
                    </div>
                </div>
                <!-- Item 2 -->
                <div
                    class="flex items-center gap-4 bg-card-dark p-5 rounded-xl border border-primary/10 shadow-lg"
                >
                    <div
                        class="flex items-center justify-center size-12 rounded-full bg-slate-500/10 text-slate-500"
                    >
                        <span class="material-symbols-outlined">restaurant</span
                        >
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-sm text-slate-200"
                                >Food</span
                            >
                            <span class="font-black text-sm text-slate-100"
                                >$850.40</span
                            >
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-slate-500 rounded-full"
                                    style="width: 20%"
                                ></div>
                            </div>
                            <span class="text-[10px] font-black text-slate-500"
                                >20%</span
                            >
                        </div>
                    </div>
                </div>
                <!-- Item 3 -->
                <div
                    class="flex items-center gap-4 bg-card-dark p-5 rounded-xl border border-primary/10 shadow-lg"
                >
                    <div
                        class="flex items-center justify-center size-12 rounded-full bg-slate-700/10 text-slate-700"
                    >
                        <span class="material-symbols-outlined"
                            >confirmation_number</span
                        >
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                            <span class="font-bold text-sm text-slate-200"
                                >Fun</span
                            >
                            <span class="font-black text-sm text-slate-100"
                                >$420.00</span
                            >
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-slate-700 rounded-full"
                                    style="width: 10%"
                                ></div>
                            </div>
                            <span class="text-[10px] font-black text-slate-500"
                                >10%</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
