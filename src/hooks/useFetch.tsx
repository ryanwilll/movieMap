import { useState, useEffect } from 'react'

import { fetchDataFromAPI } from '../utils/api'
import { IMoviesDetails } from '../types/IMoviesDetails'
interface AuthorApiResponse {
  // Defina os campos esperados na resposta dos autores
  // com os tipos apropriados
  name: string
  id: number
  // Adicione outros campos conforme necessário
}

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
