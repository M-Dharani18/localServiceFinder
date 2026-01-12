// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '@/context/AuthContext'

// const ROLES = [
//   { label: 'Customer', value: 'CUSTOMER' },
//   { label: 'Service Provider', value: 'PROVIDER' },
// ]

// export default function Register() {
//   const { register } = useAuth()
//   const navigate = useNavigate()
//   // Backend expects: username, email, password, role
//   const [form, setForm] = useState({ username: '', email: '', password: '', role: 'CUSTOMER' })
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setSuccess('')
//     setLoading(true)
//     try {
//       await register(form)
//       setSuccess('Registration successful. Please login.')
//       setTimeout(() => navigate('/login'), 800)
//     } catch (err) {
//       setError(err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Registration failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
//         <h1 className="text-2xl font-semibold mb-6 text-center">Create an account</h1>
//         {error && (
//           <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</div>
//         )}
//         {success && (
//           <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">{success}</div>
//         )}
//         <form onSubmit={onSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username</label>
//             <input
//               name="username"
//               className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               value={form.username}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               value={form.email}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               value={form.password}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Role</label>
//             <select
//               name="role"
//               className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               value={form.role}
//               onChange={onChange}
//             >
//               {ROLES.map((r) => (
//                 <option key={r.value} value={r.value}>{r.label}</option>
//               ))}
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create account'}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
//         </p>
//       </div>
//     </div>
//   )
// }




import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Briefcase,
  Home,
  Sparkles
} from 'lucide-react'

const ROLES = [
  { label: 'Customer', value: 'CUSTOMER', icon: <Home className="w-5 h-5" /> },
  { label: 'Service Provider', value: 'PROVIDER', icon: <Briefcase className="w-5 h-5" /> },
   { label: 'Administrator', value: 'ADMIN', icon: <Shield className="w-5 h-5" /> },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'CUSTOMER' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      await register(form)
      setSuccess('Registration successful!')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Registration Form */}
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Join QuickServe</h2>
                <p className="text-slate-600 mt-1">Create your account in minutes</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-sm text-emerald-700">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    name="username"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Join as a</label>
                <div className="grid grid-cols-2 gap-4">
                  {ROLES.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, role: role.value }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                        form.role === role.value
                          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        form.role === role.value
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {role.icon}
                      </div>
                      <span className="font-semibold text-slate-900">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms & Privacy */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Service Image */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Professional services"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            
              </div>
            </div>
          </div>
        </div>
  )
}