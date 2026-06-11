import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import BookingConfirm from './pages/BookingConfirm'
import BookingSuccess from './pages/BookingSuccess'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import HotelDetail from './pages/HotelDetail'
import HotelList from './pages/HotelList'
import Login from './pages/Login'
import ManagerDashboard from './pages/ManagerDashboard'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:hotelId" element={<HotelDetail />} />
        <Route
          path="/hotels/:hotelId/rooms/:roomId/book"
          element={<BookingConfirm />}
        />
        <Route
          path="/bookings/:bookingId/success"
          element={<BookingSuccess />}
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
