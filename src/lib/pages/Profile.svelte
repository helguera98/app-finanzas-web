<script>
    import { createEventDispatcher } from "svelte";
    import TopHeader from "../components/TopHeader.svelte";
    export let user = null;
    const dispatch = createEventDispatcher();

    let biometricLogin = true;
    let pushNotifications = false;

    const alexAvatar =
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBld12Gl2zoab74PX5dQ2SrlwoGnj_bL3NXcp26ZLxGauf0GEHMnYwAJfqQIcmjubLVQXDxkjfqw3e0mxyRfx8EpFdFjasyapIU4N1wjT_YLEGYE1bXyRs1SFpFxLnu3iZMCpcGpuIEhweHOxIjvxyB5oP1FoYoWXZg5KM460QAlGmtLhIpZ4XMIcwWO8pXs-RFkFEcPR_4yG59GR9PjxFk7e-nZmb7ewat9OW-fmnLEXrLt74JJBL8EVHh7XgUwsybZF2ZqZDncul7";

    function goBack() {
        dispatch("navigate", { tab: "home" });
    }
</script>

<main class="main-content hide-scrollbar bg-background-dark">
    <TopHeader
        title="Profile Settings"
        on:back={goBack}
        rightIcon="more_horiz"
    />

    <div class="max-w-lg mx-auto px-6 pb-10">
        <!-- Profile Section -->
        <section class="flex flex-col items-center mt-8 mb-12">
            <div class="relative">
                <div
                    class="size-32 rounded-full p-1 gold-gradient shadow-2xl shadow-primary/20"
                >
                    <div
                        class="size-full rounded-full border-4 border-background-dark overflow-hidden bg-surface-dark bg-cover bg-center"
                        style="background-image: url('{alexAvatar}')"
                    ></div>
                </div>
                <div
                    class="absolute bottom-0 right-0 gold-gradient text-background-dark text-[10px] font-black px-3 py-1 rounded-full border-2 border-background-dark uppercase tracking-widest"
                >
                    Pro
                </div>
            </div>
            <div class="text-center mt-6">
                <h2 class="text-2xl font-black text-slate-100 tracking-tight">
                    {user?.full_name || "Premium Member"}
                </h2>
                <p
                    class="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2"
                >
                    {user?.email || "Active Account"}
                </p>
                <div class="mt-4 flex items-center justify-center gap-2">
                    <span
                        class="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest"
                        >Verified Identity</span
                    >
                </div>
            </div>
        </section>

        <!-- Category: Account & Security -->
        <section class="mb-10">
            <h3
                class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-5 ml-2"
            >
                Account & Security
            </h3>
            <div
                class="bg-surface-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
                <!-- Manage Profile -->
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >person</span
                            >
                        </div>
                        <span class="font-bold text-slate-200"
                            >Manage Profile</span
                        >
                    </div>
                    <span class="material-symbols-outlined text-slate-600"
                        >chevron_right</span
                    >
                </button>
                <div class="h-px bg-white/5 mx-5"></div>
                <!-- Change Password -->
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >lock</span
                            >
                        </div>
                        <span class="font-bold text-slate-200"
                            >Change Password</span
                        >
                    </div>
                    <span class="material-symbols-outlined text-slate-600"
                        >chevron_right</span
                    >
                </button>
                <div class="h-px bg-white/5 mx-5"></div>
                <!-- Biometric Toggle -->
                <div class="flex items-center justify-between p-5">
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >fingerprint</span
                            >
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-200"
                                >Biometric Login</span
                            >
                            <span
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                                >FaceID or Fingerprint</span
                            >
                        </div>
                    </div>
                    <button
                        class="w-12 h-6 rounded-full p-0.5 relative transition-all {biometricLogin
                            ? 'gold-gradient'
                            : 'bg-slate-800'}"
                        on:click={() => (biometricLogin = !biometricLogin)}
                    >
                        <div
                            class="size-5 rounded-full bg-white shadow-sm transition-all {biometricLogin
                                ? 'ml-auto'
                                : 'ml-0'}"
                        ></div>
                    </button>
                </div>
            </div>
        </section>

        <!-- Category: Financial Setup -->
        <section class="mb-10">
            <h3
                class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-5 ml-2"
            >
                Financial Setup
            </h3>
            <div
                class="bg-surface-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
                <!-- NOTE: Bank Accounts section removed per user request -->

                <!-- Currency Selection -->
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >currency_exchange</span
                            >
                        </div>
                        <span class="font-bold text-slate-200"
                            >Default Currency</span
                        >
                    </div>
                    <div class="flex items-center gap-2">
                        <span
                            class="text-xs font-black text-slate-500 uppercase tracking-widest"
                            >USD ($)</span
                        >
                        <span class="material-symbols-outlined text-slate-600"
                            >unfold_more</span
                        >
                    </div>
                </button>
                <div class="h-px bg-white/5 mx-5"></div>
                <!-- Budget Cycles -->
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >calendar_month</span
                            >
                        </div>
                        <span class="font-bold text-slate-200"
                            >Budget Cycles</span
                        >
                    </div>
                    <span class="material-symbols-outlined text-slate-600"
                        >chevron_right</span
                    >
                </button>
            </div>
        </section>

        <!-- Category: App Preferences -->
        <section class="mb-10">
            <h3
                class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-5 ml-2"
            >
                App Preferences
            </h3>
            <div
                class="bg-surface-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
                <!-- Theme Selection -->
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >palette</span
                            >
                        </div>
                        <span class="font-bold text-slate-200">App Theme</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span
                            class="text-[10px] font-black gold-text-gradient uppercase tracking-widest"
                            >Premium Gold</span
                        >
                        <span class="material-symbols-outlined text-slate-600"
                            >chevron_right</span
                        >
                    </div>
                </button>
                <div class="h-px bg-white/5 mx-5"></div>
                <!-- Notifications -->
                <div class="flex items-center justify-between p-5">
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >notifications</span
                            >
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-200"
                                >Push Notifications</span
                            >
                            <span
                                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                                >Daily summaries & alerts</span
                            >
                        </div>
                    </div>
                    <button
                        class="w-12 h-6 rounded-full p-0.5 relative transition-all {pushNotifications
                            ? 'gold-gradient'
                            : 'bg-slate-800'}"
                        on:click={() =>
                            (pushNotifications = !pushNotifications)}
                    >
                        <div
                            class="size-5 rounded-full bg-white shadow-sm transition-all {pushNotifications
                                ? 'ml-auto'
                                : 'ml-0'}"
                        ></div>
                    </button>
                </div>
            </div>
        </section>

        <!-- Category: Support -->
        <section class="mb-12">
            <h3
                class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-5 ml-2"
            >
                Support
            </h3>
            <div
                class="bg-surface-dark rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >help</span
                            >
                        </div>
                        <span class="font-bold text-slate-200"
                            >FAQ & Help Center</span
                        >
                    </div>
                    <span class="material-symbols-outlined text-slate-600"
                        >open_in_new</span
                    >
                </button>
                <div class="h-px bg-white/5 mx-5"></div>
                <button
                    class="w-full flex items-center justify-between p-5 hover:bg-red-500/10 transition-colors group"
                    on:click={() => dispatch("logout")}
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="size-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >logout</span
                            >
                        </div>
                        <span
                            class="font-black text-red-500 uppercase tracking-widest text-sm"
                            >Logout</span
                        >
                    </div>
                </button>
            </div>
        </section>
    </div>
</main>

<style>
    .gold-gradient {
        background: linear-gradient(
            135deg,
            #d4af37 0%,
            #f4e0a1 50%,
            #996515 100%
        );
    }
    .gold-text-gradient {
        background: linear-gradient(135deg, #d4af37 0%, #f4e0a1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
</style>
