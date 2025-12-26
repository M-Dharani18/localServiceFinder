// import { useEffect, useState } from 'react'
// import { getCustomerBookingsApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import { format } from 'date-fns'

// export default function CustomerBookings() {
//   const { user } = useAuth()
//   const customerId = user?.id
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const load = async () => {
//     if (!customerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getCustomerBookingsApi(customerId)
//       setItems(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load bookings')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [customerId])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
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
//                       {b.providerName || `Provider #${b.providerId}`}
//                       {b.providerEmail ? ` • ${b.providerEmail}` : ''}
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
//                   <div className="text-sm">
//                     <span className="px-2 py-1 rounded border bg-gray-50">{b.status}</span>
//                   </div>
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
// import { getCustomerBookingsApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import { format } from 'date-fns'

// export default function CustomerBookings() {
//   const { user } = useAuth()
//   const customerId = user?.id
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const load = async () => {
//     if (!customerId) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getCustomerBookingsApi(customerId)
//       setItems(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load bookings')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [customerId])

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
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//             My Bookings
//           </h1>
//           <p className="text-gray-600">View and track all your service bookings</p>
//         </div>
        
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-600">Loading your bookings...</p>
//           </div>
//         ) : error ? (
//           <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//             <span className="font-medium">{error}</span>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//             <div className="text-5xl mb-4">📅</div>
//             <p className="text-gray-600 text-lg mb-2">No bookings yet</p>
//             <p className="text-gray-500 text-sm">Start by browsing available services!</p>
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
//                         <span className="font-semibold">👨‍💼 Provider:</span>
//                         <span>{b.providerName || `Provider #${b.providerId}`}</span>
//                         {b.providerEmail && (
//                           <>
//                             <span className="text-gray-400">•</span>
//                             <span className="text-gray-600">{b.providerEmail}</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <span className="font-semibold">📅 Scheduled:</span>
//                         <span>{format(new Date(b.bookingDateTime), 'EEE, dd MMM yyyy - hh:mm a')}</span>
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
//                       <span>Created: {b.createdAt ? format(new Date(b.createdAt), 'dd MMM yyyy, hh:mm a') : '—'}</span>
//                       {b.updatedAt && (
//                         <>
//                           <span className="text-gray-400">•</span>
//                           <span>Updated: {format(new Date(b.updatedAt), 'dd MMM yyyy, hh:mm a')}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
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
import { getCustomerBookingsApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import { format, parseISO, isBefore, isToday, isAfter } from 'date-fns'
import { Link } from 'react-router-dom'

export default function CustomerBookings() {
  const { user } = useAuth()
  const customerId = user?.id
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')

  const load = async () => {
    if (!customerId) return
    setLoading(true)
    setError('')
    try {
      const data = await getCustomerBookingsApi(customerId)
      setItems(data || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [customerId])

  const getStatusColor = (status, bookingDate) => {
    const now = new Date()
    const bookingDateTime = parseISO(bookingDate)
    
    // Override status color for past bookings that aren't completed
    if (status !== 'COMPLETED' && status !== 'CANCELLED') {
      if (isBefore(bookingDateTime, now)) {
        return {
          bg: 'bg-gradient-to-r from-slate-100 to-slate-200',
          text: 'text-slate-700',
          border: 'border-slate-300',
          label: 'EXPIRED'
        }
      }
      if (isToday(bookingDateTime)) {
        return {
          bg: 'bg-gradient-to-r from-blue-100 to-indigo-100',
          text: 'text-blue-700',
          border: 'border-blue-300',
          label: 'TODAY'
        }
      }
    }

    switch(status) {
      case 'PENDING':
        return {
          bg: 'bg-gradient-to-r from-amber-100 to-orange-100',
          text: 'text-amber-800',
          border: 'border-amber-300',
          label: 'PENDING'
        }
      case 'CONFIRMED':
        return {
          bg: 'bg-gradient-to-r from-indigo-100 to-blue-100',
          text: 'text-indigo-800',
          border: 'border-indigo-300',
          label: 'CONFIRMED'
        }
      case 'COMPLETED':
        return {
          bg: 'bg-gradient-to-r from-emerald-100 to-green-100',
          text: 'text-emerald-800',
          border: 'border-emerald-300',
          label: 'COMPLETED'
        }
      case 'CANCELLED':
        return {
          bg: 'bg-gradient-to-r from-rose-100 to-red-100',
          text: 'text-rose-800',
          border: 'border-rose-300',
          label: 'CANCELLED'
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-100 to-slate-200',
          text: 'text-slate-700',
          border: 'border-slate-300',
          label: status || 'UNKNOWN'
        }
    }
  }

  const filterItems = (filter) => {
    if (filter === 'ALL') return items
    if (filter === 'UPCOMING') {
      return items.filter(item => 
        item.status !== 'COMPLETED' && 
        item.status !== 'CANCELLED' &&
        isAfter(parseISO(item.bookingDateTime), new Date())
      )
    }
    if (filter === 'PAST') {
      return items.filter(item => 
        item.status === 'COMPLETED' || 
        isBefore(parseISO(item.bookingDateTime), new Date())
      )
    }
    return items.filter(item => item.status === filter)
  }

  const filteredItems = filterItems(activeFilter)

  const stats = {
    total: items.length,
    upcoming: items.filter(item => 
      item.status !== 'COMPLETED' && 
      item.status !== 'CANCELLED' &&
      isAfter(parseISO(item.bookingDateTime), new Date())
    ).length,
    completed: items.filter(item => item.status === 'COMPLETED').length,
    pending: items.filter(item => item.status === 'PENDING').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Bookings</h1>
              <p className="text-slate-600 mt-2">View and manage all your appointments</p>
            </div>
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Book New Service
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-sm text-slate-600">Total Bookings</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold text-indigo-600">{stats.upcoming}</div>
              <div className="text-sm text-slate-600">Upcoming</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
              <div className="text-sm text-slate-600">Pending</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'ALL', label: 'All Bookings' },
              { key: 'UPCOMING', label: 'Upcoming' },
              { key: 'PENDING', label: 'Pending' },
              { key: 'CONFIRMED', label: 'Confirmed' },
              { key: 'COMPLETED', label: 'Completed' },
              { key: 'CANCELLED', label: 'Cancelled' },
              { key: 'PAST', label: 'Past' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-slate-700 font-medium">Loading your bookings...</p>
              <p className="text-sm text-slate-500 mt-1">Fetching the latest information</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-gradient-to-r from-red-50/80 to-rose-50/80 border border-red-200 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Unable to load bookings</h3>
                <p className="text-red-600 mt-1">{error}</p>
                <button
                  onClick={load}
                  className="mt-4 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6">
              <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {activeFilter === 'ALL' ? 'No bookings yet' : `No ${activeFilter.toLowerCase()} bookings`}
            </h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              {activeFilter === 'ALL' 
                ? "You haven't made any bookings yet. Start by exploring available services."
                : `You don't have any ${activeFilter.toLowerCase()} bookings at the moment.`
              }
            </p>
            {activeFilter !== 'ALL' && (
              <button
                onClick={() => setActiveFilter('ALL')}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200"
              >
                View All Bookings
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredItems.map((booking) => {
              const statusInfo = getStatusColor(booking.status, booking.bookingDateTime)
              const bookingDate = parseISO(booking.bookingDateTime)
              const isPast = isBefore(bookingDate, new Date())
              
              return (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Service Info */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                              {booking.serviceName || `Service #${booking.listingId}`}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{booking.providerName || `Provider #${booking.providerId}`}</span>
                              {booking.providerEmail && (
                                <>
                                  <span className="text-slate-400">•</span>
                                  <span className="text-slate-500">{booking.providerEmail}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                            {statusInfo.label}
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="p-2 bg-white rounded-lg border border-slate-200">
                              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium">Date & Time</p>
                              <p className="text-sm font-semibold text-slate-900">
                                {format(bookingDate, 'EEEE, MMMM d, yyyy')}
                              </p>
                              <p className="text-sm text-slate-700">
                                {format(bookingDate, 'h:mm a')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="p-2 bg-white rounded-lg border border-slate-200">
                              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium">Duration</p>
                              <p className="text-sm font-semibold text-slate-900">1 hour</p>
                              <p className="text-sm text-slate-700">Standard appointment</p>
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        {booking.notes && (
                          <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 rounded-lg border border-indigo-100">
                            <div className="flex items-start gap-2">
                              <div className="p-1.5 bg-indigo-100 rounded">
                                <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-medium text-indigo-700 mb-1">Your Notes</p>
                                <p className="text-sm text-slate-700">{booking.notes}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            <span>Booking ID: #{booking.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Created: {booking.createdAt ? format(new Date(booking.createdAt), 'MMM d, yyyy') : '—'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Bar for upcoming bookings */}
                  {!isPast && booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
                    <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Need to make changes?
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-50 hover:border-rose-400 transition-colors">
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}