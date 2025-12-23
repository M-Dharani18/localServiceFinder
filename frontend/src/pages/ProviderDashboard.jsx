import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProviderDashboard() {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Provider Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
            <button className="text-sm text-red-600" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid gap-4">
          <Link to="/provider/setup" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
            Complete/Update Profile
          </Link>
          <Link to="/provider/listings" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
            Manage Service Listings
          </Link>
          <Link to="/provider/timeslots" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
            Manage Availability (Time Slots)
          </Link>
          <Link to="/provider/bookings" className="block p-4 rounded-lg bg-white shadow border hover:bg-gray-50">
            Incoming Bookings
          </Link>
        </div>
      </main>
    </div>
  )
}
