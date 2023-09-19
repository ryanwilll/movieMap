import { ReactNode, createContext, useState } from 'react'
import { IMovies } from '../types/IMovies'

type ThemeContextProps = {
  children?: ReactNode
  topMovies?: IMovies[]
  remainingMovies?: IMovies[]
  addTopMovies?: any
  addRemainingMovies?: any
}

const initialValue: ThemeContextProps = {
  topMovies: [],
  remainingMovies: [],
}

export const MoviesContext = createContext<ThemeContextProps>(initialValue)

export const MoviesProvider = ({ children }: ThemeContextProps) => {
  const [topMovies, setTopMovies] = useState<any>()
  const [remainingMovies, setRemainingMovies] = useState<any>()

  const addTopMovies = (movies: any) => {
    setTopMovies(() => movies)
  }

  const addRemainingMovies = (movies: any) => {
    setRemainingMovies(movies)
  }

  return (
    <MoviesContext.Provider value={{ topMovies, remainingMovies, addTopMovies, addRemainingMovies }}>
      {children}
    </MoviesContext.Provider>
  )
}
