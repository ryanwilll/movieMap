import { ReactNode, createContext, useState } from 'react'
import { IMoviesDetails } from '../types/IMoviesDetails'

type ThemeContextProps = {
  children?: ReactNode
  lastType: string
  topMovies?: IMoviesDetails[]
  remainingMovies?: IMoviesDetails[]
  addTopMovies?: any
  addRemainingMovies?: any
  addLastType?: any
}

const initialValue: ThemeContextProps = {
  topMovies: [],
  remainingMovies: [],
  lastType: 'movie',
}

export const MoviesContext = createContext<ThemeContextProps>(initialValue)

export const MoviesProvider = ({ children }: ThemeContextProps) => {
  const [topMovies, setTopMovies] = useState<any>()
  const [remainingMovies, setRemainingMovies] = useState<any>()
  const [lastType, setLastType] = useState<string>('movie')

  const addTopMovies = (movies: any) => {
    setTopMovies(() => movies)
  }

  const addRemainingMovies = (movies: any) => {
    setRemainingMovies(movies)
  }

  const addLastType = (type: string) => {
    setLastType(type)
  }

  return (
    <MoviesContext.Provider value={{ topMovies, remainingMovies, lastType, addLastType, addTopMovies, addRemainingMovies }}>
      {children}
    </MoviesContext.Provider>
  )
}
