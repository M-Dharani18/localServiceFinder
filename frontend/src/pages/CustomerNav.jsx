// components/CustomerNav.jsx
// import { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'
// import { 
//   Search, 
//   Calendar, 
//   User, 
//   Bell, 
//   Menu, 
//   X,
//   LogOut,
//   ShieldCheck
// } from 'lucide-react'

// export default function CustomerNav() {
//   const { user, logout } = useAuth()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const navigation = [
//     { name: 'Browse Services', path: '/services', icon: Search },
//     { name: 'My Bookings', path: '/customer/bookings', icon: Calendar },
//     { name: 'Profile', path: '/customer/profile', icon: User },
//     { name: 'Notifications', path: '/customer/notifications', icon: Bell }
//   ]

//   const isActive = (path) => location.pathname === path

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-cyan-100 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/customer" className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
//               <ShieldCheck className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
//               LocalService Pro
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               const active = isActive(item.path)
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                     active
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//           </nav>

//           {/* User Menu */}
//           <div className="hidden md:flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
//               <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Logout</span>
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-cyan-50"
//           >
//             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden border-t border-cyan-100 bg-white/95 backdrop-blur-md">
//           <div className="px-4 py-4 space-y-2">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               const active = isActive(item.path)
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//                     active
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-cyan-50'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//             <div className="pt-4 border-t border-gray-200">
//               <div className="px-4 py-2 mb-2">
//                 <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   logout()
//                   setIsMobileMenuOpen(false)
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


// // components/CustomerNav.jsx
// import { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'
// import { 
//   Search, 
//   Calendar, 
//   User, 
//   Bell, 
//   Menu, 
//   X,
//   LogOut,
//   ShieldCheck
// } from 'lucide-react'

// export default function CustomerNav() {
//   const { user, logout } = useAuth()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const navigation = [
//     { name: 'Browse Services', path: '/services', icon: Search },
//     { name: 'My Bookings', path: '/customer/bookings', icon: Calendar },
//     { name: 'Profile', path: '/customer/profile', icon: User },
//     { name: 'Notifications', path: '/customer/notifications', icon: Bell }
//   ]

//   const isActive = (path) => location.pathname === path

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-cyan-100 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/customer" className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
//               <ShieldCheck className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
//               LocalService Pro
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               const active = isActive(item.path)
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                     active
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//           </nav>

//           {/* User Menu */}
//           <div className="hidden md:flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
//               <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Logout</span>
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-cyan-50"
//           >
//             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden border-t border-cyan-100 bg-white/95 backdrop-blur-md">
//           <div className="px-4 py-4 space-y-2">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               const active = isActive(item.path)
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//                     active
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-cyan-50'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//             <div className="pt-4 border-t border-gray-200">
//               <div className="px-4 py-2 mb-2">
//                 <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   logout()
//                   setIsMobileMenuOpen(false)
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }



// // components/CustomerNav.jsx
// import { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'
// import { 
//   Search, 
//   Calendar, 
//   User, 
//   Bell, 
//   Menu, 
//   X,
//   LogOut,
//   ShieldCheck
// } from 'lucide-react'

// export default function CustomerNav() {
//   const { user, logout } = useAuth()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const navigation = [
//     { name: 'Browse Services', path: '/services', icon: Search },
//     { name: 'My Bookings', path: '/customer/bookings', icon: Calendar },
//     { name: 'Profile', path: '/customer/profile', icon: User },
//     { name: 'Notifications', path: '/customer/notifications', icon: Bell }
//   ]

//   const isActive = (path) => location.pathname === path

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-cyan-100 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/customer" className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
//               <ShieldCheck className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
//               LocalService Pro
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               const active = isActive(item.path)
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                     active
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//           </nav>

//           {/* User Menu */}
//           <div className="hidden md:flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
//               <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Logout</span>
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-cyan-50"
//           >
//             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden border-t border-cyan-100 bg-white/95 backdrop-blur-md">
//           <div className="px-4 py-4 space-y-2">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               const active = isActive(item.path)
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//                     active
//                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-cyan-50'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//             <div className="pt-4 border-t border-gray-200">
//               <div className="px-4 py-2 mb-2">
//                 <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   logout()
//                   setIsMobileMenuOpen(false)
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }



// import { useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'
// import { 
//   Search, 
//   Calendar, 
//   User, 
//   Bell,
//   Menu,
//   X,
//   LogOut,
//   ChevronRight,
//   Home
// } from 'lucide-react'

// export default function CustomerNav({ children }) {
//   const { user, logout } = useAuth()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const navigation = [
//   { 
//     name: 'Services', 
//     path: '/customer/services',  // Changed from '/services'
//     icon: Search,
//     active: location.pathname === '/customer/services'
//   },
//   { 
//     name: 'My Bookings', 
//     path: '/customer/bookings', 
//     icon: Calendar,
//     active: location.pathname.includes('/customer/bookings')
//   },
//   { 
//     name: 'Profile', 
//     path: '/customer/profile', 
//     icon: User,
//     active: location.pathname.includes('/customer/profile')
//   },
//   { 
//     name: 'Notifications', 
//     path: '/customer/notifications', 
//     icon: Bell,
//     active: location.pathname.includes('/customer/notifications')
//   },
// ]

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar toggle */}
//       <button
//         onClick={() => setIsMobileMenuOpen(true)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
//       >
//         <Menu className="w-6 h-6 text-gray-700" />
//       </button>

