import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import './sass/index.scss'
import NotFound from './pages/NotFound'
import Details from './pages/Details/Details'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type/details/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
