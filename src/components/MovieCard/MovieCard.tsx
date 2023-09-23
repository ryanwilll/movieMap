import { useNavigate } from 'react-router-dom'

import { LuCalendarDays } from 'react-icons/lu'
import { MdHighQuality } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'
import styles from './MovieCard.module.css'

import noPosts from '../../assets/no-poster.png'

type Props = {
  id: number
  title: string
  poster: string
  date: string
  duration: number
  averange: number
  loading: boolean
  type: string
}

const URL_IMAGE = import.meta.env.VITE_IMG

const MovieCard = ({ id, title, poster, date, averange, type }: Props) => {
  const navigate = useNavigate()

  const formatedDate = (data: string) => {
    const date = new Date(data)
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return formattedDate
  }

  const goToDetailsPage = () => {
    navigate(type == 'movie' ? `/movie/details/${id}` : `/serie/details/${id}`)
  }

  return (
    <>
      <div onClick={() => goToDetailsPage()} className={styles.container}>
        <img src={poster ? `${URL_IMAGE}${poster}` : noPosts} alt={`Imagem ilustrativa do filme ${title}`} />
        <div className={styles.wrapper}>
          <p className={styles.title}>{title}</p>
          <p>
            <LuCalendarDays />
            {formatedDate(date)}
          </p>
        </div>
        <div className={styles.wrapper}>
          <p>
            <MdHighQuality /> <span>HD</span>
          </p>

          <p className={styles.star}>
            <AiFillStar />
            <span>{averange.toFixed(1)}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
