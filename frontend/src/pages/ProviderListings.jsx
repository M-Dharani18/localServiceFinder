// import { useEffect, useMemo, useState } from 'react'
// import {
//   createListingApi,
//   updateListingApi,
//   deleteListingApi,
//   toggleAvailabilityApi,
//   getProviderListingsApi,
// } from '@/api/listings'
// import { useAuth } from '@/context/AuthContext'
// import ListingCard from '@/components/ListingCard'

// const emptyForm = {
//   serviceName: '',
//   description: '',
//   price: '',
//   location: '',
//   category: '',
//   imageUrl: '',
//   isAvailable: true,
// }

// export default function ProviderListings() {
//   const { user } = useAuth()
//   const providerId = user?.id
//   const [listings, setListings] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [form, setForm] = useState(emptyForm)
//   const [saving, setSaving] = useState(false)
//   const [editingId, setEditingId] = useState(null)

//   const canSubmit = useMemo(() => form.serviceName && form.price && form.location && form.category, [form])

//   const load = async () => {
//     if (!providerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getProviderListingsApi(providerId)
//       setListings(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load listings')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [providerId])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     if (!providerId) return
//     setSaving(true)
//     setError('')
//     try {
//       const payload = {
//         ...form,
//         price: form.price ? Number(form.price) : 0,
//         isAvailable: form.isAvailable ?? true,
//       }
//       if (editingId) {
//         await updateListingApi(editingId, payload)
//       } else {
//         await createListingApi(providerId, payload)
//       }
//       setForm(emptyForm)
//       setEditingId(null)
//       await load()
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to save listing')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const onEdit = (l) => {
//     setEditingId(l.id)
//     setForm({
//       serviceName: l.serviceName || '',
//       description: l.description || '',
//       price: l.price ?? '',
//       location: l.location || '',
//       category: l.category || '',
//       imageUrl: l.imageUrl || '',
//       isAvailable: !!l.isAvailable,
//     })
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const onDelete = async (id) => {
//     if (!confirm('Delete this listing?')) return
//     try {
//       await deleteListingApi(id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Delete failed')
//     }
//   }

//   const onToggle = async (l) => {
//     try {
//       await toggleAvailabilityApi(l.id, !l.isAvailable)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Failed to toggle availability')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Manage Service Listings</h1>

//         {/* Create / Edit form */}
//         <form onSubmit={onSubmit} className="bg-white border rounded shadow p-4 space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Service Name</label>
//               <input name="serviceName" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.serviceName} onChange={onChange} required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Category</label>
//               <input name="category" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.category} onChange={onChange} placeholder="e.g., PLUMBING" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Location</label>
//               <input name="location" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.location} onChange={onChange} required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Price</label>
//               <input name="price" type="number" step="0.01" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.price} onChange={onChange} required />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.description} onChange={onChange} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
//             <input name="imageUrl" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.imageUrl} onChange={onChange} />
//           </div>
//           <div className="flex justify-end gap-2">
//             {editingId && (
//               <button type="button" className="px-4 py-2 rounded border" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel</button>
//             )}
//             <button type="submit" disabled={!canSubmit || saving} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
//               {saving ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Listing' : 'Create Listing')}
//             </button>
//           </div>
//           {error && <div className="text-sm text-red-600">{error}</div>}
//         </form>

//         <div className="mt-6">
//           <h2 className="text-lg font-semibold mb-3">Your Listings</h2>
//           {loading ? (
//             <div>Loading...</div>
//           ) : listings.length === 0 ? (
//             <div className="text-gray-600">No listings yet.</div>
//           ) : (
//             <div className="space-y-3">
//               {listings.map((l) => (
//                 <ListingCard
//                   key={l.id}
//                   listing={l}
//                   action={
//                     <button onClick={() => onToggle(l)} className="px-3 py-1 rounded border">
//                       {l.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
//                     </button>
//                   }
//                   secondaryAction={
//                     <div className="flex gap-2">
//                       <button onClick={() => onEdit(l)} className="px-3 py-1 rounded border">Edit</button>
//                       <button onClick={() => onDelete(l.id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
//                     </div>
//                   }
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useEffect, useMemo, useState } from 'react'
// import {
//   createListingApi,
//   updateListingApi,
//   deleteListingApi,
//   toggleAvailabilityApi,
//   getProviderListingsApi,
// } from '@/api/listings'
// import { useAuth } from '@/context/AuthContext'
// import ListingCard from '@/components/ListingCard'

