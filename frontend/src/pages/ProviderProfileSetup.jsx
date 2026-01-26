// import { useEffect, useState } from 'react'
// import api from '@/api/axios'
// import { useAuth } from '@/context/AuthContext'

// // This page is shown to providers after first login to complete their profile
// // Adjust fields to match your backend payload for provider profile and categories
// export default function ProviderProfileSetup() {
//   const { user } = useAuth()
//   const [form, setForm] = useState({
//     businessName: '',
//     phone: '',
//     city: '',
//     area: '',
//     categories: [], // e.g., ['PLUMBING', 'TUTORING']
//     description: '',
//   })
//   const [categories] = useState([
//     'PLUMBING',
//     'TUTORING',
//     'CLEANING',
//     'ELECTRICAL',
//     'CARPENTRY',
//   ])
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   // Load existing profile if any
//   useEffect(() => {
//     const providerId = user?.id
//     if (!providerId) return
//     setError('')
//     setMessage('')
//     ;(async () => {
//       try {
//         const res = await api.get(`/provider/profile/${providerId}`)
//         const data = res?.data
//         if (data) {
//           setForm({
//             businessName: data.businessName || '',
//             phone: data.phone || '',
//             city: data.city || '',
//             area: data.area || '',
//             categories: Array.isArray(data.categories) ? data.categories : [],
//             description: data.description || '',
//           })
//         }
//       } catch (e) {
//         // 404 means not created yet; ignore. Other errors show briefly.
//       }
//     })()
//   }, [user?.id])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onToggleCategory = (value) => {
//     setForm((f) => {
//       const exists = f.categories.includes(value)
//       return {
//         ...f,
//         categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
//       }
//     })
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setMessage('')
//     setError('')
//     setLoading(true)
//     try {
//       const providerId = user?.id
//       if (!providerId) throw new Error('Missing provider id')
//       // Send providerId with payload
//       await api.post('/provider/profile', { providerId, ...form })
//       setMessage('Profile saved successfully')
//     } catch (err) {
//       const server = err?.response?.data
//       setError(typeof server === 'string' ? server : (server?.message || server?.error || 'Failed to save profile'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-2xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Provider Profile Setup</h1>
//         {message && <div className="mb-4 p-2 rounded border border-green-200 bg-green-50 text-green-700">{message}</div>}
//         {error && <div className="mb-4 p-2 rounded border border-red-200 bg-red-50 text-red-700">{error}</div>}
//         <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded border shadow">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Business Name</label>
//             <input name="businessName" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.businessName} onChange={onChange} required />
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <input name="phone" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.phone} onChange={onChange} required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">City</label>
//               <input name="city" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.city} onChange={onChange} required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Area</label>
//               <input name="area" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.area} onChange={onChange} />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Service Categories</label>
//             <div className="flex flex-wrap gap-2">
//               {categories.map((c) => (
//                 <label key={c} className="inline-flex items-center gap-2 px-3 py-2 rounded border bg-gray-50">
//                   <input type="checkbox" checked={form.categories.includes(c)} onChange={() => onToggleCategory(c)} />
//                   <span className="text-sm">{c}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">About your service</label>
//             <textarea name="description" rows={4} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.description} onChange={onChange} />
//           </div>
//           <div className="flex justify-end">
//             <button type="submit" className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60" disabled={loading}>
//               {loading ? 'Saving...' : 'Save Profile'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }


// import { useEffect, useState } from 'react'
// import api from '@/api/axios'
// import { useAuth } from '@/context/AuthContext'

