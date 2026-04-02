const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

export async function check_email(email) {
    const response = await fetch(`${API_BASE}/auth/check-email`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
    });
    return response;
};

export async function register(signal) {
    const response = await fetch(`${API_BASE}/regauth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
        });
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
};