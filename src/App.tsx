import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import './sass/index.scss'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