// export default function ProviderProfileSetup() {
//   const { user } = useAuth()
//   const [form, setForm] = useState({
//     businessName: '',
//     phone: '',
//     city: '',
//     area: '',
//     categories: [],
//     description: '',
//   })
//   const [categories] = useState([
//     'PLUMBING',
//     'TUTORING',
//     'CLEANING',
//     'ELECTRICAL',
//     'CARPENTRY',
//   ])
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const providerId = user?.id
//     if (!providerId) return
//     setError('')
//     setMessage('')
//     ;(async () => {
//       try {
//         const res = await api.get(`/provider/profile/${providerId}`)
//         const data = res?.data
//         if (data) {
//           setForm({
//             businessName: data.businessName || '',
//             phone: data.phone || '',
//             city: data.city || '',
//             area: data.area || '',
//             categories: Array.isArray(data.categories) ? data.categories : [],
//             description: data.description || '',
//           })
//         }
//       } catch (e) {
//         // 404 means not created yet; ignore
//       }
//     })()
//   }, [user?.id])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onToggleCategory = (value) => {
//     setForm((f) => {
//       const exists = f.categories.includes(value)
//       return {
//         ...f,
//         categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
//       }
//     })
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setMessage('')
//     setError('')
//     setLoading(true)
//     try {
//       const providerId = user?.id
//       if (!providerId) throw new Error('Missing provider id')
//       await api.post('/provider/profile', { providerId, ...form })
//       setMessage('Profile saved successfully')
//     } catch (err) {
//       const server = err?.response?.data
//       setError(typeof server === 'string' ? server : (server?.message || server?.error || 'Failed to save profile'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       <div className="max-w-3xl mx-auto p-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//             Provider Profile Setup
//           </h1>
//           <p className="text-gray-600">Complete your profile to start offering services</p>
//         </div>
        
//         {message && (
//           <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">✓</span>
//               <span className="font-medium">{message}</span>
//             </div>
//           </div>
//         )}
        
//         {error && (
//           <div className="mb-6 p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">⚠</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           </div>
//         )}
        
//         <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
//             <input 
//               name="businessName" 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//               value={form.businessName} 
//               onChange={onChange} 
//               required 
//             />
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
//               <input 
//                 name="phone" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 value={form.phone} 
//                 onChange={onChange} 
//                 required 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
//               <input 
//                 name="city" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 value={form.city} 
//                 onChange={onChange} 
//                 required 
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
//               <input 
//                 name="area" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 value={form.area} 
//                 onChange={onChange} 
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-3">Service Categories</label>
//             <div className="flex flex-wrap gap-3">
//               {categories.map((c) => (
//                 <label 
//                   key={c} 
//                   className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
//                     form.categories.includes(c)
//                       ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
//                       : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
//                   }`}
//                 >
//                   <input 
//                     type="checkbox" 
//                     checked={form.categories.includes(c)} 
//                     onChange={() => onToggleCategory(c)}
//                     className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                   />
//                   <span className="text-sm font-medium">{c}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">About your service</label>
//             <textarea 
//               name="description" 
//               rows={4} 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none" 
//               value={form.description} 
//               onChange={onChange}
//               placeholder="Tell customers about your services..."
//             />
//           </div>
          
//           <div className="flex justify-end pt-4">
//             <button 
//               type="submit" 
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Save Profile'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }




// import { useEffect, useState } from 'react'
// import api from '@/api/axios'
// import { useAuth } from '@/context/AuthContext'

// export default function ProviderProfileSetup() {
//   const { user } = useAuth()
//   const [form, setForm] = useState({
//     businessName: '',
//     phone: '',
//     city: '',
//     area: '',
//     categories: [],
//     description: '',
//   })
//   const [categories] = useState([
//     'PLUMBING',
//     'TUTORING',
//     'CLEANING',
//     'ELECTRICAL',
//     'CARPENTRY',
//   ])
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const providerId = user?.id
//     if (!providerId) return
//     setError('')
//     setMessage('')
//     ;(async () => {
//       try {
//         const res = await api.get(`/provider/profile/${providerId}`)
//         const data = res?.data
//         if (data) {
//           setForm({
//             businessName: data.businessName || '',
//             phone: data.phone || '',
//             city: data.city || '',
//             area: data.area || '',
//             categories: Array.isArray(data.categories) ? data.categories : [],
//             description: data.description || '',
//           })
//         }
//       } catch (e) {
//         // 404 means not created yet; ignore
//       }
//     })()
//   }, [user?.id])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onToggleCategory = (value) => {
//     setForm((f) => {
//       const exists = f.categories.includes(value)
//       return {
//         ...f,
//         categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
//       }
//     })
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setMessage('')
//     setError('')
//     setLoading(true)
//     try {
//       const providerId = user?.id
//       if (!providerId) throw new Error('Missing provider id')
//       await api.post('/provider/profile', { providerId, ...form })
//       setMessage('Profile saved successfully')
//     } catch (err) {
//       const server = err?.response?.data
//       setError(typeof server === 'string' ? server : (server?.message || server?.error || 'Failed to save profile'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFormSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(e)
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-auto pt-20">
//       <div className="max-w-3xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//             Provider Profile Setup
//           </h1>
//           <p className="text-gray-600">Complete your profile to start offering services</p>
//         </div>
        
