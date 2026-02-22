<script>
    export let activeTab = "home";
</script>

<!-- Solid Navigation Bar (Docked) -->
<footer class="bottom-nav-container z-[100]">
    <nav class="w-full max-w-md px-4">
        <div class="flex items-center justify-between">
            <button
                class="flex flex-col items-center gap-1 p-2 transition-colors {activeTab ===
                'home'
                    ? 'text-primary'
                    : 'text-slate-500'}"
                on:click={() => (activeTab = "home")}
            >
                <span
                    class="material-symbols-outlined {activeTab === 'home'
                        ? 'fill-1'
                        : ''} text-2xl">home</span
                >
                <span class="text-[9px] font-bold uppercase tracking-widest"
                    >Home</span
                >
            </button>

            <button
                class="flex flex-col items-center gap-1 p-2 transition-colors {activeTab ===
                'bills'
                    ? 'text-primary'
                    : 'text-slate-500'}"
                on:click={() => (activeTab = "bills")}
            >
                <span
                    class="material-symbols-outlined {activeTab === 'bills'
                        ? 'fill-1'
                        : ''} text-2xl">receipt_long</span
                >
                <span class="text-[9px] font-bold uppercase tracking-widest"
                    >Bills</span
                >
            </button>
            <button
                class="flex flex-col items-center gap-1 p-2 transition-colors {activeTab ===
                'categories'
                    ? 'text-primary'
                    : 'text-slate-500'}"
                on:click={() => (activeTab = "categories")}
            >
                <span
                    class="material-symbols-outlined {activeTab === 'categories'
                        ? 'fill-1'
                        : ''} text-2xl">grid_view</span
                >
                <span class="text-[9px] font-bold uppercase tracking-widest"
                    >Categories</span
                >
            </button>

            <button
                class="flex flex-col items-center gap-1 p-2 transition-colors {activeTab ===
                'loans'
                    ? 'text-primary'
                    : 'text-slate-500'}"
                on:click={() => (activeTab = "loans")}
            >
                <span
                    class="material-symbols-outlined {activeTab === 'loans'
                        ? 'fill-1'
                        : ''} text-2xl">payments</span
                >
                <span class="text-[9px] font-bold uppercase tracking-widest"
                    >Loans</span
                >
            </button>

            <button
                class="flex flex-col items-center gap-1 p-2 transition-colors {activeTab ===
                'insights'
                    ? 'text-primary'
                    : 'text-slate-500'}"
                on:click={() => (activeTab = "insights")}
            >
                <span
                    class="material-symbols-outlined {activeTab === 'insights'
                        ? 'fill-1'
                        : ''} text-2xl">monitoring</span
                >
                <span class="text-[9px] font-bold uppercase tracking-widest"
                    >Insights</span
                >
            </button>

            <button
                class="flex flex-col items-center gap-1 p-2 transition-colors {activeTab ===
                'profile'
                    ? 'text-primary'
                    : 'text-slate-500'}"
                on:click={() => (activeTab = "profile")}
            >
                <span
                    class="material-symbols-outlined {activeTab === 'profile'
                        ? 'fill-1'
                        : ''} text-2xl">person</span
                >
                <span class="text-[9px] font-bold uppercase tracking-widest"
                    >Profile</span
                >
            </button>
        </div>
    </nav>
</footer>
