import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '../../services/api'
import { IMovies, ISeries } from '../../types/IMoviesOrSeries'
import Card from '../../components/Card/Card'

import '../../sass/pages/_home.scss'

const Home = () => {
  const [type, setType] = useState<string>(localStorage.getItem('selectedType') || 'movie')

  const { data: movies } = useQuery<IMovies[]>({
    queryKey: ['movies'],
    queryFn: () => fetchData('/movie/upcoming?language=pt-BR&page=1'),
  })

  const { data: series } = useQuery<ISeries[]>({
    queryKey: ['tv'],
    queryFn: () => fetchData('/tv/top_rated?language=pt-BR&page=1'),
    enabled: type === 'tv',
  })

  useEffect(() => {
    localStorage.setItem('selectedType', type)
  }, [type])

  return (
    <div className="container">
      <>
        <div
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies?.[2].backdrop_path})` }}
          className="home__container">
          <div className="home__text">
            <h1 className="brand">MovieMap</h1>
            <p className="brand__description">Um guia completo com informações de todos os filmes e series.</p>
            <form className="form__container">
              <label htmlFor="search">O que você quer assistir?</label>
              <input type="text" name="search" id="search" placeholder="Digite o nome do filme/série" />
              <button className="btn__search">Search</button>
            </form>
          </div>
        </div>
        <section className="section">
          <div className="section__container">
            <div>
              <h3 className="text__streamings">Disponíveis nos streamings online</h3>
              <h2 className="text__descriptions">
                {type === 'movie' ? 'Filmes lançados recentemente' : 'Séries com as melhores avaliações'}
              </h2>
            </div>
            <div className="btns__container">
              <button className={`btn__option ${type === 'movie' && 'selected'}`} onClick={() => setType('movie')}>
                Filmes
              </button>
              <button className={`btn__option ${type === 'tv' && 'selected'}`} onClick={() => setType('tv')}>
                Series
              </button>
            </div>
          </div>
          <div className="section__itens__grid">
            {type === 'movie' &&
              movies?.map((data) => (
                <Card
                  isAdult={data.adult}
                  type={type}
                  bannerUrl={data.poster_path}
                  name={data.title}
                  vote_average={data.vote_average}
                  id={data.id}
                  key={data.id}
                  release_date={data.release_date}
                />
              ))}
            {type === 'tv' &&
              series?.map((data) => (
                <Card
                  isAdult={data.adult}
                  type={type}
                  bannerUrl={data.poster_path}
                  name={data.name}
                  vote_average={data.vote_average}
                  id={data.id}
                  key={data.id}
                  release_date={data.first_air_date}
                />
              ))}
          </div>
        </section>
      </>
    </div>
  )
}

export default Home
