import Layout from './components/layout/Layout'
import AdminPage from './pages/adminPage/AdminPage'
import NotFound from './pages/notFound/NotFound'
import AlimentacionForm from "./pages/alimentacion/AlimentacionForm";
import { Routes, Route } from 'react-router-dom'
import AlimentacionList from './components/alimentacionList/AlimentacionList'
import ClienteForm from "./pages/clientes/ClienteForm";

import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AdminPage />} />
        <Route path="alimentacion" element={<AlimentacionList />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/alimentacion/nuevo" element={<AlimentacionForm />} />
        <Route path="/clientes/nuevo" element={<ClienteForm />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
