// API Configuration
const envUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('🔧 Environment NEXT_PUBLIC_API_URL:', envUrl);

// Force localhost for development
export const API_BASE_URL = "http://localhost:8000";

console.log('🔧 Using API_BASE_URL:', API_BASE_URL);
