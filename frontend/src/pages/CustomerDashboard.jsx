// import { Link } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'

// export default function CustomerDashboard() {
//   const { user, logout } = useAuth()
//   return (
//     <div className="min-h-screen">
//       <header className="bg-white border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//           <h1 className="text-xl font-semibold">Customer Dashboard</h1>
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
//             <button className="text-sm text-red-600" onClick={logout}>Logout</button>
//           </div>
//         </div>
//       </header>
//       <main className="max-w-6xl mx-auto p-4">
//         <div className="grid gap-4">
//           <Link to="/services" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
//             Browse Services
//           </Link>
//           <Link to="/customer/bookings" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
//             My Bookings
//           </Link>
//         </div>
//       </main>
//     </div>
//   )
// }


import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function CustomerDashboard() {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-cyan-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Customer Dashboard
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
          <p className="text-gray-600">Discover and book services easily</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/services" 
            className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">Browse Services</h3>
              <p className="text-cyan-100 text-sm">Explore available services and find what you need</p>
            </div>
          </Link>
          
          <Link 
            to="/customer/bookings" 
            className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-2">My Bookings</h3>
              <p className="text-purple-100 text-sm">View and manage your service bookings</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}