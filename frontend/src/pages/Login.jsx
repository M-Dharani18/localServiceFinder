// import { useState } from 'react'
// import { useLocation, useNavigate, Link } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'

// export default function Login() {
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
//     try {
//       const res = await login(email, password)
//       const from = location.state?.from?.pathname
//       if (from) return navigate(from, { replace: true })
//       // Prefer role-based redirect
//       try {
//         const raw = localStorage.getItem('user')
//         const u = raw ? JSON.parse(raw) : null
//         if (u?.role === 'PROVIDER') return navigate('/provider', { replace: true })
//         if (u?.role === 'CUSTOMER') return navigate('/customer', { replace: true })
//       } catch {}
//       navigate('/', { replace: true })
//     } catch (err) {
//       const server = err?.response?.data
//       const message = typeof server === 'string'
//         ? server
//         : (server?.message || server?.error || err?.message || 'Login failed')
//       setError(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
//         <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>
//         {error && (
//           <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</div>
//         )}
//         <form onSubmit={onSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
//             disabled={loading}
//           >
//             {loading ? 'Signing in...' : 'Sign in'}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           No account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
//         </p>
//       </div>
//     </div>
//   )
// }



// import { useState } from 'react'
// import { useLocation, useNavigate, Link } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'
// import { 
//   Mail,
//   Lock,
//   ArrowRight,
//   ShieldCheck
// } from 'lucide-react'

// // Replace with your actual image path
// const placeholderImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

// export default function Login() {
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
//     try {
//       const res = await login(email, password)
//       const from = location.state?.from?.pathname
//       if (from) return navigate(from, { replace: true })
//       // Prefer role-based redirect
//       try {
//         const raw = localStorage.getItem('user')
//         const u = raw ? JSON.parse(raw) : null
//         if (u?.role === 'PROVIDER') return navigate('/provider', { replace: true })
//         if (u?.role === 'CUSTOMER') return navigate('/customer', { replace: true })
//       } catch {}
//       navigate('/', { replace: true })
//     } catch (err) {
//       const server = err?.response?.data
//       const message = typeof server === 'string'
//         ? server
//         : (server?.message || server?.error || err?.message || 'Login failed')
//       setError(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(10)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 opacity-20 animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.3}s`,
//               animationDuration: `${8 + Math.random() * 5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
//         {/* Left side - Hero Image with Minimal Overlay */}
//         <div className="lg:w-1/2 w-full">
//           <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//             {/* Service Image - More Visible */}
//             <img 
//               src={placeholderImage}
//               alt="Local Service Experts at work"
//               className="w-full h-[600px] object-cover"
//             />
            
//             {/* Subtle gradient overlay at bottom only - for logo visibility */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
//             {/* Minimal content overlay - Only logo and tagline */}
//             <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
//               {/* Logo with semi-transparent background */}
//               <div className="inline-flex items-center gap-3 mb-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg">
//                 <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
//                   <ShieldCheck className="w-6 h-6 text-white" />
//                 </div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                   Quick Serve
//                 </h1>
//               </div>
              
//               {/* Simple tagline */}
//               <div className="max-w-md">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
//                   Find Trusted Local Experts
//                 </h2>
//                 <p className="text-white/90 text-lg drop-shadow-md">
//                   Connect with verified professionals in your neighborhood
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Login Form */}
//         <div className="lg:w-1/2 w-full max-w-md">
//           <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Welcome Back
//               </h2>
//               <p className="text-gray-600">
//                 Sign in to access your account
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
//                 <div className="flex items-center gap-2 text-red-700">
//                   <ShieldCheck className="w-4 h-4" />
//                   <span className="font-medium">{error}</span>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={onSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="you@example.com"
//                   />
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Lock className="w-4 h-4" />
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="password"
//                     className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Enter your password"
//                   />
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                   <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
//                 disabled={loading}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//                 <div className="relative flex items-center justify-center gap-2">
//                   {loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign in to continue
//                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </>
//                   )}
//                 </div>
//               </button>

//               <div className="relative my-6">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   <span className="font-medium text-gray-700">Google</span>
//                 </button>
//                 <button
//                   type="button"
//                   className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
//                   </svg>
//                   <span className="font-medium text-gray-700">Facebook</span>
//                 </button>
//               </div>
//             </form>

//             <p className="mt-8 text-center text-gray-600">
//               Don't have an account?{' '}
//               <Link 
//                 to="/register" 
//                 className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
//               >
//                 Join QucikServe
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }






import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { 
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'

// Replace with your actual image path
const placeholderImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      const from = location.state?.from?.pathname
      if (from) return navigate(from, { replace: true })
      // Prefer role-based redirect
      try {
        const raw = localStorage.getItem('user')
        const u = raw ? JSON.parse(raw) : null
        if (u?.role === 'PROVIDER') return navigate('/provider', { replace: true })
        if (u?.role === 'CUSTOMER') return navigate('/customer/services', { replace: true }) // CHANGED HERE
        if (u?.role === 'ADMIN') return navigate('/admin/dashboard', { replace: true }) // CHANGED HERE
      } catch {}
      navigate('/', { replace: true })
    } catch (err) {
      const server = err?.response?.data
      const message = typeof server === 'string'
        ? server
        : (server?.message || server?.error || err?.message || 'Login failed')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
        {/* Left side - Hero Image with Minimal Overlay */}
        <div className="lg:w-1/2 w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Service Image - More Visible */}
            <img 
              src={placeholderImage}
              alt="Local Service Experts at work"
              className="w-full h-[600px] object-cover"
            />
            
            {/* Subtle gradient overlay at bottom only - for logo visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Minimal content overlay - Only logo and tagline */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              {/* Logo with semi-transparent background */}
              <div className="inline-flex items-center gap-3 mb-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Quick Serve
                </h1>
              </div>
              
              {/* Simple tagline */}
              <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  Find Trusted Local Experts
                </h2>
                <p className="text-white/90 text-lg drop-shadow-md">
                  Connect with verified professionals in your neighborhood
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to access your account
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
                <div className="flex items-center gap-2 text-red-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to continue
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Facebook</span>
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
              >
                Join Quick Serve
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}