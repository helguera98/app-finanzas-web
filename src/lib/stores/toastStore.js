import { writable } from 'svelte/store';

export const toast = writable(null);

export function showToast(message, type = 'success', duration = 3000) {
    toast.set({ message, type, id: Date.now() });
    setTimeout(() => {
        toast.update(current => {
            if (current && current.message === message) return null;
            return current;
        });
    }, duration);
}
