export interface IMoviesResults {
  results: IMoviesDetails[]
}

export interface ISeriesDetails {}

export interface IMoviesDetails {
  belongs_to_collection: [
    {
      backdrop_path: string
      id: number
      name: string
      poster_path: string
    }
  ]
  media_type: string
  budget: number
  genres: [
    {
      id: number
      name: string
    }
  ]
  homepage: string
  id: number
  imdb_id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: [
    {
      id: number
      logo_path: string
      name: string
      origin_county: string
    }
  ]
  production_countries: [
    {
      name: string
    }
  ]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: [
    {
      english_name: string
      iso_639_1: string
      name: string
    }
  ]
  status: string
  tagline: string
  title: string
  name: string
  video: boolean
  vote_average: number
  vote_count: number
  number_of_episodes: number
  number_of_seasons: number
  first_air_date: string
}

export interface IMoviesOrSeries {
  adult: boolean
  backdrop_path: string
}
