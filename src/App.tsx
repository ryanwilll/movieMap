import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MoviesProvider } from './context/MoviesContext'

import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Details from './pages/Details/Details'
import Movies from './pages/Movies/Movies'

function App() {
  return (
    <>
      <MoviesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="series" element={<Home />} />
            <Route path="search" element={<Home />} />
            <Route path=":type/details/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </MoviesProvider>
    </>
  )
}

export default App
