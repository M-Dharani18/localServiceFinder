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





// import { useEffect, useState } from 'react'
// import { getProviderBookingsApi, confirmBookingApi, completeBookingApi, cancelBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'

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

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—'
//     const date = new Date(dateStr)
//     return date.toLocaleString('en-US', { 
//       weekday: 'short', 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     })
//   }

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'PENDING':
//         return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
//       case 'CONFIRMED':
//         return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200'
//       case 'COMPLETED':
//         return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
//       case 'CANCELLED':
//         return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200'
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-auto pt-20">
//       <div className="max-w-6xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
//             Incoming Bookings
//           </h1>
//           <p className="text-gray-600">Manage your customer booking requests</p>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-600">Loading bookings...</p>
//           </div>
//         ) : error ? (
//           <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//             <span className="font-medium">{error}</span>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//             <div className="text-5xl mb-4">📬</div>
//             <p className="text-gray-600 text-lg">No bookings yet. They'll appear here when customers book your services!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {items.map((b) => (
//               <div key={b.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
//                 <div className="flex items-start justify-between gap-6">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <h3 className="text-xl font-bold text-gray-800">
//                         {b.serviceName || `Listing #${b.listingId}`}
//                       </h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(b.status)}`}>
//                         {b.status}
//                       </span>
//                     </div>
                    
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">👤 Customer:</span>
//                         <span>{b.customerName || `Customer #${b.customerId}`}</span>
//                         {b.customerEmail && (
//                           <>
//                             <span className="text-gray-400">•</span>
//                             <span className="text-gray-600">{b.customerEmail}</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">📅 Date & Time:</span>
//                         <span>{formatDate(b.bookingDateTime)}</span>
//                       </div>
                      
//                       {b.notes && (
//                         <div className="flex items-start gap-2 text-gray-700">
//                           <span className="font-semibold">📝 Notes:</span>
//                           <span className="flex-1">{b.notes}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="text-xs text-gray-500 flex items-center gap-2">
//                       <span>Booking ID: #{b.id}</span>
//                       <span className="text-gray-400">•</span>
//                       <span>Created: {formatDate(b.createdAt)}</span>
//                       {b.updatedAt && (
//                         <>
//                           <span className="text-gray-400">•</span>
//                           <span>Updated: {formatDate(b.updatedAt)}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
//                   <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
//                     {b.status === 'PENDING' && (
//                       <>
//                         <button 
//                           className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all" 
//                           onClick={() => act(confirmBookingApi, b.id)}
//                         >
//                           ✓ Accept Booking
//                         </button>
//                         <button 
//                           className="px-6 py-2.5 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all" 
//                           onClick={() => act(cancelBookingApi, b.id)}
//                         >
//                           ✗ Cancel Booking
//                         </button>
//                       </>
//                     )}
//                     {b.status === 'CONFIRMED' && (
//                       <button 
//                         className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all" 
//                         onClick={() => act(completeBookingApi, b.id)}
//                       >
//                         ✓ Mark as Completed
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


// import { useEffect, useState } from 'react'
// import { getProviderBookingsApi, confirmBookingApi, completeBookingApi, cancelBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'

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

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—'
//     const date = new Date(dateStr)
//     return date.toLocaleString('en-US', { 
//       weekday: 'short', 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     })
//   }

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'PENDING':
//         return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
//       case 'CONFIRMED':
//         return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200'
//       case 'COMPLETED':
//         return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
//       case 'CANCELLED':
//         return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200'
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
//       <div className="max-w-6xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
//             Incoming Bookings
//           </h1>
//           <p className="text-gray-600">Manage your customer booking requests</p>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-600">Loading bookings...</p>
//           </div>
//         ) : error ? (
//           <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//             <span className="font-medium">{error}</span>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//             <div className="text-5xl mb-4">📬</div>
//             <p className="text-gray-600 text-lg">No bookings yet. They'll appear here when customers book your services!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {items.map((b) => (
//               <div key={b.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
//                 <div className="flex items-start justify-between gap-6">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <h3 className="text-xl font-bold text-gray-800">
//                         {b.serviceName || `Listing #${b.listingId}`}
//                       </h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(b.status)}`}>
//                         {b.status}
//                       </span>
//                     </div>
                    
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">👤 Customer:</span>
//                         <span>{b.customerName || `Customer #${b.customerId}`}</span>
//                         {b.customerEmail && (
//                           <>
//                             <span className="text-gray-400">•</span>
//                             <span className="text-gray-600">{b.customerEmail}</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">📅 Date & Time:</span>
//                         <span>{formatDate(b.bookingDateTime)}</span>
//                       </div>
                      
