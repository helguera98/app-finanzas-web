<script>
    import { createEventDispatcher } from "svelte";
    import { api } from "../api";
    const dispatch = createEventDispatcher();

    let fullName = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let showPassword = false;
    let agreeTerms = false;
    let loading = false;
    let error = "";

    async function handleRegister() {
        if (!email || !password || !fullName) {
            error = "All fields are required";
            return;
        }
        if (password !== confirmPassword) {
            error = "Passwords do not match";
            return;
        }

        loading = true;
        error = "";

        try {
            await api.register({
                email,
                password,
                full_name: fullName,
            });
            dispatch("registered");
        } catch (e) {
            error = e.message || "Registration failed";
        } finally {
            loading = false;
        }
    }

    function goToLogin() {
        dispatch("navigate", "login");
    }
</script>

<div
    class="register-page-container bg-background-dark font-display text-slate-100 h-screen flex flex-col py-6 px-6 relative overflow-y-auto hide-scrollbar"
>
    <!-- Aurora Background Glows (Same as Login for consistency) -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div
            class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
        ></div>
        <div
            class="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"
        ></div>
    </div>

    <!-- Top Navigation -->
    <div
        class="flex items-center justify-between max-w-md mx-auto w-full z-20 mb-2"
    >
        <button
            class="text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-800/50 border border-white/5 hover:border-primary/50 transition-colors"
            on:click={goToLogin}
        >
            <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="flex-1"></div>
        <div class="size-10"></div>
    </div>

    <!-- Main Content wrapper -->
    <div class="relative w-full max-w-[440px] z-10 mx-auto my-auto py-4">
        <!-- Header Section -->
        <header class="text-center mb-6">
            <h1
                class="gold-gradient-text text-4xl font-black tracking-tighter mb-2 italic uppercase"
            >
                Create Account
            </h1>
            <p
                class="text-slate-500 text-sm font-bold uppercase tracking-widest"
            >
                Start your journey to financial freedom
            </p>
        </header>

        <!-- Registration Form -->
        <form class="space-y-5" on:submit|preventDefault={handleRegister}>
            {#if error}
                <div
                    class="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-bold animate-shake"
                >
                    {error}
                </div>
            {/if}

            <!-- Full Name -->
            <div class="space-y-2">
                <label
                    for="fullName"
                    class="text-[10px] font-black ml-5 text-slate-500 uppercase tracking-widest"
                    >Full Name</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >person</span
                    >
                    <input
                        id="fullName"
                        class="w-full pl-14 pr-6 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
                        placeholder="Enter your full name"
                        type="text"
                        bind:value={fullName}
                    />
                </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <label
                    for="email"
                    class="text-[10px] font-black ml-5 text-slate-500 uppercase tracking-widest"
                    >Email Address</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >mail</span
                    >
                    <input
                        id="email"
                        class="w-full pl-14 pr-6 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
                        placeholder="name@email.com"
                        type="email"
                        bind:value={email}
                    />
                </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
                <label
                    for="password"
                    class="text-[10px] font-black ml-5 text-slate-500 uppercase tracking-widest"
                    >Password</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >lock</span
                    >
                    {#if showPassword}
                        <input
                            id="password"
                            class="w-full pl-14 pr-16 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
                            placeholder="••••••••"
                            type="text"
                            bind:value={password}
                        />
                    {:else}
                        <input
                            id="password"
                            class="w-full pl-14 pr-16 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
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

            <!-- Confirm Password -->
            <div class="space-y-2">
                <label
                    for="confirmPassword"
                    class="text-[10px] font-black ml-5 text-slate-500 uppercase tracking-widest"
                    >Confirm Password</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >lock_reset</span
                    >
                    {#if showPassword}
                        <input
                            id="confirmPassword"
                            class="w-full pl-14 pr-6 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
                            placeholder="Confirm your password"
                            type="text"
                            bind:value={confirmPassword}
                        />
                    {:else}
                        <input
                            id="confirmPassword"
                            class="w-full pl-14 pr-6 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
                            placeholder="Confirm your password"
                            type="password"
                            bind:value={confirmPassword}
                        />
                    {/if}
                </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="flex items-center gap-3 px-3 py-2">
                <div class="relative flex items-center">
                    <input
                        class="peer appearance-none size-6 border-2 border-white/10 rounded-lg checked:bg-primary checked:border-primary focus:ring-0 transition-all cursor-pointer"
                        id="terms"
                        type="checkbox"
                        bind:checked={agreeTerms}
                    />
                    <span
                        class="material-symbols-outlined absolute text-black text-lg opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >check</span
                    >
                </div>
                <label
                    class="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer"
                    for="terms"
                >
                    I agree to the <button
                        type="button"
                        class="text-primary hover:underline font-black"
                        >Terms and Conditions</button
                    >
                </label>
            </div>

            <!-- CTA Button -->
            <div class="pt-6">
                <button
                    class="w-full bg-primary text-black font-black py-5 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all text-sm uppercase tracking-[0.2em] disabled:opacity-50 disabled:pointer-events-none"
                    type="submit"
                    disabled={!agreeTerms || loading}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </div>
        </form>

        <!-- Footer -->
        <footer class="mt-10 text-center">
            <p
                class="text-slate-500 text-[10px] font-bold uppercase tracking-widest"
            >
                Already have an account?
                <button
                    class="text-primary font-black ml-1 hover:underline"
                    on:click={goToLogin}>Log In</button
                >
            </p>
        </footer>
    </div>

    <!-- Decorative Bottom Gradient -->
    <div
        class="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
    ></div>
</div>

<style>
    .register-page-container {
        z-index: 100;
    }
</style>
