// import { useEffect, useState } from 'react'
// import { getProviderBookingsApi, confirmBookingApi, completeBookingApi, cancelBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import { format } from 'date-fns'

// export default function ProviderBookings() {
//   const { user } = useAuth()
//   const providerId = user?.id
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const load = async () => {
//     if (!providerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getProviderBookingsApi(providerId)
//       setItems(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load bookings')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [providerId])

//   const act = async (fn, id) => {
//     try {
//       await fn(id)
//       await load()
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Action failed')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Incoming Bookings</h1>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className="text-red-600">{error}</div>
//         ) : items.length === 0 ? (
//           <div className="text-gray-600">No bookings yet.</div>
//         ) : (
//           <div className="space-y-3">
//             {items.map((b) => (
//               <div key={b.id} className="bg-white border rounded p-4">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <div className="font-medium">{b.serviceName || `Listing #${b.listingId}`}</div>
//                     <div className="text-sm text-gray-600">
//                       {b.customerName || `Customer #${b.customerId}`}
//                       {b.customerEmail ? ` • ${b.customerEmail}` : ''}
//                     </div>
//                     <div className="text-sm text-gray-700">{format(new Date(b.bookingDateTime), 'EEE, dd MMM yyyy - hh:mm a')}</div>
//                     {b.notes && (
//                       <div className="text-sm text-gray-700 mt-1">Notes: {b.notes}</div>
//                     )}
//                     <div className="text-xs text-gray-500 mt-1">
//                       #{b.id} • Created {b.createdAt ? format(new Date(b.createdAt), 'dd MMM yyyy, hh:mm a') : '—'}
//                       {b.updatedAt && ` • Updated ${format(new Date(b.updatedAt), 'dd MMM yyyy, hh:mm a')}`}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="px-2 py-1 rounded border bg-gray-50 text-sm">{b.status}</span>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex gap-2">
//                   {b.status === 'PENDING' && (
//                     <>
//                       <button className="px-3 py-1 rounded border" onClick={() => act(confirmBookingApi, b.id)}>Accept</button>
//                       <button className="px-3 py-1 rounded border text-red-600" onClick={() => act(cancelBookingApi, b.id)}>Cancel</button>
//                     </>
//                   )}
//                   {b.status === 'CONFIRMED' && (
//                     <button className="px-3 py-1 rounded border" onClick={() => act(completeBookingApi, b.id)}>Mark Completed</button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



import { useEffect, useState } from 'react'
import { getProviderBookingsApi, confirmBookingApi, completeBookingApi, cancelBookingApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

export default function ProviderBookings() {
  const { user } = useAuth()
  const providerId = user?.id
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const data = await getProviderBookingsApi(providerId)
      setItems(data || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [providerId])

  const act = async (fn, id) => {
    try {
      await fn(id)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Action failed')
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
      case 'CONFIRMED':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200'
      case 'COMPLETED':
        return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
      case 'CANCELLED':
        return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Incoming Bookings
          </h1>
          <p className="text-gray-600">Manage your customer booking requests</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
            <span className="font-medium">{error}</span>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-5xl mb-4">📬</div>
            <p className="text-gray-600 text-lg">No bookings yet. They'll appear here when customers book your services!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {b.serviceName || `Listing #${b.listingId}`}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-semibold">👤 Customer:</span>
                        <span>{b.customerName || `Customer #${b.customerId}`}</span>
                        {b.customerEmail && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{b.customerEmail}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-semibold">📅 Date & Time:</span>
                        <span>{format(new Date(b.bookingDateTime), 'EEE, dd MMM yyyy - hh:mm a')}</span>
                      </div>
                      
                      {b.notes && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <span className="font-semibold">📝 Notes:</span>
                          <span className="flex-1">{b.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>Booking ID: #{b.id}</span>
                      <span className="text-gray-400">•</span>
                      <span>Created: {b.createdAt ? format(new Date(b.createdAt), 'dd MMM yyyy, hh:mm a') : '—'}</span>
                      {b.updatedAt && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>Updated: {format(new Date(b.updatedAt), 'dd MMM yyyy, hh:mm a')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                    {b.status === 'PENDING' && (
                      <>
                        <button 
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all" 
                          onClick={() => act(confirmBookingApi, b.id)}
                        >
                          ✓ Accept Booking
                        </button>
                        <button 
                          className="px-6 py-2.5 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all" 
                          onClick={() => act(cancelBookingApi, b.id)}
                        >
                          ✗ Cancel Booking
                        </button>
                      </>
                    )}
                    {b.status === 'CONFIRMED' && (
                      <button 
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all" 
                        onClick={() => act(completeBookingApi, b.id)}
                      >
                        ✓ Mark as Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}