//                       {b.notes && (
//                         <div className="flex items-start gap-2 text-gray-700">
//                           <span className="font-semibold">📝 Notes:</span>
//                           <span className="flex-1">{b.notes}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="text-xs text-gray-500 flex items-center gap-2">
//                       <span>Booking ID: #{b.id}</span>
//                       <span className="text-gray-400">•</span>
//                       <span>Created: {formatDate(b.createdAt)}</span>
//                       {b.updatedAt && (
//                         <>
//                           <span className="text-gray-400">•</span>
//                           <span>Updated: {formatDate(b.updatedAt)}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
//                   <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
//                     {b.status === 'PENDING' && (
//                       <>
//                         <button 
//                           className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all" 
//                           onClick={() => act(confirmBookingApi, b.id)}
//                         >
//                           ✓ Accept Booking
//                         </button>
//                         <button 
//                           className="px-6 py-2.5 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all" 
//                           onClick={() => act(cancelBookingApi, b.id)}
//                         >
//                           ✗ Cancel Booking
//                         </button>
//                       </>
//                     )}
//                     {b.status === 'CONFIRMED' && (
//                       <button 
//                         className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all" 
//                         onClick={() => act(completeBookingApi, b.id)}
//                       >
//                         ✓ Mark as Completed
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



// import { useEffect, useState } from 'react'
// import { getProviderBookingsApi, confirmBookingApi, completeBookingApi, cancelBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'

// // Feedback Modal Component
// const FeedbackModal = ({ booking, onClose }) => {
//   if (!booking) return null

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—'
//     const date = new Date(dateStr)
//     return date.toLocaleString('en-US', { 
//       weekday: 'short', 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric'
//     })
//   }

//   const renderStars = (rating) => {
//     if (!rating || rating < 0 || rating > 5) return null
    
//     return (
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
//           >
//             ★
//           </span>
//         ))}
//         <span className="ml-2 text-xl font-bold text-gray-800">{rating.toFixed(1)}/5</span>
//       </div>
//     )
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">Customer Feedback</h3>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             ×
//           </button>
//         </div>
        
//         <div className="mb-4">
//           <div className="flex items-center gap-2 text-gray-600 mb-2">
//             <span className="font-medium">Service:</span>
//             <span>{booking.serviceName || `Listing #${booking.listingId}`}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600">
//             <span className="font-medium">Customer:</span>
//             <span>{booking.customerName || `Customer #${booking.customerId}`}</span>
//           </div>
//         </div>
        
//         <div className="border-t border-b border-gray-200 py-4 my-4">
//           {booking.rating ? (
//             <div className="text-center mb-4">
//               {renderStars(booking.rating)}
//               {booking.ratingDate && (
//                 <p className="text-gray-500 text-sm mt-1">
//                   Rated on {formatDate(booking.ratingDate)}
//                 </p>
//               )}
//             </div>
//           ) : (
//             <div className="text-center py-4">
//               <div className="text-gray-400 text-3xl mb-2">—</div>
//               <p className="text-gray-500">No rating provided</p>
//             </div>
//           )}
          
//           {booking.feedback ? (
//             <div className="mt-4">
//               <p className="text-gray-700 font-medium mb-2">Feedback:</p>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <p className="text-gray-700 italic">"{booking.feedback}"</p>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-4 text-center">
//               <p className="text-gray-500 italic">No feedback comments provided</p>
//             </div>
//           )}
//         </div>
        
//         <div className="flex justify-end">
//           <button 
//             onClick={onClose}
//             className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function ProviderBookings() {
//   const { user } = useAuth()
//   const providerId = user?.id
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [selectedFeedback, setSelectedFeedback] = useState(null)

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

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—'
//     const date = new Date(dateStr)
//     return date.toLocaleString('en-US', { 
//       weekday: 'short', 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     })
//   }

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'PENDING':
//         return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
//       case 'CONFIRMED':
//         return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200'
//       case 'COMPLETED':
//         return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
//       case 'CANCELLED':
//         return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200'
//     }
//   }