//       {/* Sidebar */}
//       <aside className={`
//         fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto
//       `}>
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="p-6 border-b">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//                 <Home className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   ServicePro
//                 </h1>
//                 <p className="text-xs text-gray-500">Customer Portal</p>
//               </div>
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="lg:hidden ml-auto p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* User profile */}
//           <div className="p-6 border-b">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//                 {user?.name?.charAt(0) || user?.email?.charAt(0) || 'C'}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-gray-900 truncate">
//                   {user?.name || 'Customer'}
//                 </p>
//                 <p className="text-xs text-gray-500 truncate">
//                   {user?.email || 'customer@example.com'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//             {navigation.map((item) => {
//               const isActive = location.pathname === item.path
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`
//                     flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
//                     ${isActive 
//                       ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100' 
//                       : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                     }
//                   `}
//                 >
//                   <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
//                   {item.name}
//                   {isActive && (
//                     <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />
//                   )}
//                 </Link>
//               )
//             })}
//           </nav>

//           {/* Logout button */}
//           <div className="p-4 border-t">
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
//             >
//               <LogOut className="w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:ml-64">
//         {/* Top bar - Only show when not on services page */}
//         {location.pathname !== '/services' && (
//           <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//             <div className="px-6 py-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {location.pathname === '/customer/bookings' && 'My Bookings'}
//                     {location.pathname === '/customer/profile' && 'My Profile'}
//                     {location.pathname === '/customer/notifications' && 'Notifications'}
//                   </h1>
//                   <p className="text-gray-600">
//                     {location.pathname === '/customer/bookings' && 'View and manage your service bookings'}
//                     {location.pathname === '/customer/profile' && 'Manage your personal information'}
//                     {location.pathname === '/customer/notifications' && 'Stay updated with your activities'}
//                   </p>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   {/* Back to services button */}
//                   <Link 
//                     to="/services" 
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium"
//                   >
//                     <Search className="w-4 h-4" />
//                     Browse Services
//                   </Link>
                  
//                   {/* Notifications bell */}
//                   <Link 
//                     to="/customer/notifications" 
//                     className="relative p-2 hover:bg-gray-100 rounded-lg"
//                   >
//                     <Bell className="w-6 h-6 text-gray-600" />
//                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                   </Link>
                  
//                   {/* User profile */}
//                   <Link 
//                     to="/customer/profile" 
//                     className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
//                       {user?.name?.charAt(0) || user?.email?.charAt(0) || 'C'}
//                     </div>
//                     <div className="hidden md:block">
//                       <p className="text-sm font-medium text-gray-900">{user?.name || 'Customer'}</p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </header>
//         )}

//         {/* Render children content */}
//         <main className={location.pathname === '/services' ? '' : 'p-6'}>
//           {children}
//         </main>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </div>
//   )
// }



// // CustomerNav.jsx
// import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'
// import { Search, Calendar, User, Bell, LogOut } from 'lucide-react'

// export default function CustomerNav() {
//   const { user, logout } = useAuth()
//   const location = useLocation()

//   const navigation = [
//     { 
//       name: 'Services', 
//       path: '/customer/services', 
//       icon: Search,
//       active: location.pathname === '/customer/services'
//     },
//     { 
//       name: 'My Bookings', 
//       path: '/customer/bookings', 
//       icon: Calendar,
//       active: location.pathname.includes('/customer/bookings')
//     },
//     { 
//       name: 'Profile', 
//       path: '/customer/profile', 
//       icon: User,
//       active: location.pathname.includes('/customer/profile')
//     },
//     { 
//       name: 'Notifications', 
//       path: '/customer/notifications', 
//       icon: Bell,
//       active: location.pathname.includes('/customer/notifications')
//     },
//   ]

//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
//               <span className="text-white font-bold text-sm">SP</span>
//             </div>
//             <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               ServicePro
//             </span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex items-center space-x-1">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`
//                   flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
//                   ${item.active 
//                     ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100' 
//                     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                   }
//                 `}
//               >
//                 <item.icon className={`w-4 h-4 ${item.active ? 'text-blue-600' : 'text-gray-500'}`} />
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Right side: User info and logout */}
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
//                 {user?.name?.charAt(0) || user?.email?.charAt(0) || 'C'}
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{user?.name || 'Customer'}</p>
//                 <p className="text-xs text-gray-500">{user?.email || 'customer@email.com'}</p>
//               </div>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
//             >
//               <LogOut className="w-4 h-4" />
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }


import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Search, Calendar, User, Bell, LogOut } from 'lucide-react'

export default function CustomerNav() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { 
      name: 'Services', 
      path: '/customer/services', 
      icon: Search,
      active: location.pathname === '/customer/services'
    },
    { 
      name: 'My Bookings', 
      path: '/customer/bookings', 
      icon: Calendar,
      active: location.pathname.includes('/customer/bookings')
    },
    { 
      name: 'Profile', 
      path: '/customer/profile', 
      icon: User,
      active: location.pathname.includes('/customer/profile')
    },
    { 
      name: 'Notifications', 
      path: '/customer/notifications', 
      icon: Bell,
      active: location.pathname.includes('/customer/notifications')
    },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">QS</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Quick Serve
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${item.active 
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-purple-700 hover:to-fuchsia-700' 
                    : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                  }
                `}
              >
                <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: User info and logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'C'}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Customer'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'customer@email.com'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors border border-purple-200"
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