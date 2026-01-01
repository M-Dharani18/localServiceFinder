// ProviderNav.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Briefcase, Clock, Calendar, User, LogOut, Home } from 'lucide-react'

export default function ProviderNav() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { 
      name: 'Service Listings', 
      path: '/provider/listings', 
      icon: Briefcase,
      active: location.pathname === '/provider/listings'
    },
    { 
      name: 'Availability', 
      path: '/provider/timeslots', 
      icon: Clock,
      active: location.pathname.includes('/provider/timeslots')
    },
    { 
      name: 'Bookings', 
      path: '/provider/bookings', 
      icon: Calendar,
      active: location.pathname.includes('/provider/bookings')
    },
    { 
      name: 'Profile', 
      path: '/provider/profile', 
      icon: User,
      active: location.pathname.includes('/provider/profile')
    },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">QP</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              QuickServe 
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${item.active 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-100' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className={`w-4 h-4 ${item.active ? 'text-emerald-600' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: User info and logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'P'}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Provider'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'provider@email.com'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}