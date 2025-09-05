const BASE_URL = "http://localhost:3000";

async function request(endpoint, { method = "GET", body, token} = {}) {
    const tokenToUse = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(tokenToUse ? { Authorization: `Bearer ${tokenToUse}`} : {})
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "API request failed");
    }

    return res.json();
}

export const getAllJobs = (token) => request("/jobs", { token });
export const getProfile = (userId, token ) => request(`/profile/${userId}`, {method: "GET", token });
export const createProfile = (userId, data, token) => request(`/profile/${userId}`, {method: "POST", body: data, token});