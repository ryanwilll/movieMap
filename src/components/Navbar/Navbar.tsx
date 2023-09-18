import { Link } from 'react-router-dom'
import { BiSearch, BiWorld } from 'react-icons/bi'
import logoTipo from '/Vector.svg'

import styles from './Navbar.module.css'

function Navbar() {
  const showInputSearch = (e: any) => {
    e.preventDefault()
    const inputSearch = document.querySelector(`.${styles.hidden}`)

    if (inputSearch) {
      inputSearch.classList.remove(`${styles.hidden}`)
      return
    }

    sendSearch()
  }

  const sendSearch = () => {
    console.log('pesquisando')
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.container}>
        <img src={logoTipo} alt="Logo tipo da página" />
        <h2>MovieMap</h2>
      </Link>
      <div className={styles.container}>
        <Link to="/">Home</Link>
        <span className={styles.divider} />
        <Link to="/">Movies</Link>
        <span className={styles.divider} />
        <Link to="/">TV Show</Link>
        <span className={styles.divider} />
        <Link to="/">Web Series</Link>
      </div>
      <div className={styles.container}>
        <form className={styles.container}>
          <input type="text" name="search" id="search" className={styles.hidden} />
          <button onClick={showInputSearch}>
            <BiSearch />
          </button>
        </form>
        <span className={styles.divider} />
        <div className={styles.container}>
          <BiWorld />
          <span>BR</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
