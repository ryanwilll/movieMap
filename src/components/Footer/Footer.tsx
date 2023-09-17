import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.overlay}>
        <div>
          <p>
            Este site tem o propósito exclusivo de fornecer informações e detalhes sobre filmes e séries. Não reproduzimos nem
            redirecionamos para nenhuma plataforma ilegal que contenha quaisquer tipos de pirataria. Todos os dados exibidos são
            para fins informativos e legais. Respeitamos os direitos autorais e incentivamos o uso legal das obras audiovisuais.
            Se você deseja assistir a um filme ou série, recomendamos fazê-lo por meio de serviços de streaming oficiais e
            licenciados.
          </p>
        </div>
        <div className={styles.footer_links}>
          <Link to="/">About us</Link>
          <Link to="/">Contato</Link>
          <Link to="/">Reportar erros</Link>
          <Link to="/">Reclamações</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
