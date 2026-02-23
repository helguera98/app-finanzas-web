const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token');
    const url = `${BASE_URL}${endpoint}`;

    console.log(`[API] Fetching ${url} ...`);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });

        console.log(`[API] Response from ${endpoint}: ${response.status}`);

        if (response.status === 401) {
            localStorage.removeItem('auth_token');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[API] Error for ${url}:`, error);
        throw error;
    }
}

export const api = {
    login: async (email, password) => {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        const response = await fetch(`${BASE_URL}/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('auth_token', data.access_token);
        return data;
    },

    register: async (userData) => {
        return apiFetch('/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    getMe: () => apiFetch('/users/me'),

    getBills: () => apiFetch('/bills/'),
    createBill: (billData) => apiFetch('/bills/', {
        method: 'POST',
        body: JSON.stringify(billData),
    }),
    deleteBill: (id) => apiFetch(`/bills/${id}`, { method: 'DELETE' }),
    markBillPaid: (id) => apiFetch(`/bills/${id}/pay`, { method: 'POST' }),

    getLoans: () => apiFetch('/loans/'),
    createLoan: (loanData) => apiFetch('/loans/', {
        method: 'POST',
        body: JSON.stringify(loanData),
    }),
    deleteLoan: (id) => apiFetch(`/loans/${id}`, { method: 'DELETE' }),
    applyExtraPayment: (loanId, amount) => apiFetch(`/loans/${loanId}/extra-payment`, {
        method: 'POST',
        body: JSON.stringify({ amount }),
    }),

    getCategories: () => apiFetch('/categories/'),
    createCategory: (categoryData) => apiFetch('/categories/', {
        method: 'POST',
        body: JSON.stringify(categoryData),
    }),
    deleteCategory: (id) => apiFetch(`/categories/${id}`, { method: 'DELETE' }),

    getTransactions: () => apiFetch('/transactions/'),
    createTransaction: (transactionData) => apiFetch('/transactions/', {
        method: 'POST',
        body: JSON.stringify(transactionData),
    }),

    logout: () => {
        localStorage.removeItem('auth_token');
    },
    getSummary: () => apiFetch('/analytics/summary'),
    getMonthlyTrend: () => apiFetch('/analytics/monthly-trend'),
};
