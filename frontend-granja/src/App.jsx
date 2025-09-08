import Layout from './components/layout/Layout'
import AdminPage from './pages/adminPage/AdminPage'
import NotFound from './pages/notFound/NotFound'
import { Routes, Route } from 'react-router-dom'
import AlimentacionList from './components/alimentacionList/AlimentacionList'

import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AdminPage />} />
        <Route path="alimentacion" element={<AlimentacionList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
