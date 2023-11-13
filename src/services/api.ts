import axios from 'axios'

const TMDB_TOKEN = import.meta.env.VITE_TOKEN
console.log(TMDB_TOKEN)

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Authorization: Bearer ${TMDB_TOKEN}`,
  },
})
