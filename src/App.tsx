import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { NavBar } from './components/common'
import AdminDashboard from './pages/AdminDashboard'
import BookingConfirm from './pages/BookingConfirm'
import BookingSuccess from './pages/BookingSuccess'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import HotelDetail from './pages/HotelDetail'
import HotelList from './pages/HotelList'
import Login from './pages/Login'
import ManagerDashboard from './pages/ManagerDashboard'
import MyBookings from './pages/MyBookings'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'

const HIDE_NAV_PATHS = ['/login', '/register', '/verify-otp', '/forgot-password']

const AppShell = () => {
  const location = useLocation()
  const hideNav = HIDE_NAV_PATHS.includes(location.pathname)

  return (
    <>
      {!hideNav && <NavBar />}
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
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
