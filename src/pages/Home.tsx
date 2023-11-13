import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { IMovies } from '../types/IMovies'

import '../sass/index.scss'
import Card from '../components/Card/Card'
import { useState } from 'react'

export const getTopMovies = async (url: string) => {
  const res = await api.get(url)
  return res.data.results
}

const Home = () => {
  const [type, setType] = useState<string>('movie')

  const { data } = useQuery<IMovies[]>({
    queryKey: ['movies'],
    queryFn: () => getTopMovies('/movie/upcoming?language=pt-BR&page=1'),
  })

  return (
    <div className="container">
      <>
        <div
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.[0].backdrop_path})` }}
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
              <h2 className="text__descriptions">Filmes lançados recentemente</h2>
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
            {data?.map((data) => (
              <Card
                adult={data.adult}
                poster_path={data.poster_path}
                title={data.title}
                vote_average={data.vote_average}
                backdrop_path={data.backdrop_path}
                id={data.id}
                key={data.id}
                release_date={data.release_date}
              />
            ))}
          </div>
        </section>
      </>
    </div>
  )
}

export default Home
