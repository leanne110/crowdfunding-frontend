async function deleteFundraisersById(id) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`;
  const token = window.localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = 'Error deleting fundraiser';

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return true;
}

export default deleteFundraisersById;
