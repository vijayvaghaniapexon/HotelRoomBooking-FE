import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
