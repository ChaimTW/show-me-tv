const headers = {
  headers: {
    Accept: 'application/json',
  }
}

export async function getShows(pageParam) {
  const endpoint = 'https://api.tvmaze.com/shows'
  const query = '?page='
  const queryValue = pageParam
  const apiUrl = endpoint + query + queryValue

  const response = await fetch(apiUrl, headers)

  if(!response.ok) {
    throw new Error(response.message)
  }

  return await response.json()
}

export async function getShow(showId) {
  const endpoint = 'https://api.tvmaze.com/shows/'
  const apiUrl = endpoint + showId

  const response = await fetch(apiUrl, headers)

  if(!response.ok) {
    throw new Error(response.message)
  }

  return await response.json()
}

export async function searchShows(searchParam) {
  const endpoint = 'https://api.tvmaze.com/search/shows'
  const query = '?q='
  const queryValue = searchParam
  const apiUrl = endpoint + query + queryValue

  const response = await fetch(apiUrl, headers)

  if(!response.ok) {
    throw new Error(response.message)
  }

  return await response.json()
}