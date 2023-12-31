import { Link } from 'react-router-dom'
import styles from './SimpleCard.module.css'
import noPosts from '../../assets/no-poster.webp'

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
      <img src={poster ? `${URL_IMAGE}${poster}` : noPosts} alt={`Imagem ilustrativa do filme ${title}`} />
    </Link>
  )
}

export default SimpleCard
