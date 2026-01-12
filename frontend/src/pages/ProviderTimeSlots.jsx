// import { useEffect, useMemo, useState } from 'react'
// import { useAuth } from '@/context/AuthContext'
// import { getProviderListingsApi } from '@/api/listings'
// import {
//   createTimeSlotApi,
//   getProviderTimeSlotsApi,
//   markSlotAvailableApi,
//   markSlotUnavailableApi,
//   deleteTimeSlotApi,
// } from '@/api/timeslots'
// import { format } from 'date-fns'

// export default function ProviderTimeSlots() {
//   const { user } = useAuth()
//   const providerId = user?.id

//   const [listings, setListings] = useState([])
//   const [slots, setSlots] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [form, setForm] = useState({ listingId: '', date: '', start: '', end: '' })
//   const [creating, setCreating] = useState(false)

//   const load = async () => {
//     if (!providerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const [provListings, provSlots] = await Promise.all([
//         getProviderListingsApi(providerId),
//         getProviderTimeSlotsApi(providerId),
//       ])
//       setListings(provListings || [])
//       setSlots(provSlots || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load time slots')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [providerId])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onCreate = async (e) => {
//     e.preventDefault()
//     if (!form.listingId || !form.date || !form.start || !form.end) return
//     setCreating(true)
//     try {
//       const startIso = new Date(`${form.date}T${form.start}:00`).toISOString()
//       const endIso = new Date(`${form.date}T${form.end}:00`).toISOString()
//       await createTimeSlotApi({
//         providerId,
//         listingId: Number(form.listingId),
//         startTime: startIso,
//         endTime: endIso,
//       })
//       setForm({ listingId: '', date: '', start: '', end: '' })
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || e?.response?.data?.error || 'Failed to create slot')
//     } finally {
//       setCreating(false)
//     }
//   }

//   const toggleAvail = async (slot) => {
//     try {
//       if (slot.isAvailable) await markSlotUnavailableApi(slot.id)
//       else await markSlotAvailableApi(slot.id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Failed to update slot')
//     }
//   }

//   const onDelete = async (slot) => {
//     if (!confirm('Delete this time slot?')) return
//     try {
//       await deleteTimeSlotApi(slot.id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data || 'Failed to delete slot')
//     }
//   }

//   const listingsById = useMemo(() => Object.fromEntries((listings || []).map(l => [l.id, l])), [listings])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Manage Availability</h1>

//         {/* Create slot */}
//         <form onSubmit={onCreate} className="bg-white border rounded shadow p-4 mb-6 grid gap-4">
//           <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Listing</label>
//               <select name="listingId" value={form.listingId} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required>
//                 <option value="">Select</option>
//                 {listings.map(l => (
//                   <option key={l.id} value={l.id}>{l.serviceName || `Listing #${l.id}`}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Date</label>
//               <input type="date" name="date" value={form.date} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Start</label>
//               <input type="time" name="start" value={form.start} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">End</label>
//               <input type="time" name="end" value={form.end} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <button disabled={creating} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">{creating ? 'Creating...' : 'Create Slot'}</button>
//           </div>
//         </form>

//         {/* List slots */}
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className="text-red-600">{error}</div>
//         ) : slots.length === 0 ? (
//           <div className="text-gray-600">No time slots yet. Create your first availability above.</div>
//         ) : (
//           <div className="space-y-3">
//             {slots
//               .slice()
//               .sort((a,b) => new Date(a.startTime) - new Date(b.startTime))
//               .map((s) => (
//               <div key={s.id} className="bg-white border rounded p-4 flex items-center justify-between">
//                 <div>
//                   <div className="font-medium">{listingsById[s.listingId]?.serviceName || s.serviceName || `Listing #${s.listingId}`}</div>
//                   <div className="text-sm text-gray-700">{format(new Date(s.startTime), 'EEE, dd MMM yyyy - hh:mm a')} to {format(new Date(s.endTime), 'hh:mm a')}</div>
//                   <div className="text-xs text-gray-600">Slot #{s.id}</div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className={`px-2 py-1 rounded border bg-gray-50 text-sm`}>{s.isAvailable ? 'Available' : 'Unavailable'}</span>
//                   <button className="px-3 py-1 rounded border" onClick={() => toggleAvail(s)}>{s.isAvailable ? 'Mark Unavailable' : 'Mark Available'}</button>
//                   <button className="px-3 py-1 rounded border text-red-600" onClick={() => onDelete(s)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



