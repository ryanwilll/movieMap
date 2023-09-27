//* Interface para detalhes específicos de filmes
export interface IMediaCommon {
  id: number
  poster_path: string
  vote_average: number
  media_type: string
}

//* Adicione aqui os campos específicos de filmes, se houver
export interface IMovieDetails extends IMediaCommon {
  title: string
  release_date: string
}

//* Interface para detalhes específicos de séries
export interface ISeriesDetails extends IMediaCommon {
  name: string
  first_air_date: string
}

//* Interface que pode conter filmes ou séries
export interface IMoviesOrSeries {
  results: (IMovieDetails | ISeriesDetails)[]
}
