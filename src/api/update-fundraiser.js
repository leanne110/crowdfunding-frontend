async function updateFundraiser(fundraiserData, id) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'PUT', // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
    body: JSON.stringify(fundraiserData),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to create fundraiser`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default updateFundraiser;
