<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import TopHeader from "../components/TopHeader.svelte";
    const dispatch = createEventDispatcher();

    let loans = [];
    let loading = true;
    let extraPayment = 500;
    let selectedLoanIndex = 0;

    $: totalPrincipal = loans.reduce((sum, l) => sum + (l.amount || 0), 0);
    $: totalRemaining = loans.reduce(
        (sum, l) => sum + (l.remaining_balance || 0),
        0,
    );
    $: totalInterestEstimate = Math.max(0, totalRemaining - totalPrincipal);
    $: debtRatio =
        totalPrincipal > 0 ? (totalRemaining / totalPrincipal) * 100 : 0;

    onMount(fetchLoans);

    async function fetchLoans() {
        loading = true;
        try {
            loans = await api.getLoans();
        } catch (e) {
            console.error("Error fetching loans:", e);
        } finally {
            loading = false;
        }
    }

    async function applyPayment() {
        if (loans.length === 0) return;
        const loan = loans[selectedLoanIndex];
        if (
            !confirm(
                `¿Deseas aplicar un pago extra de $${extraPayment} a ${loan.lender}?`,
            )
        )
            return;

        try {
            loading = true;
            await api.applyExtraPayment(loan.id, extraPayment);
            await fetchLoans();
            alert("Pago extra aplicado correctamente");
        } catch (e) {
            console.error("Error applying payment:", e);
            alert("Error al aplicar el pago: " + e.message);
        } finally {
            loading = false;
        }
    }

    async function deleteLoan(id) {
        if (!confirm("¿Estás seguro de que deseas eliminar esta deuda?"))
            return;
        try {
            await api.deleteLoan(id);
            if (
                selectedLoanIndex >= loans.length - 1 &&
                selectedLoanIndex > 0
            ) {
                selectedLoanIndex--;
            }
            await fetchLoans();
        } catch (e) {
            console.error("Error deleting loan:", e);
            alert("Error al eliminar la deuda");
        }
    }

    function startNewLoan() {
        dispatch("navigate", { tab: "new_loan" });
    }

    function calculatePayoff(loan, additionalMonthly = 0) {
        if (!loan || loan.remaining_balance <= 0) return [];

        let balance = loan.remaining_balance;
        const rate = (loan.interest_rate || 0) / 100 / 12;
        const minPay = loan.min_payment || loan.amount * 0.03; // Fallback to 3%
        const totalPay = minPay + additionalMonthly;

        const schedule = [{ x: 0, y: balance }];
        let months = 0;

        // Max 30 years to prevent infinite loops
        while (balance > 0 && months < 360) {
            const interest = balance * rate;
            const principal = totalPay - interest;

            if (principal <= 0 && balance > 0) {
                // Not even covering interest
                return schedule;
            }

            balance -= principal;
            if (balance < 0) balance = 0;
            months++;
            schedule.push({ x: months, y: balance });
        }
        return schedule;
    }

    $: selectedLoan = loans[selectedLoanIndex];
    $: normalSchedule = calculatePayoff(selectedLoan, 0);
    $: acceleratedSchedule = calculatePayoff(selectedLoan, extraPayment);

    function getPath(schedule, maxMonths, maxBalance) {
        if (schedule.length < 2) return "";
        return schedule
            .map((p) => {
                const x = (p.x / maxMonths) * 100;
                const y = 100 - (p.y / maxBalance) * 100;
                return `${x},${y}`;
            })
            .join(" L ");
    }

    $: maxMonths = Math.max(
        normalSchedule.length > 0
            ? normalSchedule[normalSchedule.length - 1].x
            : 1,
        acceleratedSchedule.length > 0
            ? acceleratedSchedule[acceleratedSchedule.length - 1].x
            : 1,
        12, // At least 1 year
    );
    $: maxBalance = selectedLoan ? selectedLoan.remaining_balance : 1;

    $: normalPath = "M " + getPath(normalSchedule, maxMonths, maxBalance);
    $: acceleratedPath =
        "M " + getPath(acceleratedSchedule, maxMonths, maxBalance);

    $: yearsSaved =
        normalSchedule.length > 0 && acceleratedSchedule.length > 0
            ? (
                  (normalSchedule.length - acceleratedSchedule.length) /
                  12
              ).toFixed(1)
            : 0;

    $: currentYear = new Date().getFullYear();
    $: endYearNormal = currentYear + Math.ceil(maxMonths / 12);
    $: endYearAccelerated =
        currentYear +
        (acceleratedSchedule.length > 0
            ? Math.ceil(
                  acceleratedSchedule[acceleratedSchedule.length - 1].x / 12,
              )
            : 0);

    function goBack() {
        dispatch("navigate", { tab: "home" });
    }
