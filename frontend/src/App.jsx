import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from '@/routes/PrivateRoute'
import RoleRoute from '@/routes/RoleRoute'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import CustomerDashboard from '@/pages/CustomerDashboard'
import ProviderDashboard from '@/pages/ProviderDashboard'
import ProviderProfileSetup from '@/pages/ProviderProfileSetup'
import { useAuth } from '@/context/AuthContext'
import ProviderListings from '@/pages/ProviderListings'
import Services from '@/pages/Services'
import BookService from '@/pages/BookService'
import CustomerBookings from '@/pages/CustomerBookings'
import ProviderBookings from '@/pages/ProviderBookings'
import ProviderTimeSlots from '@/pages/ProviderTimeSlots'

function HomeRedirect() {
  const { role } = useAuth()
  if (role === 'PROVIDER') return <Navigate to="/provider" replace />
  if (role === 'CUSTOMER') return <Navigate to="/customer" replace />
  return <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute allow={["CUSTOMER"]} />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/bookings" element={<CustomerBookings />} />
          <Route path="/services/:id/book" element={<BookService />} />
        </Route>
        <Route element={<RoleRoute allow={["PROVIDER"]} />}>
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/setup" element={<ProviderProfileSetup />} />
          <Route path="/provider/listings" element={<ProviderListings />} />
          <Route path="/provider/bookings" element={<ProviderBookings />} />
          <Route path="/provider/timeslots" element={<ProviderTimeSlots />} />
        </Route>
      </Route>

      {/* Public or semi-public services browsing for customers */}
      <Route path="/services" element={<Services />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
