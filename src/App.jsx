import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import Testing from './components/testing'
import UserData from './components/UserData'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<h1>ERROR 404 PAGE NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
