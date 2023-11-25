//* Hooks
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

//* Tipagens e Services
import { fetchDetails } from '../../services/api'
import { IMoviesDetails, ISeriesDetails } from '../../types/IDetails'

//* Componentes
import Rating from '@mui/material/Rating'

//* Variáveis de ambiente
const IMAGE_URL = import.meta.env.VITE_IMG_DETAILS

//* Estilização
import { BsArrowLeft } from 'react-icons/bs'
import { LuCalendarDays } from 'react-icons/lu'
import { LuShare2 } from 'react-icons/lu'
import { AiFillStar } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { CiYoutube } from 'react-icons/ci'
import { BsPlayCircle } from 'react-icons/bs'
import { PiTimer } from 'react-icons/pi'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import HdIcon from '@mui/icons-material/Hd'
import StarIcon from '@mui/icons-material/Star'
import { useEffect, useState } from 'react'

const Details = () => {
  const [movieDetails, setMovieDetails] = useState<IMoviesDetails | null>(null)
  const [serieDetails, setSerieDetails] = useState<ISeriesDetails | null>(null)

  const { type, id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getmovieDetails = async () => {
      if (type === 'movie') {
        const res = await fetchDetails(`/movie/${id}?language=pt-BR`)
        return setMovieDetails(res)
      }
      const res = await fetchDetails(`/tv/${id}?language=pt-BR`)
      setSerieDetails(res)
    }

    getmovieDetails()
  }, [])

  const convertRating = (value: number) => {
    let dividerPer = 2
    return Number((value / dividerPer).toFixed(2))
  }

  const renderGeners = (genr: [{ id: number; name: string }]) => {
    let itens: string[] = []
    genr.map((gen) => itens.push(gen.name))
    return itens.join(', ')
  }

  const formatDate = (date: string) => {
    const d = new Date(date)

    return Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
    }).format(d)
  }

  return (
    <>
      <section
        className="details_section"
        style={{ backgroundImage: `url(${IMAGE_URL}/${movieDetails?.backdrop_path || serieDetails?.backdrop_path})` }}>
        <div className="details_container">
          <button onClick={() => navigate(-1)} className="btn_return">
            <BsArrowLeft /> Voltar
          </button>
          <div className="details_wrapper">
            <div className="poster_descriptions">
              <h3>{movieDetails?.title || serieDetails?.name}</h3>
              <div className="image_poster">
                <img
                  className="poster"
                  src={`${IMAGE_URL}/${movieDetails?.poster_path || serieDetails?.poster_path}`}
                  alt={`${movieDetails?.title}`}
                />
              </div>
              {movieDetails && (
                <Rating
                  name="poster_rating"
                  value={convertRating(movieDetails?.vote_average)}
                  readOnly
                  size="large"
                  precision={0.1}
                  style={{ fontSize: '3rem' }}
                  emptyIcon={<StarIcon style={{ color: 'gray' }} fontSize="inherit" />}
                />
              )}
              {serieDetails && (
                <Rating
                  name="poster_rating"
                  value={convertRating(serieDetails?.vote_average)}
                  readOnly
                  size="large"
                  precision={0.1}
                  style={{ fontSize: '3rem' }}
                  emptyIcon={<StarIcon style={{ color: 'gray' }} fontSize="inherit" />}
                />
              )}
              {type === 'movie'
                ? !movieDetails?.vote_average && <p>Ainda não temos métricas para definir a avaliação deste filme.</p>
                : !serieDetails?.vote_average && <p>Ainda não temos métricas para definir a avaliação deste filme.</p>}
            </div>

            <div className="more_details">
              <div className="short_infos">
                <span className="type">{type === 'movie' ? 'Filme' : 'Série'}</span>
                <HdIcon />
                {movieDetails && <p>{renderGeners(movieDetails?.genres)}</p>}
                <p className="icon_and_text">
                  <PiTimer /> {movieDetails?.runtime} min.
                </p>
                <p className="icon_and_text">
                  <LuCalendarDays /> {movieDetails?.release_date && formatDate(movieDetails?.release_date)}
                  {serieDetails?.first_air_date && formatDate(serieDetails?.first_air_date)}
                </p>
              </div>

              <p className="overview">
                {movieDetails?.overview || serieDetails?.overview
                  ? movieDetails?.overview || serieDetails?.overview
                  : `Eita, ainda não temos um resumo sobre este ${
                      type === 'movie' ? 'Filme' : 'Série'
                    }. Que tal explorar mais outros filmes/séries enquanto providenciamos iso pra você?`}
              </p>
            </div>
            <div>
              <p>{movieDetails?.status || serieDetails?.status}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3>Teste</h3>
      </section>
    </>
  )
}

export default Details
