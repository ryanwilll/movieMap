import { MoviesContext } from '../../context/MoviesContext'
import useFetch from '../../hooks/useFetch'

import styles from './Home.module.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import SimpleCard from '../../components/SimpleCard/SimpleCard'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState, useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const { addTopMovies, addRemainingMovies, addLastType, lastType, topMovies, remainingMovies } = useContext(MoviesContext)
  const [selectedType, setSelectedType] = useState<string>(lastType)
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const { data, loading, error } = useFetch(`/${selectedType}/top_rated?language=pt-BR&page=${selectedPage}`)

  useEffect(() => {
    addTopMovies(data?.slice(0, 6))
    addRemainingMovies(data?.slice(6))
  }, [data])

  const changeSelectedType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.title)
    addLastType(e.target.title)
  }

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className={styles.brand}>MovieMap</h1>
            <p>Saiba tudo sobre os melhores filmes!</p>
          </div>
        </div>
        <div className={styles.lancamentos}>
          <div className={styles.overlay}>
            <div className={styles.lancamentos_container}>
              <div>
                <p className={styles.lancamentos_text}>Disponíveis nos streamings online</p>
                <h4>{selectedType == 'movie' ? 'Filmes lançados recentemente' : 'Séries em alta entre os espectadores'} </h4>
              </div>
              <div className={styles.lancamentos_options}>
                <input
                  onChange={changeSelectedType}
                  type="radio"
                  name="type"
                  id="movie"
                  title="movie"
                  checked={selectedType == 'movie' && true}
                />
                <label htmlFor="movie">
                  <span>Filmes</span>
                </label>

                <input
                  onChange={changeSelectedType}
                  type="radio"
                  name="type"
                  id="serie"
                  title="tv"
                  checked={selectedType == 'tv' && true}
                />
                <label htmlFor="serie">
                  <span>Séries</span>
                </label>
              </div>
            </div>
            <div className={styles.movies}>
              {error ? (
                <p className={styles.error}>{error}</p>
              ) : (
                topMovies &&
                topMovies.map((movie) => (
                  <MovieCard
                    type={selectedType}
                    key={movie.id}
                    id={movie.id}
                    title={movie.title || movie.name}
                    poster={movie.poster_path}
                    date={movie.release_date || movie.first_air_date}
                    duration={movie.id}
                    averange={movie.vote_average}
                    loading={loading}
                  />
                ))
              )}
            </div>

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
          </div>
        </div>
        <Footer />
      </div>
    </SkeletonTheme>
  )
}

export default Home
