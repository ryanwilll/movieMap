import { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import MovieCard from '../../components/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'

import { MoviesContext } from '../../context/MoviesContext'
import noResults from '../../assets/no-results.webp'

import styles from './Search.module.css'
import Footer from '../../components/Footer/Footer'
import { IMediaCommon, IMovieDetails, ISeriesDetails } from '../../types/IMoviesDetails'

const Search = () => {
  const [useParams] = useSearchParams()
  const query = useParams.get('query')

  const { lastPage, addLastPage } = useContext(MoviesContext)
  const [page, setPage] = useState<number>(lastPage)

  const { data, error, loading } = useFetch(`/search/multi?query=${query}&language=pt-BR&page=${page}`)

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
                {data?.results[0] ? (
                  <>
                    <h1 className={styles.title}>Resultados para '{query}'</h1>
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
                            type={movie.media_type === 'tv' ? 'serie' : 'movie'}
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
                  <>
                    <div className={styles.no_results}>
                      <img src={noResults} alt="" />
                      <p>Sem resultados para a sua pesquisa...</p>
                    </div>
                  </>
                )}
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

export default Search
