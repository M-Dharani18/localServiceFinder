// import { Link } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'

// export default function ProviderDashboard() {
//   const { user, logout } = useAuth()
//   return (
//     <div className="min-h-screen">
//       <header className="bg-white border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-xl font-semibold">Provider Dashboard</h1>
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
//             <button className="text-sm text-red-600" onClick={logout}>Logout</button>
//           </div>
//         </div>
//       </header>
//       <main className="max-w-6xl mx-auto p-4">
//         <div className="grid gap-4">
//           <Link to="/provider/setup" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
//             Complete/Update Profile
//           </Link>
//           <Link to="/provider/listings" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
//             Manage Service Listings
//           </Link>
//           <Link to="/provider/timeslots" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
//             Manage Availability (Time Slots)
//           </Link>
//           <Link to="/provider/bookings" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
//             Incoming Bookings
//           </Link>
//         </div>
//       </main>
//     </div>
//   )
// }


import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProviderDashboard() {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Provider Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
            <button 
              className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors" 
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Manage your services and bookings from your dashboard</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link 
            to="/provider/setup" 
            className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-xl font-bold mb-2">Complete/Update Profile</h3>
              <p className="text-blue-100 text-sm">Set up your business information and categories</p>
            </div>
          </Link>
          
          <Link 
            to="/provider/listings" 
            className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-xl font-bold mb-2">Manage Service Listings</h3>
              <p className="text-purple-100 text-sm">Create and edit your service offerings</p>
            </div>
          </Link>
          
          <Link 
            to="/provider/timeslots" 
            className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-3xl mb-3">🗓️</div>
              <h3 className="text-xl font-bold mb-2">Manage Availability</h3>
              <p className="text-emerald-100 text-sm">Set your available time slots for bookings</p>
            </div>
          </Link>
          
          <Link 
            to="/provider/bookings" 
            className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-3xl mb-3">📥</div>
              <h3 className="text-xl font-bold mb-2">Incoming Bookings</h3>
              <p className="text-orange-100 text-sm">View and manage customer booking requests</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}