// import { useEffect, useMemo, useState } from 'react'
// import { useAuth } from '@/context/AuthContext'
// import { getProviderListingsApi } from '@/api/listings'
// import {
//   createTimeSlotApi,
//   getProviderTimeSlotsApi,
//   markSlotAvailableApi,
//   markSlotUnavailableApi,
//   deleteTimeSlotApi,
// } from '@/api/timeslots'
// import { format } from 'date-fns'

// export default function ProviderTimeSlots() {
//   const { user } = useAuth()
//   const providerId = user?.id

//   const [listings, setListings] = useState([])
//   const [slots, setSlots] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [form, setForm] = useState({ listingId: '', date: '', start: '', end: '' })
//   const [creating, setCreating] = useState(false)

//   const load = async () => {
//     if (!providerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const [provListings, provSlots] = await Promise.all([
//         getProviderListingsApi(providerId),
//         getProviderTimeSlotsApi(providerId),
//       ])
//       setListings(provListings || [])
//       setSlots(provSlots || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load time slots')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [providerId])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm((f) => ({ ...f, [name]: value }))
//   }

//   const onCreate = async (e) => {
//     e.preventDefault()
//     if (!form.listingId || !form.date || !form.start || !form.end) return
//     setCreating(true)
//     try {
//       const startIso = new Date(`${form.date}T${form.start}:00`).toISOString()
//       const endIso = new Date(`${form.date}T${form.end}:00`).toISOString()
//       await createTimeSlotApi({
//         providerId,
//         listingId: Number(form.listingId),
//         startTime: startIso,
//         endTime: endIso,
//       })
//       setForm({ listingId: '', date: '', start: '', end: '' })
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || e?.response?.data?.error || 'Failed to create slot')
//     } finally {
//       setCreating(false)
//     }
//   }

//   const toggleAvail = async (slot) => {
//     try {
//       if (slot.isAvailable) await markSlotUnavailableApi(slot.id)
//       else await markSlotAvailableApi(slot.id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Failed to update slot')
//     }
//   }

//   const onDelete = async (slot) => {
//     if (!confirm('Delete this time slot?')) return
//     try {
//       await deleteTimeSlotApi(slot.id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data || 'Failed to delete slot')
//     }
//   }

//   const listingsById = useMemo(() => Object.fromEntries((listings || []).map(l => [l.id, l])), [listings])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
//             Manage Availability
//           </h1>
//           <p className="text-gray-600">Set your available time slots for customer bookings</p>
//         </div>

//         {/* Create slot form */}
//         <form onSubmit={onCreate} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">🗓️ Create New Time Slot</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Listing</label>
//               <select 
//                 name="listingId" 
//                 value={form.listingId} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 required
//               >
//                 <option value="">Select listing</option>
//                 {listings.map(l => (
//                   <option key={l.id} value={l.id}>{l.serviceName || `Listing #${l.id}`}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
//               <input 
//                 type="date" 
//                 name="date" 
//                 value={form.date} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 required 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
//               <input 
//                 type="time" 
//                 name="start" 
//                 value={form.start} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 required 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
//               <input 
//                 type="time" 
//                 name="end" 
//                 value={form.end} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
//                 required 
//               />
//             </div>
//           </div>
          
//           <div className="flex justify-end">
//             <button 
//               disabled={creating} 
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
//             >
//               {creating ? 'Creating...' : 'Create Slot'}
//             </button>
//           </div>
//         </form>

//         {/* List slots */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-5">⏰ Your Time Slots</h2>
          
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading time slots...</p>
//             </div>
//           ) : error ? (
//             <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//               <span className="font-medium">{error}</span>
//             </div>
//           ) : slots.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//               <div className="text-5xl mb-4">📅</div>
//               <p className="text-gray-600 text-lg">No time slots yet. Create your first availability above!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {slots
//                 .slice()
//                 .sort((a,b) => new Date(a.startTime) - new Date(b.startTime))
//                 .map((s) => (
//                 <div key={s.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
//                   <div className="flex items-center justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="font-bold text-lg text-gray-800">
//                           {listingsById[s.listingId]?.serviceName || s.serviceName || `Listing #${s.listingId}`}
//                         </h3>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           s.isAvailable 
//                             ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200' 
//                             : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 border border-gray-200'
//                         }`}>
//                           {s.isAvailable ? '✓ Available' : '✗ Unavailable'}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <span className="text-sm font-medium">
//                           📅 {format(new Date(s.startTime), 'EEE, dd MMM yyyy')}
//                         </span>
//                         <span className="text-gray-400">•</span>
//                         <span className="text-sm font-medium">
//                           🕐 {format(new Date(s.startTime), 'hh:mm a')} - {format(new Date(s.endTime), 'hh:mm a')}
//                         </span>
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">Slot ID: #{s.id}</div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button 
//                         className={`px-4 py-2 rounded-xl font-semibold transition-all ${
//                           s.isAvailable
//                             ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
//                             : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
//                         }`}
//                         onClick={() => toggleAvail(s)}
//                       >
//                         {s.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
//                       </button>
//                       <button 
//                         className="px-4 py-2 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all" 
//                         onClick={() => onDelete(s)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getProviderListingsApi } from '@/api/listings'
import {
  createTimeSlotApi,
  getProviderTimeSlotsApi,
  markSlotAvailableApi,
  markSlotUnavailableApi,
  deleteTimeSlotApi,
} from '@/api/timeslots'