// const emptyForm = {
//   serviceName: '',
//   description: '',
//   price: '',
//   location: '',
//   category: '',
//   imageUrl: '',
//   isAvailable: true,
// }

// export default function ProviderListings() {
//   const { user } = useAuth()
//   const providerId = user?.id
//   const [listings, setListings] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [form, setForm] = useState(emptyForm)
//   const [saving, setSaving] = useState(false)
//   const [editingId, setEditingId] = useState(null)

//   const canSubmit = useMemo(() => form.serviceName && form.price && form.location && form.category, [form])

//   const load = async () => {
//     if (!providerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getProviderListingsApi(providerId)
//       setListings(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load listings')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [providerId])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     if (!providerId) return
//     setSaving(true)
//     setError('')
//     try {
//       const payload = {
//         ...form,
//         price: form.price ? Number(form.price) : 0,
//         isAvailable: form.isAvailable ?? true,
//       }
//       if (editingId) {
//         await updateListingApi(editingId, payload)
//       } else {
//         await createListingApi(providerId, payload)
//       }
//       setForm(emptyForm)
//       setEditingId(null)
//       await load()
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to save listing')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const onEdit = (l) => {
//     setEditingId(l.id)
//     setForm({
//       serviceName: l.serviceName || '',
//       description: l.description || '',
//       price: l.price ?? '',
//       location: l.location || '',
//       category: l.category || '',
//       imageUrl: l.imageUrl || '',
//       isAvailable: !!l.isAvailable,
//     })
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const onDelete = async (id) => {
//     if (!confirm('Delete this listing?')) return
//     try {
//       await deleteListingApi(id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Delete failed')
//     }
//   }

//   const onToggle = async (l) => {
//     try {
//       await toggleAvailabilityApi(l.id, !l.isAvailable)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Failed to toggle availability')
//     }
//   }

//   const handleFormSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(e)
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
//       <div className="max-w-6xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
//             Manage Service Listings
//           </h1>
//           <p className="text-gray-600">Create and manage your service offerings</p>
//         </div>

//         {/* Create / Edit form */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">
//             {editingId ? '✏️ Edit Listing' : '➕ Create New Listing'}
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
//               <input 
//                 name="serviceName" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//                 value={form.serviceName} 
//                 onChange={onChange} 
//                 placeholder="e.g., Home Plumbing Service"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//               <input 
//                 name="category" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//                 value={form.category} 
//                 onChange={onChange} 
//                 placeholder="e.g., PLUMBING"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <input 
//                 name="location" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//                 value={form.location} 
//                 onChange={onChange}
//                 placeholder="e.g., New York, NY"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
//               <input 
//                 name="price" 
//                 type="number" 
//                 step="0.01" 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//                 value={form.price} 
//                 onChange={onChange}
//                 placeholder="0.00"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
//             <textarea 
//               name="description" 
//               rows={3} 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none" 
//               value={form.description} 
//               onChange={onChange}
//               placeholder="Describe your service..."
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (optional)</label>
//             <input 
//               name="imageUrl" 
//               className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//               value={form.imageUrl} 
//               onChange={onChange}
//               placeholder="https://example.com/image.jpg"
//             />
//           </div>
          
//           <div className="flex justify-end gap-3 pt-4">
//             {editingId && (
//               <button 
//                 type="button" 
//                 className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all" 
//                 onClick={() => { setEditingId(null); setForm(emptyForm) }}
//               >
//                 Cancel
//               </button>
//             )}
//             <button 
//               type="button"
//               disabled={!canSubmit || saving} 
//               onClick={(e) => { e.preventDefault(); onSubmit(e); }}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
//             >
//               {saving ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Listing' : 'Create Listing')}
//             </button>
//           </div>
          
//           {error && (
//             <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//               <span className="font-medium">{error}</span>
//             </div>
//           )}
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-5">📋 Your Listings</h2>
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading listings...</p>
//             </div>
//           ) : listings.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//               <div className="text-5xl mb-4">📭</div>
//               <p className="text-gray-600 text-lg">No listings yet. Create your first one above!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {listings.map((l) => (
//                 <ListingCard
//                   key={l.id}
//                   listing={l}
//                   action={
//                     <button 
//                       onClick={() => onToggle(l)} 
//                       className={`px-4 py-2 rounded-xl font-semibold transition-all ${
//                         l.isAvailable 
//                           ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600' 
//                           : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
//                       }`}
//                     >
//                       {l.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
//                     </button>
//                   }
//                   secondaryAction={
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => onEdit(l)} 
//                         className="px-4 py-2 rounded-xl border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition-all"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => onDelete(l.id)} 
//                         className="px-4 py-2 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   }
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


