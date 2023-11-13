import { Link } from 'react-router-dom'
import { IMovies } from '../../types/IMovies'
import CircularProgress from '@mui/joy/CircularProgress'

const Card = ({ id, adult, poster_path, title, vote_average, release_date }: IMovies) => {
  const setColorCircularProgress = (arg: number) => {
    if (arg < 4) {
      return 'danger'
    } else if (arg >= 5 && arg <= 7) {
      return 'primary'
    } else {
      return 'success'
    }
  }

  const returnAverageFormatted = (arg: number) => {
    return arg === 0 ? 'N/A' : arg.toFixed(1)
  }

  return (
    <Link to={`/details/${id}`} className="card__container">
      <div className="group__image">
        <img className="card__container__image" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`Poster ${title}`} />
        <CircularProgress
          className="percentage"
          color={setColorCircularProgress(vote_average)}
          size="md"
          variant="plain"
          determinate
          value={vote_average * 10}>
          <p>{returnAverageFormatted(vote_average)}</p>
        </CircularProgress>
      </div>
      <h3 className="card__container__title">{title}</h3>
      <p className="card__container__date">{release_date}</p>
    </Link>
  )
}

export default Card
