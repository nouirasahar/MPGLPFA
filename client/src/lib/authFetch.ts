export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token')

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}