//         {message && (
//           <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">✓</span>
//               <span className="font-medium">{message}</span>
//             </div>
//           </div>
//         )}
        
//         {error && (
//           <div className="mb-6 p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">⚠</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           </div>
//         )}
        
//         <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
//             <input 
//               name="businessName" 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//               value={form.businessName} 
//               onChange={onChange}
//             />
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
//               <input 
//                 name="phone" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 value={form.phone} 
//                 onChange={onChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
//               <input 
//                 name="city" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 value={form.city} 
//                 onChange={onChange}
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
//               <input 
//                 name="area" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 value={form.area} 
//                 onChange={onChange} 
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-3">Service Categories</label>
//             <div className="flex flex-wrap gap-3">
//               {categories.map((c) => (
//                 <label 
//                   key={c} 
//                   className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
//                     form.categories.includes(c)
//                       ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
//                       : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
//                   }`}
//                 >
//                   <input 
//                     type="checkbox" 
//                     checked={form.categories.includes(c)} 
//                     onChange={() => onToggleCategory(c)}
//                     className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                   />
//                   <span className="text-sm font-medium">{c}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">About your service</label>
//             <textarea 
//               name="description" 
//               rows={4} 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none" 
//               value={form.description} 
//               onChange={onChange}
//               placeholder="Tell customers about your services..."
//             />
//           </div>
          
//           <div className="flex justify-end pt-4">
//             <button 
//               type="button"
//               onClick={(e) => { e.preventDefault(); onSubmit(e); }}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Save Profile'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// import { useEffect, useState } from 'react'
// import api from '@/api/axios'
// import { useAuth } from '@/context/AuthContext'

// export default function ProviderProfileSetup() {
//   const { user } = useAuth()
//   const [form, setForm] = useState({
//     businessName: '',
//     phone: '',
//     city: '',
//     area: '',
//     categories: [],
//     description: '',
//   })
//   const [categories] = useState([
//     'PLUMBING',
//     'TUTORING',
//     'CLEANING',
//     'ELECTRICAL',
//     'CARPENTRY',
//   ])
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const providerId = user?.id
//     if (!providerId) return
//     setError('')
//     setMessage('')
//     ;(async () => {
//       try {
//         const res = await api.get(`/provider/profile/${providerId}`)
//         const data = res?.data
//         if (data) {
//           setForm({
//             businessName: data.businessName || '',
//             phone: data.phone || '',
//             city: data.city || '',
//             area: data.area || '',
//             categories: Array.isArray(data.categories) ? data.categories : [],
//             description: data.description || '',
//           })
//         }
//       } catch (e) {
//         // 404 means not created yet; ignore
//       }
//     })()
//   }, [user?.id])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onToggleCategory = (value) => {
//     setForm((f) => {
//       const exists = f.categories.includes(value)
//       return {
//         ...f,
//         categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
//       }
//     })
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setMessage('')
//     setError('')
//     setLoading(true)
//     try {
//       const providerId = user?.id
//       if (!providerId) throw new Error('Missing provider id')
//       await api.post('/provider/profile', { providerId, ...form })
//       setMessage('Profile saved successfully')
//     } catch (err) {
//       const server = err?.response?.data
//       setError(typeof server === 'string' ? server : (server?.message || server?.error || 'Failed to save profile'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
//       <div className="max-w-3xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
//             Provider Profile Setup
//           </h1>
//           <p className="text-gray-600">Complete your profile to start offering services</p>
//         </div>
        
//         {message && (
//           <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">✓</span>
//               <span className="font-medium">{message}</span>
//             </div>
//           </div>
//         )}
        
//         {error && (
//           <div className="mb-6 p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">⚠</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           </div>
//         )}
        
//         <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
//             <input 
//               name="businessName" 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//               value={form.businessName} 
//               onChange={onChange}
//             />
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
//               <input 
//                 name="phone" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 value={form.phone} 
//                 onChange={onChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
//               <input 
//                 name="city" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 value={form.city} 
//                 onChange={onChange}
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
//               <input 
//                 name="area" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 value={form.area} 
//                 onChange={onChange} 
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-3">Service Categories</label>
//             <div className="flex flex-wrap gap-3">
//               {categories.map((c) => (
//                 <label 
//                   key={c} 
//                   className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
//                     form.categories.includes(c)
//                       ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700'
//                       : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
//                   }`}
//                 >
//                   <input 
//                     type="checkbox" 
//                     checked={form.categories.includes(c)} 
//                     onChange={() => onToggleCategory(c)}
//                     className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
//                   />
//                   <span className="text-sm font-medium">{c}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">About your service</label>
//             <textarea 
//               name="description" 
//               rows={4} 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none resize-none" 
//               value={form.description} 
//               onChange={onChange}
//               placeholder="Tell customers about your services..."
//             />
//           </div>
          
