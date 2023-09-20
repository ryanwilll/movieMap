import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'

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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { id, type } = useParams()
  const navigate = useNavigate()
  const { data, error } = useFetch(`/${type == 'movie' ? 'movie' : 'tv'}/${id}?language=pt-BR`)

  console.log(data)

  const formatedDate = (data: string) => {
    const date = new Date(data)
    const formattedDate = date.toLocaleDateString('pt-BR', {
      year: 'numeric',
    })

    return formattedDate
  }

  return (
    <>
      {data && (
        <div
          style={
            data && {
              background: `url(${URL_IMAGE}${data?.backdrop_path}) no-repeat`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          }>
          <div className={styles.overlay}>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <div>
                  <button onClick={() => navigate(-1)} className={styles.return}>
                    <BsArrowLeft />
                    <span className={styles.return_text}>Voltar</span>
                  </button>
                  <img src={`${URL_IMAGE}${data?.poster_path}`} className={styles.poster_path} alt="" />
                </div>
                <div>
                  <p className={styles.wrapper_disponivel}>Disponível nos streamings</p>
                  <h3 className={styles.wrapper_movieName}>{data?.title || data?.name},</h3>
                  <div className={styles.wrapper_container}>
                    <p className={styles.wrapper_type}>{type === 'movie' ? 'Filme' : 'Série'}</p>
                    <p className={styles.wrapper_icons}>
                      <MdOutlineHighQuality />
                    </p>
                    <p>{data?.genres.map((gen) => gen.name).join(', ')}</p>
                    {data.runtime && (
                      <p className={styles.wrapper_icons}>
                        <PiTimer />
                        <span>{data.runtime} min</span>
                      </p>
                    )}
                    {data.number_of_episodes && (
                      <>
                        <p className={styles.wrapper_icons}>
                          <CiYoutube />
                          <span>{data.number_of_seasons} temporadas</span>
                        </p>
                        <p className={styles.wrapper_icons}>
                          <BsPlayCircle />
                          <span>{data.number_of_episodes} episódios</span>
                        </p>
                      </>
                    )}
                    <p className={styles.wrapper_icons}>
                      <LuCalendarDays />
                      {data.release_date && <span>{formatedDate(data.release_date)}</span>}
                      {data.first_air_date && <span>{formatedDate(data.first_air_date)}</span>}
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
                      <AiFillStar /> <span>{data.vote_average.toFixed(1)}</span>
                    </p>
                    <button onClick={() => setIsOpen(true)} className={styles.wrapper_watch}>
                      <BsFillPlayFill /> <span>Assistir trailer</span>
                    </button>
                  </div>
                  <div>
                    <p className={styles.overview}>{data.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} item_id={data.id} type={type} />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </>
  )
}

export default Movie
