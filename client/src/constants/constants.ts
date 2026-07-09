export const LOCALSTORAGE_USERTOKEN_KEY = 'user_token';

// Base URL of the GraphQL/uploads server. Override with the API_URL env var.
export const API_URL = (import.meta.env as Record<string, string | undefined>).API_URL ?? 'http://localhost:3001';
