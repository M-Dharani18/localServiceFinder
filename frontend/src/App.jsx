// import { Navigate, Route, Routes } from 'react-router-dom'
// import PrivateRoute from '@/routes/PrivateRoute'
// import RoleRoute from '@/routes/RoleRoute'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import CustomerDashboard from '@/pages/CustomerDashboard'
// import CustomerProfile from './pages/CustomerProfile'
// import Notifications from './pages/Notifications'
// import ProviderDashboard from '@/pages/ProviderDashboard'
// import ProviderProfileSetup from '@/pages/ProviderProfileSetup'
// import { useAuth } from '@/context/AuthContext'
// import ProviderListings from '@/pages/ProviderListings'
// import Services from '@/pages/Services'
// import BookService from '@/pages/BookService'
// import CustomerBookings from '@/pages/CustomerBookings'
// import ProviderBookings from '@/pages/ProviderBookings'
// import ProviderTimeSlots from '@/pages/ProviderTimeSlots'
// import CustomerLayout from '@/pages/CustomerLayout'
// import LandingPage from '@/pages/LandingPage'

// function HomeRedirect() {
//   const { role } = useAuth()
//   if (role === 'PROVIDER') return <Navigate to="/provider" replace />
//   if (role === 'CUSTOMER') return <Navigate to="/customer" replace />
//   return <Navigate to="/login" replace />
// }
// export default function App() {
//   return (
    
//     <Routes>
    
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route element={<PrivateRoute />}>
//         <Route element={<RoleRoute allow={["CUSTOMER"]} />}>
//           {/* ALL customer routes wrapped with CustomerLayout */}
//           <Route element={<CustomerLayout />}>
//             <Route path="/customer" element={<Navigate to="/customer/services" replace />} />
//             <Route path="/customer/services" element={<Services />} />
//             <Route path="/customer/bookings" element={<CustomerBookings />} />
//             <Route path="/customer/services/:id/book" element={<BookService />} />
//             <Route path="/customer/profile" element={<CustomerProfile />} />
//             <Route path="/customer/notifications" element={<Notifications />} />
//           </Route>
//         </Route>
        
//         <Route element={<RoleRoute allow={["PROVIDER"]} />}>
//           <Route path="/provider" element={<ProviderDashboard />} />
//           <Route path="/provider/setup" element={<ProviderProfileSetup />} />
//           <Route path="/provider/listings" element={<ProviderListings />} />
//           <Route path="/provider/bookings" element={<ProviderBookings />} />
//           <Route path="/provider/timeslots" element={<ProviderTimeSlots />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }



// App.jsx
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from '@/routes/PrivateRoute'
import RoleRoute from '@/routes/RoleRoute'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import CustomerProfile from './pages/CustomerProfile'
import Notifications from './pages/Notifications'
import ProviderDashboard from '@/pages/ProviderDashboard'
import ProviderProfileSetup from '@/pages/ProviderProfileSetup'
import { useAuth } from '@/context/AuthContext'
import ProviderListings from '@/pages/ProviderListings'
import Services from '@/pages/Services'
import BookService from '@/pages/BookService'
import CustomerBookings from '@/pages/CustomerBookings'
import ProviderBookings from '@/pages/ProviderBookings'
import ProviderTimeSlots from '@/pages/ProviderTimeSlots'
import CustomerLayout from '@/pages/CustomerLayout'
import LandingPage from '@/pages/LandingPage'
import ProviderLayout from '@/pages/ProviderLayout' // Add this import

function HomeRedirect() {
  const { role } = useAuth()
  if (role === 'PROVIDER') return <Navigate to="/provider/listings" replace /> // Changed to listings
  if (role === 'CUSTOMER') return <Navigate to="/customer/services" replace />
  return <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute allow={["CUSTOMER"]} />}>
          {/* ALL customer routes wrapped with CustomerLayout */}
          <Route element={<CustomerLayout />}>
            <Route path="/customer" element={<Navigate to="/customer/services" replace />} />
            <Route path="/customer/services" element={<Services />} />
            <Route path="/customer/bookings" element={<CustomerBookings />} />
            <Route path="/customer/services/:id/book" element={<BookService />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/notifications" element={<Notifications />} />
          </Route>
        </Route>
        
        <Route element={<RoleRoute allow={["PROVIDER"]} />}>
          {/* Wrap all provider routes with ProviderLayout */}
          <Route element={<ProviderLayout />}>
            <Route path="/provider" element={<Navigate to="/provider/listings" replace />} /> {/* Redirect to listings */}
            <Route path="/provider/listings" element={<ProviderListings />} />
            <Route path="/provider/timeslots" element={<ProviderTimeSlots />} />
            <Route path="/provider/bookings" element={<ProviderBookings />} />
            <Route path="/provider/profile" element={<ProviderProfileSetup />} /> {/* Use ProviderProfileSetup for profile */}
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}