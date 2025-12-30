export const spotifyFetch = async <T>(
  url: string,
  accessToken: string,
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  if (!response.ok) {
    const error = `Spotify API error: ${response.status} ${response.statusText}`;
    console.error(error);
    throw new Error(error);
  }
  return response.json();
};
