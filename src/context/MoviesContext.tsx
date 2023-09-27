import { ReactNode, createContext, useState } from 'react'
import { IMediaCommon, IMovieDetails, IMoviesOrSeries, ISeriesDetails } from '../types/IMoviesDetails'

type ThemeContextProps = {
  children?: ReactNode
  lastType?: string
  topMovies?: IMovieDetails[] | ISeriesDetails[]
  remainingMovies?: IMovieDetails[] | ISeriesDetails[]
  addTopMovies?: any
  addRemainingMovies?: any
  addLastType?: any
  lastPage: number
  addLastPage?: any
}

const initialValue: ThemeContextProps = {
  topMovies: [],
  remainingMovies: [],
  lastType: 'movie',
  lastPage: 1,
}

export const MoviesContext = createContext<ThemeContextProps>(initialValue)

export const MoviesProvider = ({ children }: ThemeContextProps) => {
  const [topMovies, setTopMovies] = useState<any>()
  const [remainingMovies, setRemainingMovies] = useState<any>()
  const [lastType, setLastType] = useState<string>('movie')
  const [lastPage, setLastPage] = useState<number>(1)

  const addTopMovies = (movies: any) => {
    setTopMovies(() => movies)
  }

  const addRemainingMovies = (movies: any) => {
    setRemainingMovies(movies)
  }

  const addLastType = (type: string) => {
    setLastType(type)
  }

  const addLastPage = (page: number) => {
    setLastPage(page)
  }

  return (
    <MoviesContext.Provider
      value={{ topMovies, remainingMovies, lastType, lastPage, addLastType, addTopMovies, addRemainingMovies, addLastPage }}>
      {children}
    </MoviesContext.Provider>
  )
}
