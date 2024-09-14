const url = 'auth-server-1cpuj2xfb-vivekanandas-projects-8d25ae23.vercel.app';
// for local server you can use url as 'http://localhost:3003';
// for production server you can use url as 'your hosted url';

export const signup = async ({ name, email, password }) => {
  const response = await fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to signup');
  }
  return data;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to login');
  }
  return data;
};
