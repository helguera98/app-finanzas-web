<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function goToLogin() {
        dispatch("navigate", "login");
    }

    function goToRegister() {
        dispatch("navigate", "register");
    }
</script>

<div
    class="landing-page-container bg-background-dark font-display text-slate-100 h-screen w-full flex flex-col relative overflow-y-auto hide-scrollbar"
>
    <!-- Decorative background elements (Same as Login/Register for consistency) -->
    <div
        class="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div
        class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"
    ></div>

    <!-- Aurora Background Glows -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div
            class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
        ></div>
        <div
            class="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"
        ></div>
    </div>

    <div
        class="relative w-full max-w-md mx-auto my-auto flex flex-col min-h-full py-8"
    >
        <!-- Header / Logo Area -->
        <header class="flex items-center justify-center pt-10 pb-4 z-10">
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
                >
                    <span
                        class="material-symbols-outlined text-black text-xl font-bold"
                        >payments</span
                    >
                </div>
                <h2
                    class="text-white text-2xl font-black tracking-tighter uppercase italic"
                >
                    Golden <span class="text-primary">Flow</span>
                </h2>
            </div>
        </header>

        <!-- Main Content Area -->
        <main
            class="flex-1 flex flex-col items-center px-8 text-center justify-center z-10 py-6"
        >
            <!-- Hero Illustration -->
            <div class="relative w-full aspect-square max-w-[320px] mb-12">
                <!-- Glowing effect -->
                <div
                    class="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse"
                ></div>

                <!-- Abstract Container -->
                <div
                    class="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-card-dark flex items-center justify-center shadow-2xl"
                >
                    <div
                        class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-from),transparent_70%)] from-primary/40"
                    ></div>
                    <div
                        class="relative z-10 w-56 h-56 bg-contain bg-center bg-no-repeat"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuArMPOqmr7Dmr3wI7vXQjmxs61Fa-psyCy-J5VhV5euUNTLFgIMm_Y-21NiBjrTawj_6olUYRYvIE2cuCRZgMdW0TQ_NgGi-wcj9XnZB6TGpbsuDNoVhGIMCkZsHKjCMzdFfnvgyHGLwDQPgU2ifinKnLQIqAYpmhJNRqw28kDzwk9jLddDbQQNQXYgUt5rjuFzvhDfTPqKPOdT3VCdc8e0UGZLOZ94B6qu8yuG8fMTj4xRaRYxZyzscN5z-NJK5slsk_koo8tWiMLX');"
                    ></div>
                </div>
            </div>

            <!-- Typography Block -->
            <div class="space-y-5 mb-12 w-full max-w-sm">
                <h1
                    class="text-white text-4xl font-black leading-tight tracking-tighter uppercase italic"
                >
                    Welcome to your <br />
                    <span
                        class="text-primary drop-shadow-[0_0_15px_rgba(19,19,236,0.3)]"
                        >financial freedom</span
                    >
                </h1>

                <div class="flex flex-col gap-5 text-left pt-4 pl-4">
                    <div class="flex items-center gap-4">
                        <div
                            class="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
                        >
                            <span
                                class="material-symbols-outlined text-primary text-base font-black"
                                >check</span
                            >
                        </div>
                        <p
                            class="text-slate-400 text-xs font-black uppercase tracking-widest"
                        >
                            Track expenses with precision
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div
                            class="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
                        >
                            <span
                                class="material-symbols-outlined text-primary text-base font-black"
                                >check</span
                            >
                        </div>
                        <p
                            class="text-slate-400 text-xs font-black uppercase tracking-widest"
                        >
                            Manage bills effortlessly
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div
                            class="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
                        >
                            <span
                                class="material-symbols-outlined text-primary text-base font-black"
                                >check</span
                            >
                        </div>
                        <p
                            class="text-slate-400 text-xs font-black uppercase tracking-widest"
                        >
                            Master your debt journey
                        </p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer / CTA Area -->
        <footer class="px-8 pb-14 flex flex-col items-center gap-10 z-10">
            <!-- Get Started Button -->
            <button
                class="w-full h-16 bg-primary text-black font-black text-sm rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em]"
                on:click={goToRegister}
            >
                Get Started
            </button>

            <!-- Pagination Dots -->
            <div class="flex items-center gap-3">
                <div
                    class="h-2 w-8 rounded-full bg-primary shadow-lg shadow-primary/50"
                ></div>
                <div class="h-2 w-2 rounded-full bg-white/10"></div>
                <div class="h-2 w-2 rounded-full bg-white/10"></div>
            </div>

            <p
                class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]"
            >
                Already have an account?
                <button
                    class="text-primary font-black ml-1 hover:underline transition-all"
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
    .landing-page-container {
        z-index: 100;
        background-color: #050505;
    }
</style>
