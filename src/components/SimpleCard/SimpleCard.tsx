import { Link } from 'react-router-dom'
import styles from './SimpleCard.module.css'

type Props = {
  id: number
  title: string
  poster: string
  type: string
}

const URL_IMAGE = import.meta.env.VITE_IMG

const SimpleCard = ({ id, title, poster, type }: Props) => {
  return (
    <Link to={type == 'movie' ? `movie/details/${id}` : `serie/details/${id}`} className={styles.container}>
      <img src={`${URL_IMAGE}${poster}`} alt={`Imagem ilustrativa do filme ${title}`} />
    </Link>
  )
}

export default SimpleCard