</script>

<main class="main-content hide-scrollbar bg-background-dark">
    <TopHeader
        title="Debt Control"
        on:back={goBack}
        rightIcon="account_circle"
    />

    <div class="max-w-lg mx-auto w-full pb-10">
        <section class="p-6">
            <div class="flex justify-between items-end mb-6">
                <h2 class="text-xl font-bold">Tus Deudas Activas</h2>
                <button
                    class="text-primary text-sm font-semibold"
                    on:click={fetchLoans}>Actualizar</button
                >
            </div>

            {#if loading}
                <div class="flex flex-col items-center justify-center py-10">
                    <div
                        class="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4"
                    ></div>
                    <p class="text-xs text-slate-500 font-bold uppercase">
                        Cargando deudas...
                    </p>
                </div>
            {:else if loans.length === 0}
                <div
                    class="p-10 text-center border border-dashed border-primary/20 rounded-2xl bg-primary/5"
                >
                    <span
                        class="material-symbols-outlined text-4xl text-primary/40 mb-3"
                        >account_balance_wallet</span
                    >
                    <p
                        class="text-xs text-slate-400 font-bold uppercase tracking-widest"
                    >
                        No tienes deudas registradas
                    </p>
                    <button
                        class="mt-4 text-primary text-sm font-black underline"
                        on:click={startNewLoan}
                        >Registrar mi primera deuda</button
                    >
                </div>
            {:else}
                <div
                    class="flex gap-4 overflow-x-auto pb-6 pt-2 px-4 snap-x hide-scrollbar -mx-4"
                >
                    {#each loans as loan, i}
                        <div
                            on:click={() => (selectedLoanIndex = i)}
                            class="min-w-[280px] snap-center bg-card-dark border p-6 rounded-xl shadow-2xl relative group cursor-pointer transition-all {selectedLoanIndex ===
                            i
                                ? 'border-primary ring-1 ring-primary/50 scale-[1.02]'
                                : 'border-primary/20 hover:border-primary/40'}"
                        >
                            <button
                                on:click|stopPropagation={() =>
                                    deleteLoan(loan.id)}
                                class="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <span class="material-symbols-outlined text-lg"
                                    >delete</span
                                >
                            </button>
                            <div class="flex justify-between items-start mb-4">
                                <div class="p-2 bg-primary/10 rounded-lg">
                                    <span
                                        class="material-symbols-outlined text-primary"
                                        >payments</span
                                    >
                                </div>
                                <div class="flex flex-col items-end gap-1">
                                    <span
                                        class="px-3 py-1 bg-slate-800 text-[10px] font-bold rounded-full uppercase tracking-wider text-slate-300"
                                        >{loan.status}</span
                                    >
                                    {#if selectedLoanIndex === i}
                                        <span
                                            class="text-[8px] font-black text-primary uppercase tracking-[0.2em]"
                                            >Seleccionado</span
                                        >
                                    {/if}
                                </div>
                            </div>
                            <p class="text-slate-500 text-sm mb-1">
                                {loan.lender}
                            </p>
                            <h3 class="text-2xl font-bold mb-4 text-slate-100">
                                ${loan.remaining_balance.toLocaleString()}
                            </h3>
                            <div class="space-y-2">
                                <div class="flex justify-between text-xs">
                                    <span class="text-slate-500"
                                        >Tasa de Interés</span
                                    >
                                    <span class="text-primary font-medium"
                                        >{loan.interest_rate}%</span
                                    >
                                </div>
                                <div class="flex justify-between text-xs">
                                    <span class="text-slate-500"
                                        >Monto Inicial</span
                                    >
                                    <span class="font-medium text-slate-300"
                                        >${loan.amount.toLocaleString()}</span
                                    >
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>

        <section class="px-6 py-2">
            <div
                class="bg-primary/5 rounded-xl p-6 border border-primary/20 shadow-lg"
            >
                <div class="flex items-center gap-3 mb-4">
                    <span class="material-symbols-outlined text-primary"
                        >analytics</span
                    >
                    <h3 class="font-bold text-slate-100">Resumen de Deuda</h3>
                </div>
                <div
                    class="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex"
                >
                    <div
                        class="h-full bg-primary shadow-primary/40 transition-all duration-700"
                        style="width: {debtRatio}%"
                    ></div>
                    <div
                        class="h-full bg-slate-700"
                        style="width: {100 - debtRatio}%"
                    ></div>
                </div>
                <div class="flex justify-between mt-3 text-sm">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-2 h-2 rounded-full bg-primary shadow-primary/40"
                        ></div>
                        <span class="text-slate-400"
                            >Restante (${totalRemaining.toLocaleString()})</span
                        >
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-slate-700"></div>
                        <span class="text-slate-400">Total pagado</span>
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

                <div
                    class="bg-accent-mint/5 border border-accent-mint/20 p-5 rounded-xl flex flex-col items-center text-center"
                >
                    <span
                        class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2"
                        >Años Ahorrados</span
                    >
                    <span class="text-2xl font-black text-accent-mint"
                        >{yearsSaved} Años</span
                    >
                </div>
                <div
                    class="bg-accent-mint/5 border border-accent-mint/20 p-5 rounded-xl flex flex-col items-center text-center"
                >
                    <span
                        class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2"
                        >Interés Ahorrado</span
                    >
                    <span class="text-2xl font-black text-accent-mint"
                        >${Math.round(
                            (extraPayment / 100) * (totalRemaining * 0.1),
                        ).toLocaleString()}</span
                    >
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
                                <!-- Current Plan Path -->
                                <path
                                    d={normalPath}
                                    fill="none"
                                    stroke="var(--color-primary)"
                                    stroke-dasharray="4"
                                    stroke-width="2"
                                    opacity="0.4"
                                ></path>
                                <!-- Accelerated Path -->
                                <path
                                    d={acceleratedPath}
                                    fill="none"
                                    stroke="var(--color-accent-mint)"
                                    stroke-width="3"
                                ></path>
                            </svg>
                            <div
                                class="absolute top-0 left-0 text-[10px] text-slate-600 transform -translate-x-full pr-3 whitespace-nowrap"
                            >
                                ${Math.round(maxBalance / 1000)}k
                            </div>
                            <div
                                class="absolute bottom-0 left-0 text-[10px] text-slate-600 transform translate-y-full pt-3"
                            >
                                Today
                            </div>
                            <div
                                class="absolute bottom-0 right-0 text-[10px] text-slate-600 transform translate-y-full pt-3"
                            >
                                {endYearNormal}
                            </div>
                            {#if yearsSaved > 0}
                                <div
                                    class="absolute bottom-0 text-[10px] text-accent-mint font-bold transform translate-y-full pt-3 transition-all duration-500"
                                    style="left: {(acceleratedSchedule.length /
                                        maxMonths) *
                                        100}%"
                                >
                                    {endYearAccelerated}
                                </div>
                            {/if}
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
                    on:click={applyPayment}
                    class="w-full bg-primary hover:bg-[#C4A030] text-black font-black py-5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all transform active:scale-95 text-lg uppercase tracking-widest disabled:opacity-50 disabled:pointer-events-none"
                    disabled={loans.length === 0 ||
                        loans[selectedLoanIndex]?.remaining_balance <= 0}
                >
                    {loans[selectedLoanIndex]?.remaining_balance <= 0
                        ? "Loan Fully Paid"
                        : "Apply Extra Payment"}
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
