import { useState, useContext, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import MovieCard from '../../components/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'

import styles from './Movies.module.css'
import Footer from '../../components/Footer/Footer'

import { MoviesContext } from '../../context/MoviesContext'
import { IMediaCommon, IMovieDetails, ISeriesDetails } from '../../types/IMoviesDetails'

const Movies = () => {
  const { lastPage, addLastPage } = useContext(MoviesContext)

  const [page, setPage] = useState<number>(lastPage)
  const { data, error, loading } = useFetch(`/movie/upcoming?language=pt-BR&page=${page}`)

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1
    addLastPage(newOffset)
    setPage(newOffset)
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [page])

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.container_wrapper}>
            {!error ? (
              <>
                <h1 className={styles.title}>Filmes em alta</h1>
                <div className={styles.movies}>
                  {data?.results ? (
                    data?.results.map((movie: IMediaCommon) => (
                      <MovieCard
                        averange={movie.vote_average}
                        date={(movie as IMovieDetails).release_date || (movie as ISeriesDetails).first_air_date}
                        id={movie.id}
                        loading={loading}
                        poster={movie.poster_path}
                        title={(movie as IMovieDetails).title || (movie as ISeriesDetails).name}
                        type="movie"
                        key={movie.id}
                      />
                    ))
                  ) : (
                    <p>Carregando</p>
                  )}
                </div>
                <nav aria-label="Navegação de páginas">
                  <ReactPaginate
                    containerClassName="pagination"
                    activeClassName="active"
                    breakLabel="..."
                    nextLabel="Próximo"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={15}
                    pageCount={100}
                    forcePage={page - 1}
                    previousLabel="Voltar"
                  />
                </nav>
              </>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Movies
