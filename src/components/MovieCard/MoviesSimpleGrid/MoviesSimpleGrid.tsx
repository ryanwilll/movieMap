import { IMoviesDetails } from '../../../types/IMoviesDetails'
import styles from './MoviesSimpleGrid.module.css'
import SimpleCard from '../../SimpleCard/SimpleCard'

type Props = {
  error: boolean
  remainingMovies: IMoviesDetails[] | undefined
  selectedType: string
}

function MoviesSimpleGrid({ error, remainingMovies, selectedType }: Props) {
  return (
    <div className={styles.simpleMovie}>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        remainingMovies &&
        remainingMovies.map((movie) => (
          <SimpleCard type={selectedType} id={movie.id} title={movie.title} poster={movie.poster_path} />
        ))
      )}
    </div>
  )
}

export default MoviesSimpleGrid
