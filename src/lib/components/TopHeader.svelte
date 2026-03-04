<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let title = "";
    export let showBack = true;
    export let rightIcon = ""; // e.g., "share", "more_vert", "notifications"
    export let rightAction = null;
    export let disabled = false;
    export let loading = false;

    function goBack() {
        if (showBack) {
            dispatch("back");
        }
    }

    function handleRightClick() {
        if (disabled || loading) return;
        if (rightAction) {
            rightAction();
        } else {
            dispatch("rightAction");
        }
    }
</script>

<header
    class="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-6 bg-background-dark/80 backdrop-blur-xl border-b border-primary/5"
>
    <!-- Left Action -->
    <div class="flex-1 flex items-center">
        {#if showBack}
            <button
                on:click={goBack}
                class="size-10 flex items-center justify-center rounded-full bg-slate-900/50 border border-slate-800 hover:border-primary/40 hover:bg-primary/10 transition-all group"
            >
                <span
                    class="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary transition-colors"
                    >arrow_back</span
                >
            </button>
        {:else}
            <div class="size-10"></div>
        {/if}
    </div>

    <!-- Center Title -->
    <div class="flex-[2] flex justify-center overflow-hidden">
        <h1
            class="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] gold-text truncate px-2"
        >
            {title}
        </h1>
    </div>

    <!-- Right Action -->
    <div class="flex-1 flex items-center justify-end">
        {#if rightIcon}
            <button
                on:click={handleRightClick}
                disabled={disabled || loading}
                class="size-10 flex items-center justify-center rounded-full border transition-all group relative overflow-hidden
                {disabled || loading
                    ? 'border-slate-800 bg-slate-900/20 opacity-40 cursor-not-allowed'
                    : 'bg-slate-900/50 border-slate-800 hover:border-primary/40 hover:bg-primary/10'}"
            >
                {#if loading}
                    <div
                        class="size-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
                    ></div>
                {:else}
                    <span
                        class="material-symbols-outlined text-xl {disabled
                            ? 'text-slate-600'
                            : 'text-slate-400 group-hover:text-primary'} transition-colors"
                        >{rightIcon}</span
                    >
                {/if}
            </button>
        {:else}
            <div class="size-10"></div>
        {/if}
    </div>
</header>

<style>
    .gold-text {
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