//   // Check if booking has feedback
//   const hasFeedback = (booking) => {
//     return booking.status === 'COMPLETED' && (booking.rating || booking.feedback)
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
//       {/* Feedback Modal */}
//       {selectedFeedback && (
//         <FeedbackModal 
//           booking={selectedFeedback} 
//           onClose={() => setSelectedFeedback(null)} 
//         />
//       )}
      
//       <div className="max-w-6xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
//             Incoming Bookings
//           </h1>
//           <p className="text-gray-600">Manage your customer booking requests</p>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-600">Loading bookings...</p>
//           </div>
//         ) : error ? (
//           <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//             <span className="font-medium">{error}</span>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//             <div className="text-5xl mb-4">📬</div>
//             <p className="text-gray-600 text-lg">No bookings yet. They'll appear here when customers book your services!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {items.map((b) => (
//               <div key={b.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
//                 <div className="flex items-start justify-between gap-6">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <h3 className="text-xl font-bold text-gray-800">
//                         {b.serviceName || `Listing #${b.listingId}`}
//                       </h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(b.status)}`}>
//                         {b.status}
//                       </span>
//                     </div>
                    
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">👤 Customer:</span>
//                         <span>{b.customerName || `Customer #${b.customerId}`}</span>
//                         {b.customerEmail && (
//                           <>
//                             <span className="text-gray-400">•</span>
//                             <span className="text-gray-600">{b.customerEmail}</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">📅 Date & Time:</span>
//                         <span>{formatDate(b.bookingDateTime)}</span>
//                       </div>
                      
//                       {b.notes && (
//                         <div className="flex items-start gap-2 text-gray-700">
//                           <span className="font-semibold">📝 Notes:</span>
//                           <span className="flex-1">{b.notes}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Simple indicator for bookings with feedback */}
//                     {hasFeedback(b) && (
//                       <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
//                         <span className="text-amber-600">⭐</span>
//                         <span className="text-sm font-medium text-amber-700">
//                           Feedback Available
//                         </span>
//                       </div>
//                     )}
                    
//                     <div className="text-xs text-gray-500 flex items-center gap-2 mt-4">
//                       <span>Booking ID: #{b.id}</span>
//                       <span className="text-gray-400">•</span>
//                       <span>Created: {formatDate(b.createdAt)}</span>
//                       {b.updatedAt && (
//                         <>
//                           <span className="text-gray-400">•</span>
//                           <span>Updated: {formatDate(b.updatedAt)}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
//                   {/* View Feedback Button for Completed Bookings */}
//                   {b.status === 'COMPLETED' && (
//                     <button 
//                       onClick={() => setSelectedFeedback(b)}
//                       className={`px-6 py-2.5 rounded-xl font-semibold shadow-md transition-all ${
//                         hasFeedback(b)
//                           ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
//                           : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 hover:from-gray-400 hover:to-gray-500'
//                       }`}
//                     >
//                       {hasFeedback(b) ? '⭐ View Feedback' : '📝 No Feedback Yet'}
//                     </button>
//                   )}
                  
//                   {/* Action Buttons */}
//                   {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
//                     <>
//                       {b.status === 'PENDING' && (
//                         <>
//                           <button 
//                             className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all" 
//                             onClick={() => act(confirmBookingApi, b.id)}
//                           >
//                             ✓ Accept Booking
//                           </button>
//                           <button 
//                             className="px-6 py-2.5 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all" 
//                             onClick={() => act(cancelBookingApi, b.id)}
//                           >
//                             ✗ Cancel Booking
//                           </button>
//                         </>
//                       )}
//                       {b.status === 'CONFIRMED' && (
//                         <button 
//                           className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all" 
//                           onClick={() => act(completeBookingApi, b.id)}
//                         >
//                           ✓ Mark as Completed
//                         </button>
//                       )}
//                     </>
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
import reviewAPI from '@/api/reviews'
import { useAuth } from '@/context/AuthContext'

