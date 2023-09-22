import MovieCard from '../MovieCard'
import { IMoviesDetails } from '../../../types/IMoviesDetails'
import styles from './MoviesGrid.module.css'

type Props = {
  error: boolean
  selectedType?: string
  loading?: boolean
  topMovies: IMoviesDetails[]
}

function MoviesGrid({ error, selectedType, loading, topMovies }: Props) {
  return (
    <div className={styles.movies}>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        topMovies &&
        topMovies.map((movie: IMoviesDetails) => (
          <MovieCard
            type={selectedType ?? ''}
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name}
            poster={movie.poster_path}
            date={movie.release_date || movie.first_air_date}
            duration={movie.id}
            averange={movie.vote_average}
            loading={loading ?? false}
          />
        ))
      )}
    </div>
  )
}

export default MoviesGrid
