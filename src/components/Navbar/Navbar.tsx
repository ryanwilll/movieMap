import { BiMenu, BiX } from 'react-icons/bi'

import '../../sass/index.scss'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null)
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState<boolean | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  const handleOpenOrCloseMenu = () => {
    setIsOpenMenuMobile((prev) => !prev)
    menuRef?.current?.classList.toggle('hidden')
  }

  useEffect(() => {
    const getWindowSize = () => {
      const windowWidth = window.innerWidth

      if (windowWidth < 1024) {
        setIsMobileView(true)
      } else {
        setIsMobileView(false)
        setIsOpenMenuMobile(false)
      }
    }
    getWindowSize()

    window.addEventListener('resize', getWindowSize)
  }, [])

  return (
    <nav>
      <div className="container__layout">
        <div>
          <img className="navbar__image" src="Vector.svg" alt="Logotipo do MovieMap" />
        </div>

        <div>
          {isMobileView && !isOpenMenuMobile && <BiMenu onClick={handleOpenOrCloseMenu} />}
          {isMobileView && isOpenMenuMobile && <BiX onClick={handleOpenOrCloseMenu} />}

          {!isMobileView && (
            <div className="container__layout__navbar__links">
              <Link className="navbar__link" to={'/'}>
                Home
              </Link>
              <Link className="navbar__link" to={'/1'}>
                Home 1
              </Link>
              <Link className="navbar__link" to={'/2'}>
                Home 2
              </Link>
              <Link className="navbar__link" to={'/3'}>
                Home 3
              </Link>
              <Link className="navbar__link" to={'/4'}>
                Home 4
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMobileView && (
        <div className="menuMobile hidden" ref={menuRef}>
          <a href="#">Item #1</a>
          <a href="#">Item #2</a>
          <a href="#">Item #3</a>
          <a href="#">Item #4</a>
          <a href="#">Item #5</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