export default function ProviderTimeSlots() {
  const { user } = useAuth()
  const providerId = user?.id

  const [listings, setListings] = useState([])
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({ listingId: '', date: '', start: '', end: '' })
  const [creating, setCreating] = useState(false)

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const [provListings, provSlots] = await Promise.all([
        getProviderListingsApi(providerId),
        getProviderTimeSlotsApi(providerId),
      ])
      setListings(provListings || [])
      setSlots(provSlots || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load time slots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [providerId])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onCreate = async () => {
    if (!form.listingId || !form.date || !form.start || !form.end) return
    setCreating(true)
    try {
      const startIso = new Date(`${form.date}T${form.start}:00`).toISOString()
      const endIso = new Date(`${form.date}T${form.end}:00`).toISOString()
      await createTimeSlotApi({
        providerId,
        listingId: Number(form.listingId),
        startTime: startIso,
        endTime: endIso,
      })
      setForm({ listingId: '', date: '', start: '', end: '' })
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || e?.response?.data?.error || 'Failed to create slot')
    } finally {
      setCreating(false)
    }
  }

  const toggleAvail = async (slot) => {
    try {
      if (slot.isAvailable) await markSlotUnavailableApi(slot.id)
      else await markSlotAvailableApi(slot.id)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to update slot')
    }
  }

  const onDelete = async (slot) => {
    if (!confirm('Delete this time slot?')) return
    try {
      await deleteTimeSlotApi(slot.id)
      await load()
    } catch (e) {
      alert(e?.response?.data || 'Failed to delete slot')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    })
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const listingsById = useMemo(() => Object.fromEntries((listings || []).map(l => [l.id, l])), [listings])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-auto pt-20">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Manage Availability
          </h1>
          <p className="text-gray-600">Set your available time slots for customer bookings</p>
        </div>

        {/* Create slot form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">🗓️ Create New Time Slot</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Listing</label>
              <select 
                name="listingId" 
                value={form.listingId} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
              >
                <option value="">Select listing</option>
                {listings.map(l => (
                  <option key={l.id} value={l.id}>{l.serviceName || `Listing #${l.id}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input 
                type="date" 
                name="date" 
                value={form.date} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
              <input 
                type="time" 
                name="start" 
                value={form.start} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
              <input 
                type="time" 
                name="end" 
                value={form.end} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none" 
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              disabled={creating} 
              onClick={onCreate}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {creating ? 'Creating...' : 'Create Slot'}
            </button>
          </div>
        </div>

        {/* List slots */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-5">⏰ Your Time Slots</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading time slots...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
              <span className="font-medium">{error}</span>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-gray-600 text-lg">No time slots yet. Create your first availability above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {slots
                .slice()
                .sort((a,b) => new Date(a.startTime) - new Date(b.startTime))
                .map((s) => (
                <div key={s.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">
                          {listingsById[s.listingId]?.serviceName || s.serviceName || `Listing #${s.listingId}`}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          s.isAvailable 
                            ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 border border-gray-200'
                        }`}>
                          {s.isAvailable ? '✓ Available' : '✗ Unavailable'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm font-medium">
                          📅 {formatDate(s.startTime)}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm font-medium">
                          🕐 {formatTime(s.startTime)} - {formatTime(s.endTime)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Slot ID: #{s.id}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className={`min-w-[170px] px-4 py-2 rounded-xl font-semibold transition-all ${
                          s.isAvailable
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
                        }`}
                        onClick={() => toggleAvail(s)}
                      >
                        {s.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                      </button>
                      <button 
                        className="px-4 py-2 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all" 
                        onClick={() => onDelete(s)}
                      >
                        Delete
                      </button>
                    </div>
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