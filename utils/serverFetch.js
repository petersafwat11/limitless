// Utility function for server-side fetch with cookie forwarding
import { cookies } from 'next/headers';

export async function serverFetch(url, options = {}) {
  const cookieStore = await cookies();
  
  // Get all cookies as a string
  const cookieHeader = cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  // Merge headers, ensuring cookies are forwarded
  const headers = {
    ...options.headers,
    'Cookie': cookieHeader,
  };

  // Remove Authorization header if it exists (we use cookies now)
  delete headers['Authorization'];

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}
