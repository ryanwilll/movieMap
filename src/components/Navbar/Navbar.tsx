import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { BsX } from 'react-icons/bs'

import logoTipo from '/Vector.svg'
import styles from './Navbar.module.css'

function Navbar() {
  const [query, setQuery] = useState<string>('')
  const navigate = useNavigate()

  const sendSearch = (e: FormEvent) => {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input?.classList.contains(`${styles.hidden}`)) {
      input.classList.remove(`${styles.hidden}`)
      return
    }

    if (!query) return

    navigate(`/search?query=${query}`)
    setQuery('')
  }

  const clearInput = (e: FormEvent) => {
    e.stopPropagation()
    setQuery('')
  }

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const navbar = document.querySelector(`.${styles.navbar}`)
      if (navbar && !navbar.contains(e.target as Node)) {
        const input = document.querySelector('input')
        if (input) {
          input.classList.add(`${styles.hidden}`)
          return
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

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
          <button type="submit" onClick={sendSearch}>
            <BiSearch />
          </button>
          {query.length > 0 && (
            <button onClick={(e) => clearInput(e)} className={styles.form_clear}>
              <BsX />
            </button>
          )}
        </form>
      </div>
    </nav>
  )
}

export default Navbar
