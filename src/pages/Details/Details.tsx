//* Hooks
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { Tooltip } from 'react-tooltip'

//* Componentes
import { Modal } from '../../components/Modal/Modal'
import { IMediaCommon, IMovieDetails, ISeriesDetails } from '../../types/IMoviesDetails'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'

//* Estilização
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

const URL_IMAGE = import.meta.env.VITE_IMG_DETAILS

const Movie = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { id, type } = useParams()

  const { data, error } = useFetch(`/${type == 'movie' ? 'movie' : 'tv'}/${id}?language=pt-BR`)
  const { data: dataSimilar, error: errorSimilar } = useFetch(`/${type == 'movie' ? 'movie' : 'tv'}/${id}/similar?language=pt-BR`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const formatedDate = (data: string) => {
    const date = new Date(data)
    const formattedDate = date.toLocaleDateString('pt-BR', {
      year: 'numeric',
    })
    return formattedDate
  }

  const copyLink = () => {
    return navigator.clipboard.writeText(window.location.href)
  }

  return (
    <>
      {data && (
        <>
          <div
            style={
              data && {
                background: `url(${URL_IMAGE}${data?.backdrop_path}) no-repeat`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
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
                      <p>{data?.genres.map((gen: any) => gen.name).join(', ')}</p>
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
                        <span>{data.release_date ? formatedDate(data.release_date) : formatedDate(data.first_air_date)}</span>
                      </p>
                    </div>
                    <div className={styles.wrapper_options}>
                      <Tooltip id="copy" className={styles.wrapper_options_tooltip} />
                      <p
                        data-tooltip-id="copy"
                        data-tooltip-content="Copiar URL!"
                        data-tooltip-place="top"
                        className={styles.wrapper_share}
                        onClick={() => copyLink()}>
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
                      <p className={styles.overview}>
                        {data.overview.length <= 0
                          ? 'Ops! Ainda não temos informações sobre este filme. Por favor aguarde até que tenhamos tal overview.'
                          : data.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.similar_movies}>
            <p className={styles.wrapper_disponivel}>Mais {type == 'movie' ? 'Filmes' : 'Séries'} similares</p>
            {dataSimilar?.results[0] && type ? (
              <>
                <div className={styles.movies}>
                  {dataSimilar.results.map((movie: IMediaCommon) => (
                    <MovieCard
                      loading={false}
                      type={type}
                      key={movie.id}
                      id={movie.id}
                      title={(movie as IMovieDetails).title || (movie as ISeriesDetails).name}
                      poster={movie.poster_path}
                      date={(movie as IMovieDetails).release_date || (movie as ISeriesDetails).first_air_date}
                      averange={movie.vote_average}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="error">
                Ocorreu um erro ao tentar carregar os itens similares. Por favor, tente novamente mais tarde. {errorSimilar}
              </p>
            )}
          </div>
          <Footer />
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} item_id={data.id} type={type} />
        </>
      )}
      {error && <p className="{styles.error}">{error}</p>}
    </>
  )
}

export default Movie
