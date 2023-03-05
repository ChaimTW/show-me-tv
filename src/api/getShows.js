const headers = {
  Accept: 'application/json',
};

export async function getShows(pageParam) {
  const endpoint = 'https://api.tvmaze.com/shows';
  const queryParams = new URLSearchParams({ page: pageParam });
  const apiUrl = `${endpoint}?${queryParams}`;

  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.statusText}`);
  }

  return await response.json();
}

export async function getShow(showId) {
  const endpoint = 'https://api.tvmaze.com/shows/';
  const apiUrl = `${endpoint}${showId}`;

  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch show: ${response.statusText}`);
  }

  return await response.json();
}

export async function searchShows(searchParam) {
  const endpoint = 'https://api.tvmaze.com/search/shows';
  const queryParams = new URLSearchParams({ q: searchParam });
  const apiUrl = `${endpoint}?${queryParams}`;

  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.statusText}`);
  }

  return await response.json();
}
