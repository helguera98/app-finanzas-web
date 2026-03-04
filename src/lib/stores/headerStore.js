import { writable } from 'svelte/store';

export const headerStore = writable({
    title: 'MoneyOS',
    showBack: true,
    rightIcon: '',
    rightAction: null,
    rightDisabled: false,
    loading: false
});

/**
 * Reset header to default values or specific page config
 * @param {Object} config 
 */
export function setHeader(config) {
    headerStore.set({
        title: config.title || 'MoneyOS',
        showBack: config.showBack ?? true,
        rightIcon: config.rightIcon || '',
        rightAction: config.rightAction || null,
        rightDisabled: config.rightDisabled ?? false,
        loading: config.loading ?? false
    });
}

/**
 * Update specific header properties
 * @param {Object} props 
 */
export function updateHeader(props) {
    headerStore.update(state => ({ ...state, ...props }));
}
