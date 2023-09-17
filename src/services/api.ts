import axios from 'axios'
import { useState, useMemo } from 'react'
import { IMovies } from '../types/IMovies'
import { IMoviesDetails } from '../types/IMoviesDetails'

const VITE_API_KEY = import.meta.env.VITE_API_KEY

const VITE_URL_MOVIE = import.meta.env.VITE_URL_MOVIE
const VITE_URL_MOVIE_DETAILS = import.meta.env.VITE_URL_MOVIE_DETAILS
const VITE_URL_UPCOMING = import.meta.env.VITE_URL_UPCOMING

const VITE_URL_SERIE = import.meta.env.VITE_URL_SERIE
const VITE_URL_SERIE_DETAILS = import.meta.env.VITE_URL_SERIE_DETAILS

const VITE_SEARCH = import.meta.env.VITE_SEARCH
const URL_EMCINEMAS = import.meta.env.VITE_NOW_PLAYING
const URL_IMG = import.meta.env.VITE_IMG

type videoInfo = {
  id: number
  name: string
  key: string
}

const getDatas = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<IMovies[]>([])
  const [remainingMovies, setRemainingMovies] = useState<IMovies[]>([])
  const [error, setError] = useState<string>('')

  const [detailsMovie, setDetailsMovie] = useState<IMoviesDetails>()
  const [detailsSerie, setDetailsSerie] = useState<IMoviesDetails>()

  const [videoInfo, setVideoInfo] = useState<[videoInfo]>()

  const getMoviesOrSeries = useMemo(() => {
    return (type: string, item_id: number, page: number = 1) => {
      setResponse([])
      setError('')
      setLoading(false)
      setVideoInfo(undefined)

      switch (type) {
        case 'get_movies':
          fetchMovies(page)
          break
        case 'get_series':
          fetchSeries(page)
          break
        case 'get_movie_details':
          getMovieDetails(item_id)
          break
        case 'get_serie_details':
          getSerieDetails(item_id)
          break
        case 'get_movie_video':
          getMovieVideo(item_id)
          break
        default:
          break
      }
    }
  }, [])

  const fetchMovies = (page: number) => {
    setLoading(true)
    axios
      .get(`${VITE_URL_UPCOMING}${VITE_API_KEY}&page=${page}&language=pt-BR`)
      .then((res) => {
        const results = res.data.results.slice(0, 6)
        const remaining = res.data.results.slice(6, -2)
        setResponse(results)
        setRemainingMovies(remaining)
      })
      .catch((err) => {
        setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
        console.error(err)
        setResponse([])
        setRemainingMovies([])
      })
      .finally(() => setLoading(false))
    return
  }

  const fetchSeries = (page: number) => {
    setLoading(true)
    axios
      .get(`${VITE_URL_SERIE}${VITE_API_KEY}&language=pt-BR&page=${page}`)
      .then((res) => {
        const results = res.data.results.slice(0, 6)
        const remaining = res.data.results.slice(6, -2)
        setResponse(results)
        setRemainingMovies(remaining)
      })
      .catch((err) => {
        setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
        console.error(err)
        setResponse([])
        setRemainingMovies([])
      })
      .finally(() => setLoading(false))
    return
  }

  const getMovieDetails = async (movie_id: number) => {
    setLoading(true)
    console.log(movie_id)
    axios
      .get(`${VITE_URL_MOVIE_DETAILS}${movie_id}?${VITE_API_KEY}&language=pt-BR`)
      .then((res) => {
        setDetailsMovie(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
        console.error(err)
        setDetailsMovie(undefined)
      })
      .finally(() => setLoading(false))
    return
  }

  const getSerieDetails = async (serie_id: number) => {
    setLoading(true)
    console.log(serie_id)
    axios
      .get(`${VITE_URL_SERIE_DETAILS}${serie_id}?${VITE_API_KEY}&language=pt-BR`)
      .then((res) => {
        setDetailsSerie(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
        console.error(err)
        setDetailsSerie(undefined)
      })
      .finally(() => setLoading(false))
    return
  }

  const getMovieVideo = async (movie_id: number) => {
    setLoading(true)
    axios
      .get(`${VITE_URL_MOVIE}${movie_id}/videos?${VITE_API_KEY}&language=pt-BR`)
      .then((res) => {
        setVideoInfo(res.data.results)
      })
      .catch((err) => {
        setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
        console.error(err)
        setVideoInfo(undefined)
      })
      .finally(() => setLoading(false))

    return
  }

  return { response, remainingMovies, detailsMovie, videoInfo, detailsSerie, error, loading, getMoviesOrSeries }
}

export { getDatas }