// Feedback Modal Component
const FeedbackModal = ({ review, booking, onClose }) => {
  if (!booking) return null

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

  const renderStars = (rating) => {
    if (!rating || rating < 0 || rating > 5) return null
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-xl font-bold text-gray-800">{rating.toFixed(1)}/5</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Customer Feedback</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="font-medium">Service:</span>
            <span>{booking.serviceName || `Listing #${booking.listingId}`}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Customer:</span>
            <span>{booking.customerName || `Customer #${booking.customerId}`}</span>
          </div>
        </div>
        
        <div className="border-t border-b border-gray-200 py-4 my-4">
          {review?.rating ? (
            <div className="text-center mb-4">
              {renderStars(review.rating)}
              {review.createdAt && (
                <p className="text-gray-500 text-sm mt-1">
                  Rated on {formatDate(review.createdAt)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-gray-400 text-3xl mb-2">—</div>
              <p className="text-gray-500">No rating provided</p>
            </div>
          )}
          
          {review?.comment ? (
            <div className="mt-4">
              <p className="text-gray-700 font-medium mb-2">Feedback:</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 italic">"{review.comment}"</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p className="text-gray-500 italic">No feedback comments provided</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProviderBookings() {
  const { user } = useAuth()
  const providerId = user?.id
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [bookingReviews, setBookingReviews] = useState({})

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const data = await getProviderBookingsApi(providerId)
      setItems(data || [])
      
      // Fetch reviews for completed bookings
      if (data && data.length > 0) {
        const completedBookings = data.filter(b => b.status === 'COMPLETED')
        const reviewPromises = completedBookings.map(async (booking) => {
          try {
            console.log(`🔍 Fetching review for booking ${booking.id}`)
            const review = await reviewAPI.getReviewByBookingId(booking.id)
            console.log(`✅ Review found for booking ${booking.id}:`, review)
            return { bookingId: booking.id, review }
          } catch (error) {
            console.log(`❌ No review for booking ${booking.id}`)
            if (error.response?.status === 404) {
              return { bookingId: booking.id, review: null }
            }
            console.error(`Failed to fetch review for booking ${booking.id}:`, error)
            return { bookingId: booking.id, review: null }
          }
        })
        
        const reviewResults = await Promise.all(reviewPromises)
        const reviewsMap = {}
        reviewResults.forEach(({ bookingId, review }) => {
          reviewsMap[bookingId] = review
        })
        console.log('📊 Reviews map:', reviewsMap)
        setBookingReviews(reviewsMap)
      }
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
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

  // Check if booking has feedback using the reviews map
  const hasFeedback = (booking) => {
    return booking.status === 'COMPLETED' && bookingReviews[booking.id]
  }

  const handleViewFeedback = (booking) => {
    const review = bookingReviews[booking.id]
    setSelectedBooking(booking)
    setSelectedFeedback(review)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-auto pt-20">
      {/* Feedback Modal */}
      {selectedFeedback && selectedBooking && (
        <FeedbackModal 
          review={selectedFeedback}
          booking={selectedBooking} 
          onClose={() => {
            setSelectedFeedback(null)
            setSelectedBooking(null)
          }} 
        />
      )}
      
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Incoming Bookings
          </h1>
          <p className="text-gray-600">Manage your customer booking requests</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
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
                        <span>{formatDate(b.bookingDateTime)}</span>
                      </div>
                      
                      {b.notes && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <span className="font-semibold">📝 Notes:</span>
                          <span className="flex-1">{b.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Indicator for bookings with feedback */}
                    {hasFeedback(b) && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                        <span className="text-amber-600">⭐</span>
                        <span className="text-sm font-medium text-amber-700">
                          Rated {bookingReviews[b.id]?.rating?.toFixed(1)}/5
                        </span>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-4">
                      <span>Booking ID: #{b.id}</span>
                      <span className="text-gray-400">•</span>
                      <span>Created: {formatDate(b.createdAt)}</span>
                      {b.updatedAt && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>Updated: {formatDate(b.updatedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                  {/* View Feedback Button for Completed Bookings */}
                  {b.status === 'COMPLETED' && (
                    <button 
                      onClick={() => handleViewFeedback(b)}
                      className={`px-6 py-2.5 rounded-xl font-semibold shadow-md transition-all ${
                        hasFeedback(b)
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                          : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 hover:from-gray-400 hover:to-gray-500'
                      }`}
                    >
                      {hasFeedback(b) ? '⭐ View Feedback' : '📝 No Feedback Yet'}
                    </button>
                  )}
                  
                  {/* Action Buttons */}
                  {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}