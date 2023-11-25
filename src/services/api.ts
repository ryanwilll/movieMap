import axios from 'axios'

const TMDB_TOKEN = import.meta.env.VITE_TOKEN

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Authorization: Bearer ${TMDB_TOKEN}`,
  },
})

export const fetchData = async (url: string) => {
  const res = await api.get(url)
  return res.data.results
}

export const fetchDetails = async (url: string) => {
  const res = await api.get(url)
  return res.data
}
