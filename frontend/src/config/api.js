/**
 * Centralized API configuration
 * All API calls should use this BASE_URL
 */

// Get env var and clean it up
let baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').trim();

// Remove trailing slashes
while (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
}

// Remove /api suffix if present (we add it ourselves)
if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
}

// Final API base URL - always ends with /api
export const API_BASE_URL = `${baseUrl}/api`;

// Log for debugging (remove in production if too noisy)
if (typeof window !== 'undefined') {
    console.log('[Config] API_BASE_URL:', API_BASE_URL);
}
