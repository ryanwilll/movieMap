import { Link } from 'react-router-dom'
import CircularProgress from '@mui/joy/CircularProgress'

type Props = {
  id: number
  isAdult: boolean
  type: string
  bannerUrl: string
  name: string
  vote_average: number
  release_date: string
}

const Card = ({ id, isAdult, type, bannerUrl, name, vote_average, release_date }: Props) => {
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

  const formaterDate = (arg: string) => {
    const date = new Date(arg)
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
    }).format(date)
  }

  return (
    <Link to={`${type}/details/${id}`} className="card__container">
      <div className="group__image">
        <img className="card__container__image" src={`https://image.tmdb.org/t/p/w500/${bannerUrl}`} alt={`Poster ${name}`} />
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
      <h3 className="card__container__name">{name}</h3>
      <p className="card__container__date">{formaterDate(release_date)}</p>
    </Link>
  )
}

export default Card
