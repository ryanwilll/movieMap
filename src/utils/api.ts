import axios from 'axios'

const TMDB_URL_BASE = import.meta.env.VITE_URL_MOVIE
const TMDB_TOKEN = import.meta.env.VITE_TOKEN

const headers = {
  Authorization: 'bearer ' + TMDB_TOKEN,
}

export const fetchDataFromAPI = async (url: string, params?: string) => {
  console.log(TMDB_URL_BASE + url)

  try {
    const { data } = await axios.get(TMDB_URL_BASE + url, {
      headers,
      params,
    })
    return data
  } catch (err) {
    console.error(err)
    return err
  }
}
