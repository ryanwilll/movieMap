import { useState, useEffect } from 'react'
import { fetchDataFromAPI } from '../utils/api'
import { IMoviesDetails } from '../types/IMoviesDetails'

const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<IMoviesDetails>()

  useEffect(() => {
    setLoading(true)
    fetchDataFromAPI(url)
      .then((res) => {
        setData(res)
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
