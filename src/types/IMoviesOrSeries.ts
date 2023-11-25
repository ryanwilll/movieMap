import { ICommum } from './ICommum'

export interface IMovies extends ICommum {
  title: string
  release_date: string
}

export interface ISeries extends IMovies {
  name: string
  first_air_date: string
}
