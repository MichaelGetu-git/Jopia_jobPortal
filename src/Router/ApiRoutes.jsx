const BASE_URL = "http://localhost:3000";

async function request(endpoint, { method = "GET", body, token} = {}) {
    const tokenToUse = localStorage.getItem("token");
    const isFormData = body instanceof FormData;
    const headers = {
        ...(!isFormData ? { "Content-Type": "application/json"} : {}),
        ...(tokenToUse ? { Authorization: `Bearer ${tokenToUse}`} : {})
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message);
    }

    return res.json();
}

export const getAllJobs = (token) => request("/jobs", { token });
export const getProfile = (userId, token ) => request(`/profile/${userId}`, {method: "GET", token });
export const createProfile = (userId, data, token) => request(`/profile/me`, {method: "POST", body: data, token});