import { useEffect, useMemo, useState } from 'react'
import {
  createListingApi,
  updateListingApi,
  deleteListingApi,
  toggleAvailabilityApi,
  getProviderListingsApi,
} from '@/api/listings'
import { useAuth } from '@/context/AuthContext'
import ListingCard from '@/components/ListingCard'

const emptyForm = {
  serviceName: '',
  description: '',
  price: '',
  location: '',
  category: '',
  imageUrl: '',
  isAvailable: true,
}

export default function ProviderListings() {
  const { user } = useAuth()
  const providerId = user?.id
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const canSubmit = useMemo(() => form.serviceName && form.price && form.location && form.category, [form])

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const data = await getProviderListingsApi(providerId)
      setListings(data || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [providerId])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!providerId) return
    setSaving(true)
    setError('')
    try {
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : 0,
        isAvailable: form.isAvailable ?? true,
      }
      if (editingId) {
        await updateListingApi(editingId, payload)
      } else {
        await createListingApi(providerId, payload)
      }
      setForm(emptyForm)
      setEditingId(null)
      await load()
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to save listing')
    } finally {
      setSaving(false)
    }
  }

  const onEdit = (l) => {
    setEditingId(l.id)
    setForm({
      serviceName: l.serviceName || '',
      description: l.description || '',
      price: l.price ?? '',
      location: l.location || '',
      category: l.category || '',
      imageUrl: l.imageUrl || '',
      isAvailable: !!l.isAvailable,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  

  const onToggle = async (l) => {
    try {
      await toggleAvailabilityApi(l.id, !l.isAvailable)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to toggle availability')
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Manage Service Listings
          </h1>
          <p className="text-gray-600">Create and manage your service offerings</p>
        </div>

        {/* Create / Edit form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? '✏️ Edit Listing' : '➕ Create New Listing'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
              <input 
                name="serviceName" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.serviceName} 
                onChange={onChange} 
                placeholder="e.g., Home Plumbing Service"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input 
                name="category" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.category} 
                onChange={onChange} 
                placeholder="e.g., PLUMBING"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input 
                name="location" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.location} 
                onChange={onChange}
                placeholder="e.g., New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rs)</label>
              <input 
                name="price" 
                type="number" 
                step="0.01" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
                value={form.price} 
                onChange={onChange}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              name="description" 
              rows={3} 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none resize-none" 
              value={form.description} 
              onChange={onChange}
              placeholder="Describe your service..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (optional)</label>
            <input 
              name="imageUrl" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
              value={form.imageUrl} 
              onChange={onChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            {editingId && (
              <button 
                type="button" 
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all" 
                onClick={() => { setEditingId(null); setForm(emptyForm) }}
              >
                Cancel
              </button>
            )}
            <button 
              type="button"
              disabled={!canSubmit || saving} 
              onClick={(e) => { e.preventDefault(); onSubmit(e); }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {saving ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Listing' : 'Create Listing')}
            </button>
          </div>
          
          {error && (
            <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
              <span className="font-medium">{error}</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-5">📋 Your Listings</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">No listings yet. Create your first one above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {listings.map((l) => (
                <div key={l.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {l.serviceName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          l.isAvailable 
                            ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200' 
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
                        }`}>
                          {l.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      
                      {l.description && (
                        <p className="text-gray-600 mb-3">{l.description}</p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold"> Price:</span>
                          <span className="text-lg font-bold text-emerald-600">₹{l.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold"> Category:</span>
                          <span>{l.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">📍 Location:</span>
                          <span>{l.location}</span>
                        </div>
                      </div>
                      
                      {l.imageUrl && (
                        <div className="mt-3">
                          <img src={l.imageUrl} alt={l.serviceName} className="h-32 w-auto rounded-lg object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                 <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
  <button 
    onClick={() => onToggle(l)} 
    className={`min-w-[180px] px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all ${
      l.isAvailable 
        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600' 
        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
    }`}
  >
    {l.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
  </button>
  <button 
    onClick={() => onEdit(l)} 
    className="min-w-[180px] px-6 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-50 transition-all"
  >
    Edit
  </button>
</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}