//           <div className="flex justify-end pt-4">
//             <button 
//               type="button"
//               onClick={(e) => { e.preventDefault(); onSubmit(e); }}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Save Profile'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useEffect, useState } from 'react'
// import api from '@/api/axios'
// import { useAuth } from '@/context/AuthContext'

// // Toast Component
// const Toast = ({ message, type = 'success', onClose }) => {
//   const [isVisible, setIsVisible] = useState(true)

//   // Only show toast if there's a valid message
//   if (!message || message.trim() === '') {
//     return null
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false)
//       setTimeout(onClose, 300) // Wait for fade out animation
//     }, 3000) // Auto-close after 3 seconds

//     return () => clearTimeout(timer)
//   }, [onClose])

//   const bgColors = {
//     success: 'bg-gradient-to-r from-emerald-500 to-green-500',
//     error: 'bg-gradient-to-r from-red-500 to-rose-500'
//   }

//   const icons = {
//     success: '✓',
//     error: '⚠'
//   }

//   return (
//     <div className={`fixed top-24 right-6 z-50 transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
//       <div className={`${bgColors[type]} text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 min-w-[300px] max-w-md`}>
//         <span className="text-xl font-bold">{icons[type]}</span>
//         <span className="font-medium flex-1">{message}</span>
//         <button 
//           onClick={() => {
//             setIsVisible(false)
//             setTimeout(onClose, 300)
//           }}
//           className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   )
// }

// export default function ProviderProfileSetup() {
//   const { user } = useAuth()
//   const [form, setForm] = useState({
//     businessName: '',
//     phone: '',
//     city: '',
//     area: '',
//     categories: [],
//     description: '',
//   })
//   const [predefinedCategories] = useState([
//     'PLUMBING',
//     'TUTORING',
//     'CLEANING',
//     'ELECTRICAL',
//     'CARPENTRY',
//   ])
//   const [customCategories, setCustomCategories] = useState([])
//   const [newCategory, setNewCategory] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [toast, setToast] = useState(null)

//   useEffect(() => {
//     const providerId = user?.id
//     if (!providerId) return
//     ;(async () => {
//       try {
//         const res = await api.get(`/provider/profile/${providerId}`)
//         const data = res?.data
//         if (data) {
//           // Separate predefined and custom categories
//           const allCategories = Array.isArray(data.categories) ? data.categories : []
//           const predefined = allCategories.filter(cat => predefinedCategories.includes(cat))
//           const custom = allCategories.filter(cat => !predefinedCategories.includes(cat))
          
//           setForm({
//             businessName: data.businessName || '',
//             phone: data.phone || '',
//             city: data.city || '',
//             area: data.area || '',
//             categories: allCategories,
//             description: data.description || '',
//           })
//           setCustomCategories(custom)
//         }
//       } catch (e) {
//         // 404 means not created yet; ignore
//       }
//     })()
//   }, [user?.id, predefinedCategories])

//   const showToast = (message, type = 'success') => {
//     // Validate message before setting toast
//     if (!message || typeof message !== 'string' || message.trim() === '') {
//       console.error('Invalid toast message:', message)
//       return
//     }
//     setToast({ message: message.trim(), type, id: Date.now() })
//   }

