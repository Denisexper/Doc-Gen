import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Generator from './pages/Generator'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/generar/:tipo" element={<Generator />} />
      </Route>
    </Routes>
  )
}
