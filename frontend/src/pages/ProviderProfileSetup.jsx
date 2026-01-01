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



import { useEffect, useState } from 'react'
import api from '@/api/axios'
import { useAuth } from '@/context/AuthContext'

export default function ProviderProfileSetup() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    businessName: '',
    phone: '',
    city: '',
    area: '',
    categories: [],
    description: '',
  })
  const [categories] = useState([
    'PLUMBING',
    'TUTORING',
    'CLEANING',
    'ELECTRICAL',
    'CARPENTRY',
  ])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const providerId = user?.id
    if (!providerId) return
    setError('')
    setMessage('')
    ;(async () => {
      try {
        const res = await api.get(`/provider/profile/${providerId}`)
        const data = res?.data
        if (data) {
          setForm({
            businessName: data.businessName || '',
            phone: data.phone || '',
            city: data.city || '',
            area: data.area || '',
            categories: Array.isArray(data.categories) ? data.categories : [],
            description: data.description || '',
          })
        }
      } catch (e) {
        // 404 means not created yet; ignore
      }
    })()
  }, [user?.id])

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)
    try {
      const providerId = user?.id
      if (!providerId) throw new Error('Missing provider id')
      await api.post('/provider/profile', { providerId, ...form })
      setMessage('Profile saved successfully')
    } catch (err) {
      const server = err?.response?.data
      setError(typeof server === 'string' ? server : (server?.message || server?.error || 'Failed to save profile'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Provider Profile Setup
          </h1>
          <p className="text-gray-600">Complete your profile to start offering services</p>
        </div>
        
        {message && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠</span>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
        
        <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
            <input 
              name="businessName" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
              value={form.businessName} 
              onChange={onChange}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input 
                name="phone" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.phone} 
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input 
                name="city" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.city} 
                onChange={onChange}
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
            <label className="block text-sm font-semibold text-gray-700 mb-3">Service Categories</label>
            <div className="flex flex-wrap gap-3">
              {categories.map((c) => (
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
              onClick={(e) => { e.preventDefault(); onSubmit(e); }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}