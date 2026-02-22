<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let extraPayment = 500;

    function startNewLoan() {
        dispatch("navigate", { tab: "new_loan" });
    }

    function goBack() {
        dispatch("navigate", { tab: "home" });
    }
</script>

<main class="main-content hide-scrollbar bg-[#0A0A0B]">
    <!-- Sticky Header -->
    <header
        class="sticky top-0 z-30 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-primary/20 p-4"
    >
        <div class="flex items-center justify-between max-w-lg mx-auto w-full">
            <button
                on:click={goBack}
                class="p-2 rounded-full hover:bg-primary/20 transition-colors"
            >
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="text-lg font-bold tracking-tight">Debt Control</h1>
            <button class="p-2 rounded-full bg-primary/10 text-primary">
                <span class="material-symbols-outlined">account_circle</span>
            </button>
        </div>
    </header>

    <div class="max-w-lg mx-auto w-full pb-10">
        <section class="p-6">
            <div class="flex justify-between items-end mb-6">
                <h2 class="text-xl font-bold">Your Active Loans</h2>
                <button class="text-primary text-sm font-semibold"
                    >View All</button
                >
            </div>
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                <div
                    class="min-w-[280px] snap-center bg-card-dark border border-primary/30 p-6 rounded-xl shadow-2xl"
                >
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary/10 rounded-lg">
                            <span class="material-symbols-outlined text-primary"
                                >home</span
                            >
                        </div>
                        <span
                            class="px-3 py-1 bg-slate-800 text-[10px] font-bold rounded-full uppercase tracking-wider text-slate-300"
                            >Mortgage</span
                        >
                    </div>
                    <p class="text-slate-500 text-sm mb-1">Total Principal</p>
                    <h3 class="text-2xl font-bold mb-4 text-slate-100">
                        $342,000.00
                    </h3>
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Interest Paid</span>
                            <span class="text-primary font-medium"
                                >$12,450.00</span
                            >
                        </div>
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Remaining Term</span>
                            <span class="font-medium text-slate-300"
                                >28 Years (336 mo)</span
                            >
                        </div>
                    </div>
                </div>

                <div
                    class="min-w-[280px] snap-center bg-card-dark border border-primary/10 p-6 rounded-xl opacity-60"
                >
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary/10 rounded-lg text-primary">
                            <span class="material-symbols-outlined"
                                >directions_car</span
                            >
                        </div>
                        <span
                            class="px-3 py-1 bg-slate-800 text-[10px] font-bold rounded-full uppercase tracking-wider text-slate-300"
                            >Auto Loan</span
                        >
                    </div>
                    <p class="text-slate-500 text-sm mb-1">Total Principal</p>
                    <h3 class="text-2xl font-bold mb-4 text-slate-100">
                        $24,500.00
                    </h3>
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Interest Paid</span>
                            <span class="text-primary font-medium">$840.00</span
                            >
                        </div>
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">Remaining Term</span>
                            <span class="font-medium text-slate-300"
                                >4 Years (48 mo)</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="px-6 py-2">
            <div
                class="bg-primary/5 rounded-xl p-6 border border-primary/20 shadow-lg"
            >
                <div class="flex items-center gap-3 mb-4">
                    <span class="material-symbols-outlined text-primary"
                        >analytics</span
                    >
                    <h3 class="font-bold">Debt Breakdown</h3>
                </div>
                <div
                    class="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex"
                >
                    <div
                        class="h-full bg-primary shadow-primary/40"
                        style="width: 70%"
                    ></div>
                    <div class="h-full bg-primary/30" style="width: 30%"></div>
                </div>
                <div class="flex justify-between mt-3 text-sm">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-2 h-2 rounded-full bg-primary shadow-primary/40"
                        ></div>
                        <span class="text-slate-400">Principal ($240k)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-primary/30"></div>
                        <span class="text-slate-400">Interest ($102k)</span>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="p-6 mt-8 rounded-t-3xl border-t border-primary/20 bg-[#0D0D16]"
        >
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <span class="material-symbols-outlined text-accent-mint"
                    >bolt</span
                >
                Extra Payment Simulator
            </h2>

            <div class="space-y-8">
                <div>
                    <label
                        class="block text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest"
                        for="extra-payment-amount"
                        >Additional Monthly Payment</label
                    >
                    <div class="relative">
                        <span
                            class="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-bold text-primary"
                            >$</span
                        >
                        <input
                            id="extra-payment-amount"
                            class="w-full bg-card-dark border-2 border-primary/30 rounded-full py-5 pl-12 pr-6 text-2xl font-black text-slate-100 focus:border-primary focus:ring-0 outline-none transition-all"
                            type="number"
                            bind:value={extraPayment}
                        />
                    </div>
                    <input
                        class="w-full h-2 mt-8 accent-primary bg-slate-800 rounded-lg appearance-none cursor-pointer"
                        max="5000"
                        min="0"
                        step="50"
                        type="range"
                        bind:value={extraPayment}
                    />
                    <div
                        class="flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest"
                    >
                        <span>$0</span>
                        <style>
                            /* Remove number input spinners */
                            input::-webkit-outer-spin-button,
                            input::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
                            }
                            input[type="number"] {
                                -moz-appearance: textfield;
                                appearance: textfield;
                            }
                        </style>
                        <span>$5,000</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div
                        class="bg-accent-mint/5 border border-accent-mint/20 p-5 rounded-xl flex flex-col items-center text-center"
                    >
                        <span
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2"
                            >Years Saved</span
                        >
                        <span class="text-2xl font-black text-accent-mint"
                            >{((extraPayment / 500) * 8.4).toFixed(1)} Years</span
                        >
                    </div>
                    <div
                        class="bg-accent-mint/5 border border-accent-mint/20 p-5 rounded-xl flex flex-col items-center text-center"
                    >
                        <span
                            class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2"
                            >Interest Saved</span
                        >
                        <span class="text-2xl font-black text-accent-mint"
                            >${Math.round(
                                (extraPayment / 500) * 42850,
                            ).toLocaleString()}</span
                        >
                    </div>
                </div>

                <div class="pt-4">
                    <h3
                        class="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest"
                    >
                        Accelerated Debt Freedom
                    </h3>
                    <div class="relative h-48 w-full px-2">
                        <div
                            class="w-full h-full border-l-2 border-b-2 border-slate-800 relative"
                        >
                            <svg
                                class="w-full h-full"
                                preserveaspectratio="none"
                                viewbox="0 0 100 100"
                            >
                                <path
                                    d="M0,20 L20,35 L40,55 L60,80 L80,95 L100,100"
                                    fill="none"
                                    stroke="var(--color-primary)"
                                    stroke-dasharray="4"
                                    stroke-width="2"
                                    opacity="0.4"
                                ></path>
                                <path
                                    d="M0,20 L15,45 L30,75 L45,100"
                                    fill="none"
                                    stroke="var(--color-accent-mint)"
                                    stroke-width="3"
                                ></path>
                            </svg>
                            <div
                                class="absolute top-0 left-0 text-[10px] text-slate-600 transform -translate-x-full pr-3"
                            >
                                $342k
                            </div>
                            <div
                                class="absolute bottom-0 left-0 text-[10px] text-slate-600 transform translate-y-full pt-3"
                            >
                                Today
                            </div>
                            <div
                                class="absolute bottom-0 right-0 text-[10px] text-slate-600 transform translate-y-full pt-3"
                            >
                                2052
                            </div>
                            <div
                                class="absolute bottom-0 right-[35%] text-[10px] text-accent-mint font-bold transform translate-y-full pt-3"
                            >
                                2044
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center gap-8 mt-10">
                        <div class="flex items-center gap-2">
                            <div
                                class="w-4 h-0.5 bg-primary border-t-2 border-dashed border-primary/40"
                            ></div>
                            <span
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                                >Current Plan</span
                            >
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-1 bg-accent-mint"></div>
                            <span
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                                >Accelerated</span
                            >
                        </div>
                    </div>
                </div>

                <button
                    class="w-full bg-primary hover:bg-[#C4A030] text-black font-black py-5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all transform active:scale-95 text-lg uppercase tracking-widest"
                >
                    Apply Extra Payment
                </button>
            </div>
        </section>
    </div>

    <!-- FAB -->
    <button
        on:click={startNewLoan}
        class="fixed bottom-24 right-6 size-14 flex items-center justify-center rounded-full bg-primary text-black shadow-2xl active:scale-95 transition-transform z-40"
    >
        <span class="material-symbols-outlined text-3xl font-bold">add</span>
    </button>
</main>
