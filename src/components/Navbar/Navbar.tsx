import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { BsX } from 'react-icons/bs'

import logoTipo from '/Vector.svg'
import styles from './Navbar.module.css'

function Navbar() {
  const [query, setQuery] = useState<string>('')

  const sendSearch = (e: FormEvent) => {
    e.preventDefault()
    setQuery('')
    console.log('Enviando a pesquisa: ' + query)
  }

  const clearInput = (e: FormEvent) => {
    e.preventDefault()
    setQuery('')
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.container}>
        <img src={logoTipo} alt="Logo tipo da página" />
        <h2>MovieMap</h2>
      </Link>
      <div className={styles.container}>
        <Link to="/">Início</Link>
        <span className={styles.divider} />
        <Link to="/movies">Filmes</Link>
        <span className={styles.divider} />
        <Link to="/series">Séries</Link>
      </div>
      <div className={styles.container}>
        <form className={styles.container} onSubmit={sendSearch}>
          <input
            onBlur={(e) => e.preventDefault()}
            type="text"
            name="search"
            id="search"
            placeholder="Pesquisar filmes/series"
            className={styles.hidden}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={(e) => clearInput(e)} className={styles.form_clear}>
            <BsX />
          </button>
          <button type="submit" onClick={sendSearch}>
            <BiSearch />
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
