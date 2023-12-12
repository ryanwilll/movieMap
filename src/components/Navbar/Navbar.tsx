import { BiMenu, BiSearch, BiX } from 'react-icons/bi';

import '../../sass/index.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState<boolean | null>(null);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleOpenOrCloseMenu = () => {
    setIsOpenMenuMobile((prev) => !prev);
    console.log('clicou');
    menuRef?.current?.classList.toggle('hidden');
  };

  const handleCloseMenu = (ref: HTMLDivElement) => {
    ref?.classList.add('hidden');
  };

  const handleOpenSearch = () => {
    setIsOpenSearch((prev) => !prev);
    console.log('clicou');
    searchRef?.current?.classList.toggle('hidden');
    console.log(searchRef?.current);
  };

  useEffect(() => {
    const getWindowSize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 1024) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };
    getWindowSize();

    window.addEventListener('resize', getWindowSize);
  }, []);

  return (
    <nav>
      <div className='container__layout'>
        <Link to='/' className='brand'>
          <img className='navbar__image' src='/Logo.svg' alt='Logotipo do MovieMap' />
          <h1>MovieMap</h1>
        </Link>

        <div>
          <>
            <BiSearch onClick={handleOpenSearch} />
            <BiMenu onClick={handleOpenOrCloseMenu} />
          </>

          {/* {isMobileView && !isOpenMenuMobile && !isOpenSearch && <BiX onClick={() => handleCloseMenu(menuRef?.current)} />} */}

          {!isMobileView && (
            <div className='container__layout__navbar__links'>
              <Link className='navbar__link' to={'/'}>
                Home
              </Link>
              <Link className='navbar__link' to={'/1'}>
                Home 1
              </Link>
              <Link className='navbar__link' to={'/2'}>
                Home 2
              </Link>
              <Link className='navbar__link' to={'/3'}>
                Home 3
              </Link>
              <Link className='navbar__link' to={'/4'}>
                Home 4
              </Link>
            </div>
          )}
        </div>
      </div>
      {isMobileView && (
        <div className='menuMobile hidden' ref={menuRef}>
          <a href='#'>Item #1</a>
          <a href='#'>Item #2</a>
          <a href='#'>Item #3</a>
          <a href='#'>Item #4</a>
          <a href='#'>Item #5</a>
        </div>
      )}
      {isMobileView && (
        <>
          <div className='menuMobileSearch hidden' ref={searchRef}>
            <a href='#'>MenuMobileSearch #1</a>
            <a href='#'>MenuMobileSearch #2</a>
            <a href='#'>MenuMobileSearch #3</a>
            <a href='#'>MenuMobileSearch #4</a>
            <a href='#'>MenuMobileSearch #5</a>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
