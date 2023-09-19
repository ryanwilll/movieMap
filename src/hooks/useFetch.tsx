import { useState, useEffect } from 'react'
import { fetchDataFromAPI } from '../utils/api'
import { IMoviesDetails } from '../types/IMoviesDetails'
import { IMovies } from '../types/IMovies'

const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<IMovies[] | IMoviesDetails[] | []>()

  useEffect(() => {
    setLoading(true)
    console.log('entrei')
    console.log(url)
    fetchDataFromAPI(url)
      .then((res) => {
        setData(res.results ? res.results : (res as IMoviesDetails[]))
      })
      .catch((err) => {
        setError(true)
        console.error('Ocorreu um erro ao chamar a API (useFetch): ' + err)
      })
      .finally(() => setLoading(false))
  }, [url])

  return { data, error, loading }
}

export default useFetch
