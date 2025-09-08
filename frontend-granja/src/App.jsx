import Layout from './components/layout/Layout'
import AdminPage from './pages/adminPage/AdminPage'
import NotFound from './pages/notFound/NotFound'
import AlimentacionForm from "./pages/alimentacion/AlimentacionForm";
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/alimentacion/nuevo" element={<AlimentacionForm />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
