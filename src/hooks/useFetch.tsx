import { useState, useEffect } from 'react'

import { fetchDataFromAPI } from '../utils/api'
import { IMoviesResults } from '../types/IMoviesDetails'

const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<IMoviesResults>()

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
