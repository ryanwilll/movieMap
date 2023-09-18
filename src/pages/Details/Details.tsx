import { Link, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { getDatas } from '../../services/api'

import { BsArrowLeft } from 'react-icons/bs'
import { MdOutlineHighQuality } from 'react-icons/md'
import { PiTimer } from 'react-icons/pi'
import { LuCalendarDays } from 'react-icons/lu'
import { LuShare2 } from 'react-icons/lu'
import { AiFillStar } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { CiYoutube } from 'react-icons/ci'
import { BsPlayCircle } from 'react-icons/bs'

import styles from './Details.module.css'
import { Modal } from '../../components/Modal/Modal'

const URL_IMAGE = import.meta.env.VITE_IMG_DETAILS

const Movie = () => {
  const { id, type } = useParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { loading, getMoviesOrSeries, error, detailsMovie, detailsSerie } = getDatas()

  const details = type === 'movie' ? detailsMovie : detailsSerie

  useEffect(() => {
    if (type === 'movie') {
      getMoviesOrSeries('get_movie_details', Number(id))
    } else if (type === 'serie') {
      getMoviesOrSeries('get_serie_details', Number(id))
    }
  }, [])

  const formatedDate = (data: string) => {
    const date = new Date(data)
    const formattedDate = date.toLocaleDateString('pt-BR', {
      year: 'numeric',
    })

    return formattedDate
  }

  return (
    <>
      {details && (
        <div
          style={
            details && {
              background: `url(${URL_IMAGE}${details.backdrop_path}) no-repeat`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          }>
          <div className={styles.overlay}>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <div>
                  <Link to={`/`} className={styles.return}>
                    <BsArrowLeft />
                    <span className={styles.return_text}>Voltar</span>
                  </Link>
                  <img src={`${URL_IMAGE}${details?.poster_path}`} className={styles.poster_path} alt="" />
                </div>
                <div>
                  <p className={styles.wrapper_disponivel}>Disponível nos streamings</p>
                  <h3 className={styles.wrapper_movieName}>{details.title || details.name},</h3>
                  <div className={styles.wrapper_container}>
                    <p className={styles.wrapper_type}>{type === 'movie' ? 'Filme' : 'Série'}</p>
                    <p className={styles.wrapper_icons}>
                      <MdOutlineHighQuality />
                    </p>
                    <p>{details.genres.map((gen) => gen.name).join(', ')}</p>
                    {details.runtime && (
                      <p className={styles.wrapper_icons}>
                        <PiTimer />
                        <span>{details.runtime} min</span>
                      </p>
                    )}
                    {details.number_of_episodes && (
                      <>
                        <p className={styles.wrapper_icons}>
                          <CiYoutube />
                          <span>{details.number_of_seasons} temporadas</span>
                        </p>
                        <p className={styles.wrapper_icons}>
                          <BsPlayCircle />
                          <span>{details.number_of_episodes} episódios</span>
                        </p>
                      </>
                    )}
                    <p className={styles.wrapper_icons}>
                      <LuCalendarDays />
                      {details.release_date && <span>{formatedDate(details.release_date)}</span>}
                      {details.first_air_date && <span>{formatedDate(details.first_air_date)}</span>}
                    </p>
                  </div>
                  <div className={styles.wrapper_options}>
                    <p
                      className={styles.wrapper_share}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href)
                      }}>
                      <LuShare2 />
                    </p>
                    <p className={styles.wrapper_avarage}>
                      <AiFillStar /> <span>{details.vote_average.toFixed(1)}</span>
                    </p>
                    <button onClick={() => setIsOpen(true)} className={styles.wrapper_watch}>
                      <BsFillPlayFill /> <span>Assistir trailer</span>
                    </button>
                  </div>
                  <div>
                    <p className={styles.overview}>{details.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} item_id={details.id} type={type} />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </>
  )
}

export default Movie
