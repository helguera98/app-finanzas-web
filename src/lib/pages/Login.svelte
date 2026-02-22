<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let email = "";
    let password = "";
    let showPassword = false;

    function handleLogin() {
        // Mock login
        dispatch("login");
    }

    function goToSignUp() {
        dispatch("navigate", "register");
    }
</script>

<div
    class="login-page-container bg-background-dark font-display text-slate-100 h-screen flex flex-col py-12 px-6 relative overflow-y-auto hide-scrollbar"
>
    <!-- Aurora Background Glows -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div
            class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
        ></div>
        <div
            class="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"
        ></div>
    </div>

    <div class="relative w-full max-w-[440px] z-10 mx-auto my-auto py-8">
        <!-- Top Navigation Area -->
        <div class="flex items-center justify-between mb-12">
            <button
                class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-white/5 hover:border-primary/50 transition-colors"
                on:click={goToSignUp}
            >
                <span class="material-symbols-outlined text-xl">arrow_back</span
                >
            </button>
            <div class="flex items-center gap-2">
                <div
                    class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                ></div>
                <span
                    class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
                    >Premium Finance</span
                >
            </div>
        </div>

        <!-- Branding -->
        <div class="text-center mb-12">
            <h1 class="text-5xl font-black tracking-tighter text-white mb-3">
                GOLDEN <span class="text-primary italic">FLOW</span>
            </h1>
            <p
                class="text-slate-500 text-sm font-bold uppercase tracking-[0.1em]"
            >
                Elevate your financial future
            </p>
        </div>

        <!-- Login Form -->
        <form class="space-y-6" on:submit|preventDefault={handleLogin}>
            <div class="space-y-3">
                <label
                    for="email"
                    class="block text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-5"
                    >Email Address</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >mail</span
                    >
                    <input
                        id="email"
                        class="w-full bg-card-dark border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 font-bold"
                        placeholder="name@example.com"
                        type="email"
                        bind:value={email}
                    />
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex justify-between items-center px-5">
                    <label
                        for="password"
                        class="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >Password</label
                    >
                    <button
                        type="button"
                        class="text-[10px] font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
                        >Forgot?</button
                    >
                </div>
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >lock</span
                    >
                    {#if showPassword}
                        <input
                            id="password"
                            class="w-full bg-card-dark border border-white/5 rounded-full py-5 pl-14 pr-16 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 font-bold"
                            placeholder="••••••••"
                            type="text"
                            bind:value={password}
                        />
                    {:else}
                        <input
                            id="password"
                            class="w-full bg-card-dark border border-white/5 rounded-full py-5 pl-14 pr-16 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 font-bold"
                            placeholder="••••••••"
                            type="password"
                            bind:value={password}
                        />
                    {/if}
                    <button
                        class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
                        type="button"
                        on:click={() => (showPassword = !showPassword)}
                    >
                        <span class="material-symbols-outlined"
                            >{showPassword
                                ? "visibility_off"
                                : "visibility"}</span
                        >
                    </button>
                </div>
            </div>

            <button
                class="w-full bg-primary text-black font-black py-5 rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm"
                type="submit"
            >
                Sign In
            </button>
        </form>

        <!-- Divider -->
        <div class="relative my-12">
            <div aria-hidden="true" class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white/5"></div>
            </div>
            <div
                class="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black"
            >
                <span class="px-6 text-slate-500 bg-background-dark"
                    >Or continue with</span
                >
            </div>
        </div>

        <!-- Social Logins -->
        <div class="grid grid-cols-2 gap-4 mb-12">
            <button
                class="flex items-center justify-center gap-3 bg-card-dark border border-white/5 py-4 rounded-full hover:bg-white/5 transition-all active:scale-95"
            >
                <img
                    alt="Google"
                    class="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB-88zZRiLIzsJFEmsRNZc4f8H3fKYXVtkaa9FG3b_yXKoadU9i23EmOpnqgdkpaFt3tExYwEuTYKypXc8XtaI_iITDtZbWWnw8EtjMbR8EUY2bL1Qc0P3ID_MCzGWk6Po_Jo9Inq09W7nW_wvj5kaNE2Ok3WqpqsEbJi7_0WQ4CXnsB_lfKJRT3lIbWEORcu2wrttaxyeKsHXPR5zlMnR7e2GS9xgpaTDqTIJbXU_80iWQIn7Drqmnla0md7jYZzJNx-QmbB70wMb"
                />
                <span
                    class="text-xs font-black text-slate-200 uppercase tracking-widest"
                    >Google</span
                >
            </button>
            <button
                class="flex items-center justify-center gap-3 bg-card-dark border border-white/5 py-4 rounded-full hover:bg-white/5 transition-all active:scale-95"
            >
                <span class="material-symbols-outlined text-2xl text-white"
                    >phone_iphone</span
                >
                <span
                    class="text-xs font-black text-slate-200 uppercase tracking-widest"
                    >Apple</span
                >
            </button>
        </div>

        <!-- Footer -->
        <p
            class="text-center text-slate-500 text-xs font-bold uppercase tracking-widest"
        >
            Don't have an account?
            <button
                class="text-primary font-black ml-1 hover:underline transition-all"
                on:click={goToSignUp}>Sign Up</button
            >
        </p>

        <!-- Premium Badge -->
        <div class="mt-14 flex justify-center opacity-40">
            <div
                class="px-5 py-2 rounded-full border border-primary/30 flex items-center gap-2"
            >
                <span class="material-symbols-outlined text-primary text-sm"
                    >workspace_premium</span
                >
                <span
                    class="text-[9px] uppercase tracking-[0.3em] font-black text-primary"
                    >Exclusive Access</span
                >
            </div>
        </div>
    </div>

    <!-- Decorative Bottom Gradient -->
    <div
        class="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
    ></div>
</div>

<style>
    .login-page-container {
        z-index: 100;
    }
</style>
