const API_BASE_URL = "http://localhost:4000/api/admin";
// const API_BASE_URL = "https://smartrainmakers.com/api/admin";

export const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    DASHBOARD: `${API_BASE_URL}/dashboard`,
    WALLET: `${API_BASE_URL}/wallets`,
    ALL_USERS: `${API_BASE_URL}/all-users`,
    FETCH_ALL_TICKETS: `${API_BASE_URL}/all-tickets`,
    UPDATE_TICKET: `${API_BASE_URL}/update-ticket`,
    USER_TEAMS: `${API_BASE_URL}/user-team`,
}