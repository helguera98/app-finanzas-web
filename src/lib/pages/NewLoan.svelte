<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { api } from "../api";
    import TopHeader from "../components/TopHeader.svelte";
    const dispatch = createEventDispatcher();

    let loading = false;
    let debtType = "loan"; // "loan" or "card"
    let loanName = "";
    let principalAmount = "";
    let annualRate = "";
    let termMonths = "";
    let minPayment = "";

    async function handleSave() {
        if (!loanName.trim() || loading) return;

        loading = true;
        try {
            const loanData = {
                lender: loanName,
                amount: parseFloat(principalAmount) || 0,
                remaining_balance: parseFloat(principalAmount) || 0,
                due_date: new Date().toISOString().split("T")[0],
                interest_rate: parseFloat(annualRate) || 0,
                status: "active",
                // New specialized fields
                debt_type: debtType,
                term_months:
                    debtType === "loan" ? parseInt(termMonths) || null : null,
                min_payment: parseFloat(minPayment) || 0,
            };

            await api.createLoan(loanData);
            dispatch("navigate", { tab: "loans" });
        } catch (e) {
            console.error("Error saving loan:", e);
            alert("Error al guardar deuda: " + e.message);
        } finally {
            loading = false;
        }
    }

    function close() {
        dispatch("navigate", { tab: "loans" });
    }
</script>

<div
    class="new-loan-page bg-background-dark font-display text-slate-100 h-[100dvh] w-full flex flex-col relative overflow-y-auto hide-scrollbar"
>
    <TopHeader title="Add New Debt" on:back={close} />

    <main
        class="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col gap-8 pb-32"
    >
        <!-- Hero Title Section -->
        <section class="space-y-2">
            <h2 class="text-3xl font-bold tracking-tight text-slate-100">
                Añadir <span class="gold-text-gradient">Deuda</span>
            </h2>
            <p class="text-slate-400 text-sm leading-relaxed">
                Ingresa los detalles para que nuestro algoritmo de optimización
                financiera comience a trabajar por ti.
            </p>
        </section>

        <!-- Debt Type Selector -->
        <div
            class="flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-full mb-2 shadow-inner"
        >
            <button
                class="flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 {debtType ===
                'loan'
                    ? 'gold-gradient text-slate-950 shadow-lg glow-gold'
                    : 'text-slate-400 hover:text-slate-200 bg-transparent'}"
                type="button"
                on:click={() => (debtType = "loan")}
            >
                Préstamo
            </button>
            <button
                class="flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 {debtType ===
                'card'
                    ? 'gold-gradient text-slate-950 shadow-lg glow-gold'
                    : 'text-slate-400 hover:text-slate-200 bg-transparent'}"
                type="button"
                on:click={() => (debtType = "card")}
            >
                Tarjeta de Crédito
            </button>
        </div>

        <!-- Form Section -->
        <form class="space-y-6" on:submit|preventDefault={handleSave}>
            <!-- Name Field -->
            <div class="space-y-2 group">
                <label
                    for="loan-name"
                    class="block text-xs font-semibold uppercase tracking-wider text-slate-500 ml-4"
                    >Nombre del Préstamo</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-primary transition-colors"
                        >credit_card</span
                    >
                    <input
                        id="loan-name"
                        bind:value={loanName}
                        class="w-full h-14 pl-12 pr-4 bg-slate-900/50 border border-slate-800 rounded-full focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-100 placeholder:text-slate-600"
                        placeholder="Nombre (Ej. Visa Gold, Hipoteca...)"
                        type="text"
                    />
                </div>
            </div>

            <!-- Main Amount & Rate Row -->
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label
                        for="principal-amount"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 ml-4"
                        >Monto Principal</label
                    >
                    <div class="relative">
                        <span
                            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium"
                            >$</span
                        >
                        <input
                            id="principal-amount"
                            bind:value={principalAmount}
                            class="w-full h-14 pl-10 pr-4 bg-slate-900/50 border border-slate-800 rounded-full focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-100 placeholder:text-slate-600 no-arrows"
                            placeholder="0.00"
                            type="number"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <label
                        for="annual-rate"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 ml-4"
                        >Tasa Anual</label
                    >
                    <div class="relative">
                        <span
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium"
                            >%</span
                        >
                        <input
                            id="annual-rate"
                            bind:value={annualRate}
                            class="w-full h-14 pl-4 pr-10 bg-slate-900/50 border border-slate-800 rounded-full focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-100 placeholder:text-slate-600 no-arrows"
                            placeholder="0.0"
                            type="number"
                        />
                    </div>
                </div>
            </div>

            <!-- Term & Min Payment Row -->
            <div
                class="grid {debtType === 'loan'
                    ? 'grid-cols-2'
                    : 'grid-cols-1'} gap-4"
            >
                {#if debtType === "loan"}
                    <div class="space-y-2">
                        <label
                            for="term-months"
                            class="block text-xs font-semibold uppercase tracking-wider text-slate-500 ml-4"
                            >Plazo (Meses)</label
                        >
                        <div class="relative">
                            <span
                                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                                >event_repeat</span
                            >
                            <input
                                id="term-months"
                                bind:value={termMonths}
                                class="w-full h-14 pl-12 pr-4 bg-slate-900/50 border border-slate-800 rounded-full focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-100 placeholder:text-slate-600 no-arrows"
                                placeholder="12"
                                type="number"
                            />
                        </div>
                    </div>
                {/if}
                <div class="space-y-2">
                    <label
                        for="min-payment"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 ml-4"
                        >Pago Mínimo Sugerido</label
                    >
                    <div class="relative">
                        <span
                            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium"
                            >$</span
                        >
                        <input
                            id="min-payment"
                            bind:value={minPayment}
                            class="w-full h-14 pl-10 pr-4 bg-slate-900/50 border border-slate-800 rounded-full focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-100 placeholder:text-slate-600 no-arrows"
                            placeholder="0.00"
                            type="number"
                        />
                    </div>
                </div>
            </div>

            <!-- Premium Visual Note -->
            <div
                class="relative overflow-hidden p-4 rounded-xl border border-gold/30 bg-gold/5 group"
            >
                <div class="absolute inset-0 gold-gradient opacity-5"></div>
                <div class="flex items-start gap-3 relative z-10">
                    <span class="material-symbols-outlined text-gold mt-0.5"
                        >auto_awesome</span
                    >
                    <p class="text-sm font-medium gold-label leading-snug">
                        Calcularemos tus ahorros por pagos extra automáticamente
                        para que salgas de deudas más rápido.
                    </p>
                </div>
            </div>

            <!-- CTA Button -->
            <button
                class="w-full h-16 gold-gradient rounded-full flex items-center justify-center gap-2 text-slate-950 font-bold text-lg glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
            >
                <span class="material-symbols-outlined"
                    >{loading ? "sync" : "add_task"}</span
                >
                {loading ? "GUARDANDO..." : "Guardar Registro"}
            </button>
        </form>
    </main>
</div>

<style>
    .gold-gradient {
        background: linear-gradient(45deg, #996515, #d4af37, #f9e2af, #d4af37);
        background-size: 200% 200%;
        animation: gradient-flow 5s ease infinite;
    }

    @keyframes gradient-flow {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .gold-text-gradient {
        background: linear-gradient(45deg, #d4af37, #f9e2af);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .glow-gold {
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }

    .gold-label {
        color: #f9e2af;
    }

    /* Hide number input arrows */
    input.no-arrows::-webkit-outer-spin-button,
    input.no-arrows::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
    }

    input.no-arrows {
        -moz-appearance: textfield !important;
        appearance: none !important;
    }
</style>
