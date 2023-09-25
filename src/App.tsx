import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MoviesProvider } from './context/MoviesContext'

import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Details from './pages/Details/Details'
import Movies from './pages/Movies/Movies'
import Series from './pages/Series/Series'

function App() {
  return (
    <>
      <MoviesProvider lastPage={1}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Home />} />
            <Route path="/:type/details/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </MoviesProvider>
    </>
  )
}

export default App
