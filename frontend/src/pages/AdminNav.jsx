import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { BarChart3, Users, Briefcase, Shield, LogOut, Home, Flag, Settings } from 'lucide-react'

export default function AdminNav() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: BarChart3,
      active: location.pathname === '/admin/dashboard'
    },
    { 
      name: 'Listings', 
      path: '/admin/listings', 
      icon: Briefcase,
      active: location.pathname.includes('/admin/listings')
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: Users,
      active: location.pathname.includes('/admin/users')
    },
    { 
      name: 'Providers', 
      path: '/admin/providers', 
      icon: Shield,
      active: location.pathname.includes('/admin/providers')
    },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              QuickServe Admin
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
                    ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border border-purple-100' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className={`w-4 h-4 ${item.active ? 'text-purple-600' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: User info and logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
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