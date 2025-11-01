// src/api/create-pledge.js
async function addPledge(pledgeData) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
    body: JSON.stringify(pledgeData),
  });

  if (!response.ok) {
    const fallbackError = 'Error creating pledge';
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    throw new Error(data?.detail ?? fallbackError);
  }

  return await response.json();
}

export default addPledge;
