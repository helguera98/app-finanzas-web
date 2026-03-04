<script>
    import { fade, fly } from "svelte/transition";
    import { toast } from "../stores/toastStore";
</script>

{#if $toast}
    <div
        class="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none"
        in:fly={{ y: -20, duration: 400 }}
        out:fade
    >
        <div
            class="bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto"
        >
            <div
                class="size-8 rounded-xl {$toast.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'} flex items-center justify-center"
            >
                <span class="material-symbols-outlined text-xl">
                    {$toast.type === "success" ? "check_circle" : "error"}
                </span>
            </div>
            <span
                class="text-xs font-black uppercase tracking-widest text-slate-100"
            >
                {$toast.message}
            </span>
        </div>
    </div>
{/if}
