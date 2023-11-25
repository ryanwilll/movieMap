import { ICommum } from './ICommum'

export interface IMoviesDetails extends ICommum {
  title: string
  status: string
  release_date: string
  revenue: number
  budget: number
  runtime: number
  overview: string
  imdb_id: string
  production_companies: [id: number, logo_path: string, name: string, origin_country: string]
  genres: [
    {
      id: number
      name: string
    }
  ]
}

export interface ISeriesDetails extends ICommum {
  name: string
  overview: string
  status: string
  production_companies: [id: number, logo_path: string, name: string, origin_country: string]
  first_air_date: string
  last_air_date: string
  vote_average: number
  number_of_episodes: number
  number_of_seasons: number
  created_by: [
    {
      id: number
      credit_id: string
      name: string
      gender: number
      profile_path: string
    }
  ]
  genres: [
    {
      id: number
      name: string
    }
  ]
  seasons: [
    {
      air_date: string
      episode_count: number
      id: number
      name: string
      overview: string
      poster_path: string
      season_number: number
      vote_average: number
    }
  ]
}
