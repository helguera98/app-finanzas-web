import './app.css'
import App from './App.svelte'

const app = new App({
    target: document.getElementById('app'),
})

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('[PWA] Service Worker registered'))
            .catch(err => console.error('[PWA] Service Worker registration failed:', err));
    });
}

export default app