//   const closeToast = () => {
//     setToast(null)
//   }

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onToggleCategory = (value) => {
//     setForm((f) => {
//       const exists = f.categories.includes(value)
//       return {
//         ...f,
//         categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
//       }
//     })
//   }

//   const addCustomCategory = () => {
//     const trimmed = newCategory.trim().toUpperCase()
//     if (!trimmed) return
    
//     // Don't add duplicates
//     if (form.categories.includes(trimmed) || customCategories.includes(trimmed)) {
//       showToast('This category already exists', 'error')
//       return
//     }
    
//     setCustomCategories(prev => [...prev, trimmed])
//     setForm(f => ({
//       ...f,
//       categories: [...f.categories, trimmed]
//     }))
//     setNewCategory('')
//   }

//   const removeCustomCategory = (category) => {
//     setCustomCategories(prev => prev.filter(c => c !== category))
//     setForm(f => ({
//       ...f,
//       categories: f.categories.filter(c => c !== category)
//     }))
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       addCustomCategory()
//     }
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const providerId = user?.id
//       if (!providerId) {
//         showToast('User not authenticated. Please login again.', 'error')
//         return
//       }
      
//       // Validate required fields
//       if (!form.businessName.trim()) {
//         showToast('Business name is required', 'error')
//         return
//       }
      
//       if (!form.phone.trim()) {
//         showToast('Phone number is required', 'error')
//         return
//       }
      
//       if (!form.city.trim()) {
//         showToast('City is required', 'error')
//         return
//       }
      
//       if (form.categories.length === 0) {
//         showToast('Please select at least one service category', 'error')
//         return
//       }
      
//       const response = await api.post('/provider/profile', { 
//         providerId, 
//         ...form 
//       })
      
//       if (response.status === 200 || response.status === 201) {
//         showToast('Profile saved successfully!')
//       } else {
//         showToast('Failed to save profile. Please try again.', 'error')
//       }
      
//     } catch (err) {
//       console.error('Save profile error:', err)
      
//       // Handle different error types
//       let errorMessage = 'Failed to save profile. Please try again.'
      
//       if (err.response) {
//         // Server responded with error
//         const server = err.response.data
//         if (typeof server === 'string') {
//           errorMessage = server
//         } else if (server?.message) {
//           errorMessage = server.message
//         } else if (server?.error) {
//           errorMessage = server.error
//         }
//       } else if (err.request) {
//         // Request made but no response
//         errorMessage = 'Network error. Please check your connection.'
//       } else if (err.message) {
//         // Other errors
//         errorMessage = err.message
//       }
      
//       showToast(errorMessage, 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
//       {/* Toast Notification - Only render if toast exists and has message */}
//       {toast && toast.message && (
//         <Toast 
//           message={toast.message} 
//           type={toast.type} 
//           onClose={closeToast}
//         />
//       )}
      
//       <div className="max-w-3xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
//             Provider Profile Setup
//           </h1>
//           <p className="text-gray-600">Complete your profile to start offering services</p>
//         </div>
        
//         <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
//             <input 
//               name="businessName" 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//               value={form.businessName} 
//               onChange={onChange}
//               required
//             />
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
//               <input 
//                 name="phone" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 value={form.phone} 
//                 onChange={onChange}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
//               <input 
//                 name="city" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 value={form.city} 
//                 onChange={onChange}
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
//               <input 
//                 name="area" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 value={form.area} 
//                 onChange={onChange} 
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-3">Service Categories *</label>
            
//             {/* Predefined Categories */}
//             <div className="mb-4">
//               <p className="text-sm font-medium text-gray-600 mb-2">Common Categories</p>
//               <div className="flex flex-wrap gap-3">
//                 {predefinedCategories.map((c) => (
//                   <label 
//                     key={c} 
//                     className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
//                       form.categories.includes(c)
//                         ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700'
//                         : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
//                     }`}
//                   >
//                     <input 
//                       type="checkbox" 
//                       checked={form.categories.includes(c)} 
//                       onChange={() => onToggleCategory(c)}
//                       className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
//                     />
//                     <span className="text-sm font-medium">{c}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
            
//             {/* Custom Categories Section */}
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-2">Add Your Own Categories</p>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Enter custom category (e.g., GARDENING)"
//                     className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={addCustomCategory}
//                     className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
              
//               {/* Display Custom Categories */}
//               {customCategories.length > 0 && (
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-2">Your Custom Categories</p>
//                   <div className="flex flex-wrap gap-3">
//                     {customCategories.map((c) => (
//                       <div 
//                         key={c}
//                         className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
//                           form.categories.includes(c)
//                             ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
//                             : 'border-gray-200 bg-white text-gray-700'
//                         }`}
//                       >
//                         <input 
//                           type="checkbox" 
//                           checked={form.categories.includes(c)} 
//                           onChange={() => onToggleCategory(c)}
//                           className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                         />
//                         <span className="text-sm font-medium">{c}</span>
//                         <button
//                           type="button"
//                           onClick={() => removeCustomCategory(c)}
//                           className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
//                           title="Remove category"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">About your service</label>
//             <textarea 
//               name="description" 
//               rows={4} 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none resize-none" 
//               value={form.description} 
//               onChange={onChange}
//               placeholder="Tell customers about your services..."
//             />
//           </div>
          
//           <div className="flex justify-end pt-4">
//             <button 
//               type="button"
//               onClick={onSubmit}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Save Profile'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import { useEffect, useState } from 'react'
import api from '@/api/axios'
import { getProviderAnalyticsApi } from '@/api/providers'
import { useAuth } from '@/context/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'

// Toast Component
const Toast = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!message || message.trim() === '') {
    return null
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColors = {
    success: 'bg-gradient-to-r from-emerald-500 to-green-500',
    error: 'bg-gradient-to-r from-red-500 to-rose-500'
  }

  const icons = {
    success: '✓',
    error: '⚠'
  }

  return (
    <div className={`fixed top-24 right-6 z-50 transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 min-w-[300px] max-w-md`}>
        <span className="text-xl font-bold">{icons[type]}</span>
        <span className="font-medium flex-1">{message}</span>
        <button 
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default function ProviderProfileSetup() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile') // 'profile' or 'analytics'
  const [form, setForm] = useState({
    businessName: '',
    phone: '',
    city: '',
    area: '',
    categories: [],
    description: '',
  })
  const [predefinedCategories] = useState([
    'PLUMBING',
    'TUTORING',
    'CLEANING',
    'ELECTRICAL',
    'CARPENTRY',
  ])
  const [customCategories, setCustomCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0,
    monthlyBookings: [],
    categoryBreakdown: [],
    recentBookings: []
  })
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  useEffect(() => {
    const providerId = user?.id
    if (!providerId) return
    ;(async () => {
      try {
        const res = await api.get(`/provider/profile/${providerId}`)
        const data = res?.data
        if (data) {
          const allCategories = Array.isArray(data.categories) ? data.categories : []
          const predefined = allCategories.filter(cat => predefinedCategories.includes(cat))
          const custom = allCategories.filter(cat => !predefinedCategories.includes(cat))
          
          setForm({
            businessName: data.businessName || '',
            phone: data.phone || '',
            city: data.city || '',
            area: data.area || '',
            categories: allCategories,
            description: data.description || '',
          })
          setCustomCategories(custom)
        }
      } catch (e) {
        // 404 means not created yet; ignore
      }
    })()
  }, [user?.id, predefinedCategories])

  // Fetch Analytics Data
  const fetchAnalytics = async () => {
    const providerId = user?.id
    console.log('Fetching analytics for provider ID:', providerId)
    console.log('User object:', user)
    if (!providerId) {
      console.error('No provider ID found!')
      return}
    
    setAnalyticsLoading(true)
    try {
      const data = await getProviderAnalyticsApi(providerId)
      if (data) {
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      showToast('Failed to load analytics data', 'error')
    } finally {
      setAnalyticsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchAnalytics()
    }
  }, [activeTab, user?.id])

  const showToast = (message, type = 'success') => {
    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.error('Invalid toast message:', message)
      return
    }
    setToast({ message: message.trim(), type, id: Date.now() })
  }

  const closeToast = () => {
    setToast(null)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onToggleCategory = (value) => {
    setForm((f) => {
      const exists = f.categories.includes(value)
      return {
        ...f,
        categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
      }
    })
  }

  const addCustomCategory = () => {
    const trimmed = newCategory.trim().toUpperCase()
    if (!trimmed) return
    
    if (form.categories.includes(trimmed) || customCategories.includes(trimmed)) {
      showToast('This category already exists', 'error')
      return
    }
    
    setCustomCategories(prev => [...prev, trimmed])
    setForm(f => ({
      ...f,
      categories: [...f.categories, trimmed]
    }))
    setNewCategory('')
  }

  const removeCustomCategory = (category) => {
    setCustomCategories(prev => prev.filter(c => c !== category))
    setForm(f => ({
      ...f,
      categories: f.categories.filter(c => c !== category)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomCategory()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const providerId = user?.id
      if (!providerId) {
        showToast('User not authenticated. Please login again.', 'error')
        return
      }
      
      if (!form.businessName.trim()) {
        showToast('Business name is required', 'error')
        return
      }
      
      if (!form.phone.trim()) {
        showToast('Phone number is required', 'error')
        return
      }
      
      if (!form.city.trim()) {
        showToast('City is required', 'error')
        return
      }
      
      if (form.categories.length === 0) {
        showToast('Please select at least one service category', 'error')
        return
      }
      
      const response = await api.post('/provider/profile', { 
        providerId, 
        ...form 
      })
      
      if (response.status === 200 || response.status === 201) {
        showToast('Profile saved successfully!')
      } else {
        showToast('Failed to save profile. Please try again.', 'error')
      }
      
    } catch (err) {
      console.error('Save profile error:', err)
      
      let errorMessage = 'Failed to save profile. Please try again.'
      
      if (err.response) {
        const server = err.response.data
        if (typeof server === 'string') {
          errorMessage = server
        } else if (server?.message) {
          errorMessage = server.message
        } else if (server?.error) {
          errorMessage = server.error
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
      {toast && toast.message && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast}
        />
      )}
      
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Provider Dashboard
          </h1>
          <p className="text-gray-600">Manage your profile and view analytics</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-300'
            }`}
          >
            📝 Profile Setup
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-300'
            }`}
          >
            📊 Analytics
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
              <input 
                name="businessName" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.businessName} 
                onChange={onChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                <input 
                  name="phone" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                  value={form.phone} 
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <input 
                  name="city" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                  value={form.city} 
                  onChange={onChange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
                <input 
                  name="area" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                  value={form.area} 
                  onChange={onChange} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Service Categories *</label>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Common Categories</p>
                <div className="flex flex-wrap gap-3">
                  {predefinedCategories.map((c) => (
                    <label 
                      key={c} 
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                        form.categories.includes(c)
                          ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={form.categories.includes(c)} 
                        onChange={() => onToggleCategory(c)}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Add Your Own Categories</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter custom category (e.g., GARDENING)"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCustomCategory}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {customCategories.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Your Custom Categories</p>
                    <div className="flex flex-wrap gap-3">
                      {customCategories.map((c) => (
                        <div 
                          key={c}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                            form.categories.includes(c)
                              ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
                              : 'border-gray-200 bg-white text-gray-700'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={form.categories.includes(c)} 
                            onChange={() => onToggleCategory(c)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-medium">{c}</span>
                          <button
                            type="button"
                            onClick={() => removeCustomCategory(c)}
                            className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove category"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">About your service</label>
              <textarea 
                name="description" 
                rows={4} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none resize-none" 
                value={form.description} 
                onChange={onChange}
                placeholder="Tell customers about your services..."
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="button"
                onClick={onSubmit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {analyticsLoading ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="inline-block w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading analytics...</p>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">📊</div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">{analytics.totalBookings}</div>
                        <div className="text-sm text-gray-600">Total Bookings</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">✅</div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-emerald-600">{analytics.completedBookings}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">💰</div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">₹{analytics.totalRevenue?.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Revenue</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">⭐</div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-600">
                          {analytics.averageRating ? analytics.averageRating.toFixed(1) : '0.0'}
                        </div>
                        <div className="text-sm text-gray-600">{analytics.totalReviews} Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                    <div className="text-sm text-yellow-700 font-medium mb-1">Pending</div>
                    <div className="text-2xl font-bold text-yellow-800">{analytics.pendingBookings}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-sm text-blue-700 font-medium mb-1">Confirmed</div>
                    <div className="text-2xl font-bold text-blue-800">{analytics.confirmedBookings}</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                    <div className="text-sm text-emerald-700 font-medium mb-1">Completed</div>
                    <div className="text-2xl font-bold text-emerald-800">{analytics.completedBookings}</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200">
                    <div className="text-sm text-red-700 font-medium mb-1">Cancelled</div>
                    <div className="text-2xl font-bold text-red-800">{analytics.cancelledBookings}</div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Bookings Chart */}
                  {analytics.monthlyBookings && analytics.monthlyBookings.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Bookings Trend</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.monthlyBookings}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Category Breakdown Chart */}
                  {analytics.categoryBreakdown && analytics.categoryBreakdown.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Bookings by Category</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={analytics.categoryBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({category, count}) => `${category}: ${count}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {analytics.categoryBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Recent Bookings Table */}
                {analytics.recentBookings && analytics.recentBookings.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.recentBookings.map((booking, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm text-gray-800">{booking.customerName}</td>
                              <td className="py-3 px-4 text-sm text-gray-800">{booking.serviceName}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {new Date(booking.bookingDateTime).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  booking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                                  booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                                  booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm font-semibold text-gray-800 text-right">
                                ₹{booking.price?.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}