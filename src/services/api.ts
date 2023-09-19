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
const VITE_URL_SERIE_MOVIE = import.meta.env.VITE_URL_SERIE_MOVIE

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
  const [remainingResponse, setRemainingResponse] = useState<IMovies[]>([])
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
        case 'get_serie_video':
          getSerieVideo(item_id)
          break
        default:
          break
      }
    }
  }, [])

  const fetchMovies = useMemo(() => {
    return (page: number) => {
      setLoading(true)
      axios
        .get(`${VITE_URL_UPCOMING}${VITE_API_KEY}&page=${page}&language=pt-BR`)
        .then((res) => {
          const results = res.data.results.slice(0, 6)
          const remaining = res.data.results.slice(6, -2)
          setResponse(results)
          setRemainingResponse(remaining)
        })
        .catch((err) => {
          setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
          console.error(err)
          setResponse([])
          setRemainingResponse([])
        })
        .finally(() => setLoading(false))
      return
    }
  }, [])

  const fetchSeries = useMemo(() => {
    return (page: number) => {
      setLoading(true)
      axios
        .get(`${VITE_URL_SERIE}${VITE_API_KEY}&language=pt-BR&page=${page}`)
        .then((res) => {
          const results = res.data.results.slice(0, 6)
          const remaining = res.data.results.slice(6, -2)
          setResponse(results)
          setRemainingResponse(remaining)
        })
        .catch((err) => {
          setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
          console.error(err)
          setResponse([])
          setRemainingResponse([])
        })
        .finally(() => setLoading(false))
      return
    }
  }, [])

  const getMovieDetails = useMemo(() => {
    return (movie_id: number) => {
      setLoading(true)
      axios
        .get(`${VITE_URL_MOVIE_DETAILS}${movie_id}?${VITE_API_KEY}&language=pt-BR`)
        .then((res) => {
          setDetailsMovie(res.data)
        })
        .catch((err) => {
          setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
          console.error(err)
          setDetailsMovie(undefined)
        })
        .finally(() => setLoading(false))
      return
    }
  }, [])

  const getSerieDetails = useMemo(() => {
    return (serie_id: number) => {
      setLoading(true)
      axios
        .get(`${VITE_URL_SERIE_DETAILS}${serie_id}?${VITE_API_KEY}&language=pt-BR`)
        .then((res) => {
          setDetailsSerie(res.data)
        })
        .catch((err) => {
          setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
          console.error(err)
          setDetailsSerie(undefined)
        })
        .finally(() => setLoading(false))
      return
    }
  }, [])

  const getMovieVideo = useMemo(() => {
    return (movie_id: number) => {
      setLoading(true)
      axios
        .get(`${VITE_URL_MOVIE}${movie_id}/videos?${VITE_API_KEY}&include_video_language=pt-BR%2C%20en-US`)
        .then((res) => {
          const videosByLanguage: any = {}

          for (const video of res.data.results) {
            const language = video.iso_639_1
            if (!videosByLanguage[language]) {
              videosByLanguage[language] = []
            }
            videosByLanguage[language].push(video)
          }

          const videosPtBr = videosByLanguage['pt']
          const videosEnUs = videosByLanguage['en']

          if (videosPtBr) {
            setVideoInfo(videosPtBr)
          } else {
            setVideoInfo(videosEnUs)
          }
        })
        .catch((err) => {
          setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
          console.error(err)
          setVideoInfo(undefined)
        })
        .finally(() => setLoading(false))

      return
    }
  }, [])

  const getSerieVideo = useMemo(() => {
    return (serie_id: number) => {
      setLoading(true)
      axios
        .get(`${VITE_URL_SERIE_MOVIE}${serie_id}/videos?${VITE_API_KEY}&include_video_language=pt-BR%2C%20en-US`)
        .then((res) => {
          const videosByLanguage: any = {}

          for (const video of res.data.results) {
            const language = video.iso_639_1
            if (!videosByLanguage[language]) {
              videosByLanguage[language] = []
            }
            videosByLanguage[language].push(video)
          }

          const videosPtBr = videosByLanguage['pt']
          const videosEnUs = videosByLanguage['en']

          if (videosPtBr) {
            setVideoInfo(videosPtBr)
            return
          } else {
            setVideoInfo(videosEnUs)
          }
        })
        .catch((err) => {
          setError('😣 Houve um erro ao buscar as séries. Por favor, tente novamente mais tarde.')
          console.error(err)
          setVideoInfo(undefined)
        })
        .finally(() => setLoading(false))

      return
    }
  }, [])

  return { response, remainingResponse, detailsMovie, videoInfo, detailsSerie, error, loading, getMoviesOrSeries }
}

export { getDatas }
