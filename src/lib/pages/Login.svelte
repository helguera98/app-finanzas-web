<script>
    import { createEventDispatcher } from "svelte";
    import { api } from "../api";
    const dispatch = createEventDispatcher();

    let email = "";
    let password = "";
    let showPassword = false;
    let loading = false;
    let error = "";

    async function handleLogin() {
        if (!email || !password) {
            error = "Please enter both email and password";
            return;
        }

        loading = true;
        error = "";

        try {
            await api.login(email, password);
            dispatch("login");
        } catch (e) {
            error = e.message || "Invalid credentials";
        } finally {
            loading = false;
        }
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
            class="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px]"
        ></div>
        <div
            class="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px]"
        ></div>
    </div>

    <div class="relative w-full max-w-[400px] z-10 mx-auto my-auto">
        <!-- Brand Logo Section -->
        <header class="text-center mb-12">
            <div class="flex justify-center mb-6">
                <div
                    class="size-20 rounded-3xl bg-surface-dark border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group"
                >
                    <div
                        class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    ></div>
                    <span
                        class="material-symbols-outlined text-primary text-4xl font-light"
                        >security</span
                    >
                </div>
            </div>
            <h1
                class="text-slate-100 text-4xl font-black tracking-tighter mb-2 italic uppercase"
            >
                Obsidian <span class="gold-gradient-text italic">Gold</span>
            </h1>
            <p
                class="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]"
            >
                Elite Financial Management
            </p>
        </header>

        <!-- Login Form -->
        <form class="space-y-6" on:submit|preventDefault={handleLogin}>
            {#if error}
                <div
                    class="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-bold"
                >
                    {error}
                </div>
            {/if}

            <div class="space-y-2">
                <label
                    for="email"
                    class="text-[10px] font-black ml-5 text-slate-500 uppercase tracking-widest"
                    >Identification</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl"
                        >alternate_email</span
                    >
                    <input
                        id="email"
                        class="w-full pl-14 pr-6 py-4 rounded-full border border-white/5 bg-card-dark focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-slate-600 font-bold text-white"
                        placeholder="ACCESS_ID"
                        type="email"
                        bind:value={email}
                    />
                </div>
            </div>

            <div class="space-y-2">
                <label
                    for="password"
                    class="text-[10px] font-black ml-5 text-slate-500 uppercase tracking-widest"
                    >Secure Key</label
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

            <div class="flex items-center justify-end px-4">
                <button
                    class="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors"
                    type="button"
                >
                    Recover Access
                </button>
            </div>

            <div class="pt-4">
                <button
                    class="w-full bg-primary text-black font-black py-5 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all text-sm uppercase tracking-[0.2em] disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Authenticating..." : "Authorize Access"}
                </button>
            </div>
        </form>

        <footer class="mt-12 text-center">
            <p
                class="text-slate-500 text-[10px] font-bold uppercase tracking-widest"
            >
                New Operator? <button
                    class="text-primary font-black ml-1 hover:underline"
                    on:click={goToSignUp}>Create Access ID</button
                >
            </p>
        </footer>
    </div>
</div>

<style>
    .login-page-container {
        z-index: 100;
    }
</style>
