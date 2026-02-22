<script>
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";
    const dispatch = createEventDispatcher();

    let categories = [
        {
            id: 1,
            name: "Compras Premium",
            sub: "Luxury Retail, Moda",
            icon: "shopping_bag",
        },
        {
            id: 2,
            name: "Alta Cocina",
            sub: "Restaurantes, Gourmet",
            icon: "restaurant",
        },
        {
            id: 3,
            name: "Viajes Exclusivos",
            sub: "Hoteles, Jet Privado",
            icon: "flight_takeoff",
        },
        {
            id: 4,
            name: "Inversiones",
            sub: "Activos, Oro, Joyas",
            icon: "diamond",
        },
    ];

    let newCategoryName = "";
    let selectedIcon = "star";
    let isSheetOpen = false;

    const availableIcons = [
        "star",
        "workspace_premium",
        "apartment",
        "directions_car",
        "fitness_center",
        "spa",
        "card_giftcard",
    ];

    function toggleSheet() {
        isSheetOpen = !isSheetOpen;
    }

    function handleCreate() {
        if (!newCategoryName.trim()) return;

        const newCat = {
            id: Date.now(),
            name: newCategoryName,
            sub: "Nueva Categoría",
            icon: selectedIcon,
        };

        categories = [...categories, newCat];
        newCategoryName = "";
        selectedIcon = "star";
        isSheetOpen = false;
    }

    function goBack() {
        dispatch("navigate", { tab: "home" });
    }
</script>

<main
    class="main-content flex flex-col relative overflow-hidden bg-background-dark"
>
    <!-- Header -->
    <header
        class="flex-none sticky top-0 z-20 backdrop-blur-md bg-background-dark/80 border-b border-primary/10 px-6 py-4 flex items-center justify-between"
    >
        <button
            on:click={goBack}
            class="flex items-center justify-center size-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
            <span class="material-symbols-outlined text-primary"
                >arrow_back</span
            >
        </button>
        <h1
            class="text-lg font-bold tracking-tight gold-gradient-text uppercase"
        >
            Gestionar Categorías
        </h1>
        <button
            class="flex items-center justify-center size-10 rounded-full bg-primary/10"
        >
            <span class="material-symbols-outlined text-primary">more_vert</span
            >
        </button>
    </header>

    <div
        class="flex-1 px-6 pt-6 pb-40 space-y-8 overflow-y-auto custom-scrollbar"
    >
        <!-- Existing Categories Section -->
        <section>
            <div class="flex items-center justify-between mb-4">
                <h2
                    class="text-sm font-semibold uppercase tracking-widest text-slate-500"
                >
                    Categorías Existentes
                </h2>
                <span class="text-xs text-gold font-medium"
                    >{categories.length} Total</span
                >
            </div>
            <div class="space-y-4">
                {#each categories as cat}
                    <div
                        class="flex items-center gap-4 p-4 rounded-2xl bg-surface-dark border border-white/5 hover:border-gold/30 transition-all group"
                    >
                        <div
                            class="size-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20 group-hover:scale-110 transition-transform"
                        >
                            <span class="material-symbols-outlined text-gold"
                                >{cat.icon}</span
                            >
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-slate-100">{cat.name}</p>
                            <p class="text-xs text-slate-500">{cat.sub}</p>
                        </div>
                        <button
                            class="text-slate-600 hover:text-gold transition-colors"
                        >
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                    </div>
                {/each}
            </div>
        </section>
    </div>

    <!-- FAB -->
    <button
        on:click={toggleSheet}
        class="fixed bottom-24 right-6 size-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 group"
    >
        <span
            class="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform"
            >add</span
        >
    </button>

    {#if isSheetOpen}
        <!-- Overlay -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            on:click={toggleSheet}
            transition:fade
        ></div>

        <!-- Bottom Action Sheet (New Category) -->
        <section
            class="fixed bottom-0 left-0 right-0 z-50 px-6 pb-32 pt-6 rounded-t-[2.5rem] bg-surface-dark border-t border-gold/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            transition:fly={{ y: 500, duration: 400 }}
        >
            <div class="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6"></div>
            <h3 class="text-xl font-bold mb-6 gold-gradient-text text-center">
                Crear Nueva Categoría
            </h3>

            <div class="space-y-6">
                <!-- Name Input -->
                <div class="relative">
                    <input
                        bind:value={newCategoryName}
                        class="w-full bg-background-dark border-0 border-b-2 border-primary/30 focus:border-gold focus:ring-0 text-slate-100 py-4 px-2 placeholder:text-slate-600 transition-all text-lg"
                        placeholder="Nombre de la categoría"
                        type="text"
                    />
                    <span
                        class="absolute right-2 top-4 material-symbols-outlined text-gold/50"
                        >label</span
                    >
                </div>

                <!-- Icon Selector -->
                <div>
                    <p
                        class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4"
                    >
                        Seleccionar Icono Dorado
                    </p>
                    <div class="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {#each availableIcons as icon}
                            <button
                                on:click={() => (selectedIcon = icon)}
                                class="shrink-0 size-14 rounded-2xl transition-all flex items-center justify-center
                                {selectedIcon === icon
                                    ? 'bg-primary border-2 border-gold shadow-[0_0_15px_rgba(19,19,236,0.4)]'
                                    : 'bg-background-dark border border-white/5 hover:border-gold/40'}"
                            >
                                <span
                                    class="material-symbols-outlined {selectedIcon ===
                                    icon
                                        ? 'text-gold-light'
                                        : 'text-gold/60'} text-2xl"
                                >
                                    {icon}
                                </span>
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Create Button -->
                <button
                    on:click={handleCreate}
                    class="w-full bg-primary hover:bg-primary/91 text-white font-bold py-5 rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group transition-all transform active:scale-[0.98]"
                >
                    <span>Guardar Categoría</span>
                    <span
                        class="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                        >check_circle</span
                    >
                </button>
            </div>
        </section>
    {/if}
</main>

<style>
    .gold-gradient-text {
        background: linear-gradient(to right, #d4af37, #f9e498, #d4af37);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #d4af37;
        border-radius: 10px;
    }

    .bg-surface-dark {
        background-color: #121212;
    }

    .text-gold {
        color: #d4af37;
    }

    .text-gold-light {
        color: #f9e498;
    }

    .border-gold {
        border-color: #d4af37;
    }

    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
