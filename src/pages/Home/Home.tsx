import styles from './Home.module.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import SimpleCard from '../../components/SimpleCard/SimpleCard'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { getDatas } from '../../services/api'

const Home = () => {
  const { loading, getMoviesOrSeries, error, response, remainingResponse } = getDatas()
  const [selectedType, setSelectedType] = useState<string>('get_movies')
  const [selectedPage, setSelectedPage] = useState<number>(1)

  const changeSelectedType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.title)
  }

  useEffect(() => {
    getMoviesOrSeries(selectedType, selectedPage)
  }, [selectedType, selectedPage])

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
                <h4>{selectedType == 'get_movies' ? 'Filmes lançados recentemente' : 'Séries em alta entre os espectadores'} </h4>
              </div>
              <div className={styles.lancamentos_options}>
                <input
                  onChange={changeSelectedType}
                  type="radio"
                  name="type"
                  id="movie"
                  title="get_movies"
                  checked={selectedType == 'get_movies' && true}
                  value={selectedType}
                />
                <label htmlFor="movie">
                  <span>Filmes</span>
                </label>

                <input
                  onChange={changeSelectedType}
                  type="radio"
                  name="type"
                  id="serie"
                  title="get_series"
                  checked={selectedType == 'get_series' && true}
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
                response.map((movie) => (
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
                remainingResponse.map((movie) => (
                  <SimpleCard key={movie.id} type={selectedType} id={movie.id} title={movie.title} poster={movie.poster_path} />
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
