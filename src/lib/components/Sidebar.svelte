<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let activeTab = "home";

    const menuItems = [
        { id: "home", label: "Home", icon: "home" },
        { id: "bills", label: "Bills", icon: "receipt_long" },
        { id: "categories", label: "Categories", icon: "grid_view" },
        { id: "loans", label: "Loans", icon: "payments" },
        { id: "insights", label: "Insights", icon: "monitoring" },
        { id: "profile", label: "Profile", icon: "person" },
    ];

    function handleNavigate(tab) {
        activeTab = tab;
        dispatch("navigate", tab);
    }
</script>

<aside
    class="w-64 h-full bg-[#0d0d16] border-r border-white/5 flex flex-col flex-shrink-0 z-[100]"
>
    <!-- Logo / Brand -->
    <div class="h-20 flex items-center px-8">
        <h1
            class="text-2xl font-black italic gold-gradient-text tracking-tighter uppercase"
        >
            MoneyOS
        </h1>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto hide-scrollbar">
        {#each menuItems as item}
            <button
                class="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group {activeTab ===
                item.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-white/5'}"
                on:click={() => handleNavigate(item.id)}
            >
                <div
                    class="size-10 rounded-xl flex items-center justify-center transition-all {activeTab ===
                    item.id
                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-slate-900/50 text-slate-500 group-hover:text-slate-300'}"
                >
                    <span
                        class="material-symbols-outlined {activeTab === item.id
                            ? 'fill-1'
                            : ''} text-xl">{item.icon}</span
                    >
                </div>
                <span
                    class="text-sm font-bold tracking-wide {activeTab ===
                    item.id
                        ? 'text-primary'
                        : 'text-slate-500 group-hover:text-slate-300'}"
                >
                    {item.label}
                </span>
            </button>
        {/each}
    </nav>

    <!-- Bottom Footer (Optional) -->
    <div class="p-6 border-t border-white/5">
        <div class="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <p
                class="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1"
            >
                Status
            </p>
            <p class="text-xs font-bold text-slate-400">Production Mode</p>
        </div>
    </div>
</aside>

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
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
</style>
