// import { useEffect, useMemo, useState } from 'react'
// import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
// import { getAvailableSlotsByListingApi, getAvailableSlotsByProviderApi } from '@/api/timeslots'
// import { createBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   isSameMonth,
//   isSameDay,
//   parseISO,
// } from 'date-fns'

// export default function BookService() {
//   const { id } = useParams() // listingId
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { user } = useAuth() // must be CUSTOMER per route guard
//   const providerFromState = location?.state?.providerId

//   const [slots, setSlots] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [notes, setNotes] = useState('')
//   const [currentMonth, setCurrentMonth] = useState(() => new Date())
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedSlot, setSelectedSlot] = useState(null)

//   const grouped = useMemo(() => {
//     const map = new Map()
//     for (const s of slots) {
//       const day = format(new Date(s.startTime), 'yyyy-MM-dd')
//       if (!map.has(day)) map.set(day, [])
//       map.get(day).push(s)
//     }
//     return Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1))
//   }, [slots])

//   const load = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       let data = await getAvailableSlotsByListingApi(id)
//       // Fallback: if no listing-specific slots, try provider-wide availability
//       if ((!data || data.length === 0) && providerFromState) {
//         const provData = await getAvailableSlotsByProviderApi(providerFromState)
//         // If provider-wide slots exist, use them (optionally filter by listing if desired)
//         data = provData || []
//       }
//       setSlots(data || [])
//       // Initialize selected date to first available day if none chosen
//       if (!selectedDate && data && data.length) {
//         const first = data[0]
//         const d = format(new Date(first.startTime), 'yyyy-MM-dd')
//         setSelectedDate(d)
//       }
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load availability')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [id, providerFromState])
//   // Real-time availability refresh
//   useEffect(() => {
//     const t = setInterval(() => {
//       // refresh both sources and pick non-empty
//       Promise.all([
//         getAvailableSlotsByListingApi(id).catch(() => []),
//         providerFromState ? getAvailableSlotsByProviderApi(providerFromState).catch(() => []) : Promise.resolve([]),
//       ]).then(([byListing, byProvider]) => {
//         const chosen = (byListing && byListing.length > 0) ? byListing : byProvider
//         if (Array.isArray(chosen)) setSlots(chosen)
//       }).catch(() => {})
//     }, 20000)
//     return () => clearInterval(t)
//   }, [id, providerFromState])

//   const onBook = async (slot) => {
//     try {
//       await createBookingApi({
//         customerId: user?.id,
//         providerId: slot.providerId,
//         listingId: slot.listingId,
//         bookingDateTime: slot.startTime,
//         notes: notes || undefined,
//       })
//       navigate('/customer/bookings', { replace: true })
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Booking failed')
//     }
//   }

//   // Calendar grid for currentMonth
//   const weeks = useMemo(() => {
//     const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 })
//     const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
//     const days = []
//     let day = start
//     while (day <= end) {
//       days.push(day)
//       day = addDays(day, 1)
//     }
//     return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => days.slice(i * 7, i * 7 + 7))
//   }, [currentMonth])

//   const timesForSelectedDate = useMemo(() => {
//     if (!selectedDate) return []
//     return (slots || []).filter((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === selectedDate)
//       .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
//   }, [slots, selectedDate])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-3xl mx-auto p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-semibold">Book Service</h1>
//             {slots.length > 0 && (
//               <p className="text-sm text-gray-600">
//                 {slots[0].serviceName || `Listing #${slots[0].listingId}`} • {slots[0].providerName || `Provider #${slots[0].providerId}`}
//               </p>
//             )}
//           </div>
//           <Link className="text-blue-600" to="/services">Back to Services</Link>
//         </div>
//         <div className="bg-white border rounded shadow p-4 mb-4">
//           <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
//           <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Share any details for the provider..." />
//         </div>
//         {/* Calendar */}
//         <div className="bg-white border rounded shadow p-4 mb-4">
//           <div className="flex items-center justify-between mb-3">
//             <button className="px-2 py-1 rounded border" onClick={() => setCurrentMonth(addDays(startOfMonth(currentMonth), -1))}>{'<'}</button>
//             <div className="font-medium">{format(currentMonth, 'MMMM yyyy')}</div>
//             <button className="px-2 py-1 rounded border" onClick={() => setCurrentMonth(addDays(endOfMonth(currentMonth), 1))}>{'>'}</button>
//           </div>
//           <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
//             {['S','M','T','W','T','F','S'].map((d) => (<div key={d} className="text-center py-1">{d}</div>))}
//           </div>
//           <div className="grid grid-cols-7 gap-1">
//             {weeks.map((week, wi) => (
//               <div key={wi} className="contents">
//                 {week.map((d) => {
//                   const ds = format(d, 'yyyy-MM-dd')
//                   const isSelected = selectedDate && isSameDay(d, parseISO(`${selectedDate}T00:00:00`))
//                   const availableOnDay = (slots || []).some((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === ds)
//                   return (
//                     <button
//                       key={ds}
//                       onClick={() => setSelectedDate(ds)}
//                       className={`aspect-square rounded flex items-center justify-center text-sm border ${isSelected ? 'bg-blue-600 text-white' : 'bg-white'} ${!isSameMonth(d, currentMonth) ? 'text-gray-400' : ''} ${availableOnDay ? 'border-blue-300' : 'border-gray-200'}`}
//                     >
//                       {format(d, 'd')}
//                     </button>
//                   )
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className="text-red-600">{error}</div>
//         ) : slots.length === 0 ? (
//           <div className="text-gray-600">No available time slots. Please try later.</div>
//         ) : (
//           <div className="space-y-5">
//             <div>
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Available times</h3>
//               <div className="flex flex-wrap gap-2">
//                 {timesForSelectedDate.length === 0 ? (
//                   <div className="text-gray-500 text-sm">No times for the selected day.</div>
//                 ) : (
//                   timesForSelectedDate.map((s) => (
//                     <button
//                       key={s.id}
//                       title={`Slot #${s.id}`}
//                       className={`px-3 py-1 rounded border hover:bg-gray-50 ${selectedSlot?.id === s.id ? 'ring-2 ring-blue-500' : ''}`}
//                       onClick={() => setSelectedSlot(s)}
//                     >
//                       {format(new Date(s.startTime), 'hh:mm a')}
//                     </button>
//                   ))
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 disabled={!selectedSlot}
//                 onClick={() => selectedSlot && onBook(selectedSlot)}
//                 className="w-full sm:w-auto px-4 py-2 rounded bg-black text-white disabled:opacity-50"
//               >
//                 Book
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// import { useEffect, useMemo, useState } from 'react'
// import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
// import { getAvailableSlotsByListingApi, getAvailableSlotsByProviderApi } from '@/api/timeslots'
// import { createBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   isSameMonth,
//   isSameDay,
//   parseISO,
//   addMonths,
//   subMonths,
//   isToday,
//   isPast
// } from 'date-fns'
// import {
//   Calendar as CalendarIcon,
//   Clock,
//   MapPin,
//   User,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   Sparkles,
//   Star,
//   Shield,
//   Clock4,
//   MessageSquare,
//   ArrowLeft
// } from 'lucide-react'

// export default function BookService() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { user } = useAuth()
//   const providerFromState = location?.state?.providerId

//   const [slots, setSlots] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [notes, setNotes] = useState('')
//   const [currentMonth, setCurrentMonth] = useState(() => new Date())
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedSlot, setSelectedSlot] = useState(null)
//   const [bookingInProgress, setBookingInProgress] = useState(false)

//   // Service details (you would fetch these from an API)
//   const serviceDetails = useMemo(() => ({
//     title: 'Professional Cleaning Service',
//     provider: 'CleanPro Solutions',
//     rating: 4.8,
//     reviews: 124,
//     duration: '2 hours',
//     price: '$89.99',
//     location: 'New York, NY',
//     description: 'Complete home cleaning with eco-friendly products',
//     features: ['Deep Cleaning', 'Eco-Friendly', 'Insured', 'Same-Day Service']
//   }), [])

//   const grouped = useMemo(() => {
//     const map = new Map()
//     for (const s of slots) {
//       const day = format(new Date(s.startTime), 'yyyy-MM-dd')
//       if (!map.has(day)) map.set(day, [])
//       map.get(day).push(s)
//     }
//     return Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1))
//   }, [slots])

//   const load = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       let data = await getAvailableSlotsByListingApi(id)
//       if ((!data || data.length === 0) && providerFromState) {
//         const provData = await getAvailableSlotsByProviderApi(providerFromState)
//         data = provData || []
//       }
//       setSlots(data || [])
//       if (!selectedDate && data && data.length) {
//         const first = data[0]
//         const d = format(new Date(first.startTime), 'yyyy-MM-dd')
//         setSelectedDate(d)
//       }
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load availability')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [id, providerFromState])

//   useEffect(() => {
//     const t = setInterval(() => {
//       Promise.all([
//         getAvailableSlotsByListingApi(id).catch(() => []),
//         providerFromState ? getAvailableSlotsByProviderApi(providerFromState).catch(() => []) : Promise.resolve([]),
//       ]).then(([byListing, byProvider]) => {
//         const chosen = (byListing && byListing.length > 0) ? byListing : byProvider
//         if (Array.isArray(chosen)) setSlots(chosen)
//       }).catch(() => {})
//     }, 30000)
//     return () => clearInterval(t)
//   }, [id, providerFromState])

//   const onBook = async () => {
//     if (!selectedSlot) return
//     setBookingInProgress(true)
//     try {
//       await createBookingApi({
//         customerId: user?.id,
//         providerId: selectedSlot.providerId,
//         listingId: selectedSlot.listingId,
//         bookingDateTime: selectedSlot.startTime,
//         notes: notes || undefined,
//       })
//       setBookingInProgress(false)
//       navigate('/customer/bookings', { replace: true })
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Booking failed')
//       setBookingInProgress(false)
//     }
//   }

//   // Calendar grid for currentMonth
//   const weeks = useMemo(() => {
//     const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 })
//     const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
//     const days = []
//     let day = start
//     while (day <= end) {
//       days.push(day)
//       day = addDays(day, 1)
//     }
//     return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => 
//       days.slice(i * 7, i * 7 + 7)
//     )
//   }, [currentMonth])

//   const timesForSelectedDate = useMemo(() => {
//     if (!selectedDate) return []
//     return (slots || []).filter((s) => 
//       format(new Date(s.startTime), 'yyyy-MM-dd') === selectedDate
//     ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
//   }, [slots, selectedDate])

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute top-1/3 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
//         {/* Back Button */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-6"
//         >
//           <Link 
//             to="/services" 
//             className="inline-flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors group"
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//             <span className="text-sm font-medium">Back to Services</span>
//           </Link>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Service Details */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.1 }}
//             className="lg:col-span-2"
//           >
//             {/* Service Header */}
//             <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-200/50 mb-8">
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <div className="inline-flex items-center space-x-2 mb-3">
//                     <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-medium rounded-full">
//                       Popular
//                     </div>
//                     <div className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
//                       Instant Booking
//                     </div>
//                   </div>
//                   <h1 className="text-3xl font-bold text-slate-800 mb-3">
//                     {serviceDetails.title}
//                   </h1>
//                   <div className="flex items-center space-x-4 text-slate-600">
//                     <div className="flex items-center space-x-2">
//                       <User className="w-4 h-4" />
//                       <span className="font-medium">{serviceDetails.provider}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <MapPin className="w-4 h-4" />
//                       <span>{serviceDetails.location}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Clock4 className="w-4 h-4" />
//                       <span>{serviceDetails.duration}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//                     {serviceDetails.price}
//                   </div>
//                   <div className="text-sm text-slate-500">per service</div>
//                 </div>
//               </div>

//               {/* Rating */}
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="flex items-center space-x-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star 
//                       key={i}
//                       className={`w-5 h-5 ${i < Math.floor(serviceDetails.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`}
//                     />
//                   ))}
//                 </div>
//                 <span className="font-medium text-slate-800">{serviceDetails.rating}</span>
//                 <span className="text-slate-500">({serviceDetails.reviews} reviews)</span>
//               </div>

//               {/* Features */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//                 {serviceDetails.features.map((feature, index) => (
//                   <motion.div
//                     key={feature}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 + index * 0.05 }}
//                     className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
//                   >
//                     <Shield className="w-4 h-4 text-blue-500" />
//                     <span className="text-sm font-medium text-slate-700">{feature}</span>
//                   </motion.div>
//                 ))}
//               </div>

//               <p className="text-slate-600">{serviceDetails.description}</p>
//             </div>

//             {/* Booking Calendar */}
//             <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-200/50">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-slate-800">Select Date & Time</h2>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                     className="p-2 hover:bg-slate-100 rounded-full transition-colors"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <span className="text-lg font-semibold text-slate-800">
//                     {format(currentMonth, 'MMMM yyyy')}
//                   </span>
//                   <button
//                     onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                     className="p-2 hover:bg-slate-100 rounded-full transition-colors"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Calendar Grid */}
//               <div className="mb-8">
//                 <div className="grid grid-cols-7 gap-2 mb-4">
//                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                     <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-7 gap-2">
//                   {weeks.map((week, weekIndex) => (
//                     <div key={weekIndex} className="contents">
//                       {week.map((day) => {
//                         const dayStr = format(day, 'yyyy-MM-dd')
//                         const isSelected = selectedDate && isSameDay(day, parseISO(selectedDate))
//                         const hasSlots = slots.some(s => 
//                           format(new Date(s.startTime), 'yyyy-MM-dd') === dayStr
//                         )
//                         const isCurrentDay = isToday(day)
//                         const isPastDay = isPast(day) && !isCurrentDay
//                         const isCurrentMonth = isSameMonth(day, currentMonth)

//                         return (
//                           <motion.button
//                             key={dayStr}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => setSelectedDate(dayStr)}
//                             disabled={!hasSlots || isPastDay}
//                             className={`
//                               aspect-square rounded-xl flex flex-col items-center justify-center
//                               ${isSelected 
//                                 ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg' 
//                                 : hasSlots 
//                                   ? 'bg-white hover:bg-blue-50 border-2 border-blue-200 text-slate-800' 
//                                   : 'bg-slate-50 text-slate-400'
//                               }
//                               ${!isCurrentMonth ? 'opacity-40' : ''}
//                               ${isPastDay ? 'opacity-60 cursor-not-allowed' : ''}
//                               ${isCurrentDay && !isSelected ? 'border-2 border-blue-400' : ''}
//                               transition-all duration-200
//                             `}
//                           >
//                             <span className={`text-lg font-semibold ${isSelected ? 'text-white' : ''}`}>
//                               {format(day, 'd')}
//                             </span>
//                             {isCurrentDay && !isSelected && (
//                               <span className="text-xs text-blue-600 font-medium">Today</span>
//                             )}
//                             {hasSlots && !isSelected && (
//                               <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
//                             )}
//                           </motion.button>
//                         )
//                       })}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Time Slots */}
//               <AnimatePresence mode="wait">
//                 {selectedDate ? (
//                   <motion.div
//                     key={selectedDate}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="space-y-4"
//                   >
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-semibold text-slate-800">
//                         Available Times for {format(parseISO(selectedDate), 'EEEE, MMMM d')}
//                       </h3>
//                       <span className="text-sm text-slate-500">
//                         {timesForSelectedDate.length} slots available
//                       </span>
//                     </div>

//                     {timesForSelectedDate.length === 0 ? (
//                       <div className="text-center py-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
//                         <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
//                         <p className="text-slate-600 mb-2">No available slots for this day</p>
//                         <p className="text-sm text-slate-500">Please select another date</p>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                         {timesForSelectedDate.map((slot, index) => {
//                           const isSelected = selectedSlot?.id === slot.id
//                           const time = format(new Date(slot.startTime), 'hh:mm a')
                          
//                           return (
//                             <motion.button
//                               key={slot.id}
//                               initial={{ opacity: 0, scale: 0.9 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: index * 0.05 }}
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => setSelectedSlot(slot)}
//                               className={`
//                                 p-4 rounded-xl border-2 text-center transition-all duration-200
//                                 ${isSelected 
//                                   ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md' 
//                                   : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
//                                 }
//                               `}
//                             >
//                               <div className={`text-lg font-bold ${isSelected ? 'text-blue-600' : 'text-slate-800'}`}>
//                                 {time}
//                               </div>
//                               <div className="text-xs text-slate-500 mt-1">
//                                 {slot.duration || '2 hours'}
//                               </div>
//                               {isSelected && (
//                                 <div className="mt-2">
//                                   <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                                 </div>
//                               )}
//                             </motion.button>
//                           )
//                         })}
//                       </div>
//                     )}
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="no-date"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="text-center py-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200"
//                   >
//                     <CalendarIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
//                     <p className="text-slate-600">Select a date to view available times</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>

//           {/* Right Column - Booking Summary & Notes */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="space-y-6"
//           >
//             {/* Booking Summary Card */}
//             <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50 sticky top-8">
//               <h3 className="text-lg font-bold text-slate-800 mb-6">Booking Summary</h3>
              
//               {selectedSlot && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="space-y-4 mb-6"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600">Service</span>
//                     <span className="font-medium text-slate-800">{serviceDetails.title}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600">Date</span>
//                     <span className="font-medium text-slate-800">
//                       {selectedDate && format(parseISO(selectedDate), 'MMM d, yyyy')}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600">Time</span>
//                     <span className="font-medium text-slate-800">
//                       {selectedSlot && format(new Date(selectedSlot.startTime), 'hh:mm a')}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600">Duration</span>
//                     <span className="font-medium text-slate-800">{serviceDetails.duration}</span>
//                   </div>
//                   <div className="pt-4 border-t border-slate-200">
//                     <div className="flex items-center justify-between">
//                       <span className="text-slate-600">Total</span>
//                       <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//                         {serviceDetails.price}
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Notes Section */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center space-x-2">
//                   <MessageSquare className="w-4 h-4" />
//                   <span>Special Instructions (Optional)</span>
//                 </label>
//                 <textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   rows={4}
//                   className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                   placeholder="Share any specific requirements or details for the service provider..."
//                 />
//               </div>

//               {/* Book Button */}
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={onBook}
//                 disabled={!selectedSlot || bookingInProgress}
//                 className={`
//                   w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200
//                   ${selectedSlot
//                     ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl'
//                     : 'bg-slate-200 text-slate-500 cursor-not-allowed'
//                   }
//                 `}
//               >
//                 {bookingInProgress ? (
//                   <span className="flex items-center justify-center space-x-2">
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     <span>Processing...</span>
//                   </span>
//                 ) : selectedSlot ? (
//                   <span className="flex items-center justify-center space-x-2">
//                     <Sparkles className="w-5 h-5" />
//                     <span>Confirm Booking</span>
//                   </span>
//                 ) : (
//                   'Select a Time Slot'
//                 )}
//               </motion.button>

//               {/* Security Badge */}
//               <div className="mt-6 pt-6 border-t border-slate-200">
//                 <div className="flex items-center justify-center space-x-3 text-sm text-slate-600">
//                   <Shield className="w-5 h-5 text-green-500" />
//                   <span>Secure Payment • 24/7 Support • Easy Cancellation</span>
//                 </div>
//               </div>
//             </div>

//             {/* Why Book With Us */}
//             <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
//               <h4 className="text-lg font-bold mb-4">Why Book With QuickServe?</h4>
//               <ul className="space-y-3">
//                 <li className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span className="text-sm">Instant confirmation</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span className="text-sm">Verified professionals</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span className="text-sm">Flexible scheduling</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span className="text-sm">Satisfaction guarantee</span>
//                 </li>
//               </ul>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   )
// }







// import { useEffect, useMemo, useState } from 'react'
// import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
// import { getAvailableSlotsByListingApi, getAvailableSlotsByProviderApi } from '@/api/timeslots'
// import { createBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   addMonths,
//   subMonths,
//   isSameMonth,
//   isSameDay,
//   parseISO,
//   isToday,
//   isPast,
// } from 'date-fns'

// export default function BookService() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { user } = useAuth()
//   const providerFromState = location?.state?.providerId

//   const [slots, setSlots] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [notes, setNotes] = useState('')
//   const [currentMonth, setCurrentMonth] = useState(() => new Date())
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedSlot, setSelectedSlot] = useState(null)
//   const [booking, setBooking] = useState(false)

//   const serviceInfo = slots.length > 0 ? slots[0] : null

//   const load = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       let data = await getAvailableSlotsByListingApi(id)
//       if ((!data || data.length === 0) && providerFromState) {
//         const provData = await getAvailableSlotsByProviderApi(providerFromState)
//         data = provData || []
//       }
//       setSlots(data || [])
//       if (!selectedDate && data && data.length) {
//         const first = data[0]
//         const d = format(new Date(first.startTime), 'yyyy-MM-dd')
//         setSelectedDate(d)
//       }
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load availability')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [id, providerFromState])
  
//   useEffect(() => {
//     const t = setInterval(() => {
//       Promise.all([
//         getAvailableSlotsByListingApi(id).catch(() => []),
//         providerFromState ? getAvailableSlotsByProviderApi(providerFromState).catch(() => []) : Promise.resolve([]),
//       ]).then(([byListing, byProvider]) => {
//         const chosen = (byListing && byListing.length > 0) ? byListing : byProvider
//         if (Array.isArray(chosen)) setSlots(chosen)
//       }).catch(() => {})
//     }, 20000)
//     return () => clearInterval(t)
//   }, [id, providerFromState])

//   const onBook = async (slot) => {
//     setBooking(true)
//     try {
//       await createBookingApi({
//         customerId: user?.id,
//         providerId: slot.providerId,
//         listingId: slot.listingId,
//         bookingDateTime: slot.startTime,
//         notes: notes || undefined,
//       })
//       navigate('/customer/bookings', { replace: true })
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Booking failed')
//     } finally {
//       setBooking(false)
//     }
//   }

//   const weeks = useMemo(() => {
//     const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 })
//     const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
//     const days = []
//     let day = start
//     while (day <= end) {
//       days.push(day)
//       day = addDays(day, 1)
//     }
//     return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => days.slice(i * 7, i * 7 + 7))
//   }, [currentMonth])

//   const timesForSelectedDate = useMemo(() => {
//     if (!selectedDate) return []
//     return (slots || []).filter((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === selectedDate)
//       .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
//   }, [slots, selectedDate])

//   const availableDates = useMemo(() => {
//     return new Set(slots.map(s => format(new Date(s.startTime), 'yyyy-MM-dd')))
//   }, [slots])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-teal-100 shadow-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
//                 Book Your Service
//               </h1>
//               {serviceInfo && (
//                 <p className="text-sm text-gray-600 mt-1">
//                   {serviceInfo.serviceName || `Listing #${serviceInfo.listingId}`} • {serviceInfo.providerName || `Provider #${serviceInfo.providerId}`}
//                 </p>
//               )}
//             </div>
//             <Link 
//               className="px-4 py-2 rounded-xl border-2 border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition-all" 
//               to="/services"
//             >
//               ← Back
//             </Link>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center">
//             <div className="inline-block w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-600 font-medium">Loading availability...</p>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="max-w-4xl mx-auto p-6">
//           <div className="p-6 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//             <div className="flex items-center gap-3">
//               <span className="text-2xl">⚠</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           </div>
//         </div>
//       ) : slots.length === 0 ? (
//         <div className="max-w-4xl mx-auto p-6">
//           <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//             <div className="text-6xl mb-4">📅</div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">No Available Time Slots</h3>
//             <p className="text-gray-500">Please check back later or contact the provider</p>
//           </div>
//         </div>
//       ) : (
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Calendar Section - Takes 2 columns */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
//                 {/* Month Navigation */}
//                 <div className="flex items-center justify-between mb-8">
//                   <button 
//                     className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg"
//                     onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                   >
//                     <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
//                   <div className="text-center">
//                     <h2 className="text-3xl font-bold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h2>
//                     <p className="text-sm text-gray-500 mt-1">Select a date to view available times</p>
//                   </div>
//                   <button 
//                     className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg"
//                     onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                   >
//                     <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 {/* Day Headers */}
//                 <div className="grid grid-cols-7 gap-3 mb-4">
//                   {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
//                     <div key={d} className="text-center py-3 text-sm font-bold text-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
//                       {d}
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Calendar Grid */}
//                 <div className="grid grid-cols-7 gap-3">
//                   {weeks.map((week, wi) => (
//                     week.map((d) => {
//                       const ds = format(d, 'yyyy-MM-dd')
//                       const isSelected = selectedDate && isSameDay(d, parseISO(`${selectedDate}T00:00:00`))
//                       const isAvailable = availableDates.has(ds)
//                       const isCurrentMonth = isSameMonth(d, currentMonth)
//                       const isTodayDate = isToday(d)
//                       const isPastDate = isPast(d) && !isTodayDate
                      
//                       return (
//                         <button
//                           key={ds}
//                           onClick={() => isAvailable && setSelectedDate(ds)}
//                           disabled={!isAvailable || isPastDate}
//                           className={`
//                             aspect-square rounded-2xl flex flex-col items-center justify-center text-lg font-bold transition-all
//                             ${isSelected 
//                               ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-2xl scale-110 ring-4 ring-teal-200' 
//                               : isAvailable && isCurrentMonth && !isPastDate
//                               ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-400 text-teal-700 hover:scale-105 hover:shadow-xl'
//                               : isCurrentMonth && !isPastDate
//                               ? 'bg-white border-2 border-gray-200 text-gray-400'
//                               : 'bg-gray-50 border-2 border-gray-100 text-gray-300'
//                             }
//                             ${!isCurrentMonth ? 'opacity-40' : ''}
//                             ${isPastDate ? 'cursor-not-allowed opacity-30' : ''}
//                             ${isAvailable && !isPastDate ? 'cursor-pointer' : 'cursor-default'}
//                           `}
//                         >
//                           <span className={isTodayDate && !isSelected ? 'text-teal-600 font-extrabold' : ''}>
//                             {format(d, 'd')}
//                           </span>
//                           {isAvailable && isCurrentMonth && !isPastDate && (
//                             <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-teal-500'}`}></span>
//                           )}
//                         </button>
//                       )
//                     })
//                   ))}
//                 </div>

//                 {/* Legend */}
//                 <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-400"></div>
//                     <span className="text-sm text-gray-600">Available</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500"></div>
//                     <span className="text-sm text-gray-600">Selected</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-200"></div>
//                     <span className="text-sm text-gray-600">Unavailable</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Details Section */}
//             <div className="lg:col-span-1 space-y-6">
//               {/* Service Details Card */}
//               {serviceInfo && (
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Service Details</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase tracking-wide">Service</p>
//                       <p className="text-sm font-semibold text-gray-800">{serviceInfo.serviceName || `Listing #${serviceInfo.listingId}`}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase tracking-wide">Provider</p>
//                       <p className="text-sm font-semibold text-gray-800">{serviceInfo.providerName || `Provider #${serviceInfo.providerId}`}</p>
//                     </div>
//                     {serviceInfo.price && (
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
//                         <p className="text-xl font-bold text-teal-600">${serviceInfo.price}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Notes Card */}
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
//                 <label className="block text-sm font-bold text-gray-800 mb-3">📝 Add Notes (Optional)</label>
//                 <textarea 
//                   value={notes} 
//                   onChange={(e) => setNotes(e.target.value)} 
//                   rows={4} 
//                   className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none resize-none text-sm" 
//                   placeholder="Share any special requests or details..." 
//                 />
//               </div>

//               {/* Time Slots Card */}
//               {selectedDate && (
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">
//                     ⏰ {format(parseISO(`${selectedDate}T00:00:00`), 'EEEE, MMM dd')}
//                   </h3>
//                   <div className="space-y-2 max-h-64 overflow-y-auto">
//                     {timesForSelectedDate.length === 0 ? (
//                       <div className="text-center py-8 text-gray-500 text-sm">
//                         No times available
//                       </div>
//                     ) : (
//                       timesForSelectedDate.map((s) => (
//                         <button
//                           key={s.id}
//                           className={`w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
//                             selectedSlot?.id === s.id 
//                               ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg' 
//                               : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50'
//                           }`}
//                           onClick={() => setSelectedSlot(s)}
//                         >
//                           {format(new Date(s.startTime), 'hh:mm a')}
//                         </button>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Booking Button */}
//               <button
//                 disabled={!selectedSlot || booking}
//                 onClick={() => selectedSlot && onBook(selectedSlot)}
//                 className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-bold shadow-2xl hover:shadow-3xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
//               >
//                 {booking ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Processing...
//                   </span>
//                 ) : selectedSlot ? (
//                   `✓ Confirm Booking`
//                 ) : (
//                   'Select Date & Time'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }





// import { useEffect, useMemo, useState } from 'react'
// import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
// import { getAvailableSlotsByListingApi, getAvailableSlotsByProviderApi } from '@/api/timeslots'
// import { createBookingApi } from '@/api/bookings'
// import { useAuth } from '@/context/AuthContext'
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   addMonths,
//   subMonths,
//   isSameMonth,
//   isSameDay,
//   parseISO,
//   isToday,
//   isPast,
//   isBefore,
//   startOfDay,
// } from 'date-fns'

// export default function BookService() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { user } = useAuth()
//   const providerFromState = location?.state?.providerId

//   const [slots, setSlots] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [notes, setNotes] = useState('')
//   const [currentMonth, setCurrentMonth] = useState(() => new Date())
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedSlot, setSelectedSlot] = useState(null)
//   const [booking, setBooking] = useState(false)

//   const serviceInfo = slots.length > 0 ? slots[0] : null

//   const load = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       let data = await getAvailableSlotsByListingApi(id)
//       if ((!data || data.length === 0) && providerFromState) {
//         const provData = await getAvailableSlotsByProviderApi(providerFromState)
//         data = provData || []
//       }
//       setSlots(data || [])
//       if (!selectedDate && data && data.length) {
//         const first = data[0]
//         const d = format(new Date(first.startTime), 'yyyy-MM-dd')
//         setSelectedDate(d)
//       }
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load availability')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [id, providerFromState])
  
//   useEffect(() => {
//     const t = setInterval(() => {
//       Promise.all([
//         getAvailableSlotsByListingApi(id).catch(() => []),
//         providerFromState ? getAvailableSlotsByProviderApi(providerFromState).catch(() => []) : Promise.resolve([]),
//       ]).then(([byListing, byProvider]) => {
//         const chosen = (byListing && byListing.length > 0) ? byListing : byProvider
//         if (Array.isArray(chosen)) setSlots(chosen)
//       }).catch(() => {})
//     }, 20000)
//     return () => clearInterval(t)
//   }, [id, providerFromState])

//   const onBook = async (slot) => {
//     setBooking(true)
//     try {
//       await createBookingApi({
//         customerId: user?.id,
//         providerId: slot.providerId,
//         listingId: slot.listingId,
//         bookingDateTime: slot.startTime,
//         notes: notes || undefined,
//       })
//       navigate('/customer/bookings', { replace: true })
//     } catch (e) {
//       alert(e?.response?.data?.message || 'Booking failed')
//     } finally {
//       setBooking(false)
//     }
//   }

//   const weeks = useMemo(() => {
//     const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 })
//     const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
//     const days = []
//     let day = start
//     while (day <= end) {
//       days.push(day)
//       day = addDays(day, 1)
//     }
//     return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => days.slice(i * 7, i * 7 + 7))
//   }, [currentMonth])

//   const timesForSelectedDate = useMemo(() => {
//     if (!selectedDate) return []
//     return (slots || []).filter((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === selectedDate)
//       .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
//   }, [slots, selectedDate])

//   const availableDates = useMemo(() => {
//     return new Set(slots.map(s => format(new Date(s.startTime), 'yyyy-MM-dd')))
//   }, [slots])

//   const isDateDisabled = (date) => {
//     const dateStr = format(date, 'yyyy-MM-dd')
//     const isPastDate = isBefore(date, startOfDay(new Date()))
//     return !availableDates.has(dateStr) || isPastDate
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
//       {/* Header */}
//       <div className="bg-white border-b border-slate-200/80 backdrop-blur-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Book Appointment</h1>
//                 {serviceInfo && (
//                   <p className="text-sm text-slate-600 mt-1">
//                     {serviceInfo.serviceName || `Listing #${serviceInfo.listingId}`} • {serviceInfo.providerName || `Provider #${serviceInfo.providerId}`}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <Link 
//               className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow"
//               to="customer/services"
//             >
//               ← Back to Services
//             </Link>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center space-y-4">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full animate-pulse"></div>
//               </div>
//             </div>
//             <div>
//               <p className="text-slate-700 font-medium">Loading availability...</p>
//               <p className="text-sm text-slate-500 mt-1">Fetching the latest time slots</p>
//             </div>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="max-w-4xl mx-auto p-4 sm:p-6">
//           <div className="p-6 rounded-xl border border-red-200 bg-gradient-to-r from-red-50/50 to-rose-50/50 backdrop-blur-sm">
//             <div className="flex items-start space-x-3">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-red-800">Unable to load availability</h3>
//                 <p className="text-red-600 mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : slots.length === 0 ? (
//         <div className="max-w-4xl mx-auto p-4 sm:p-6">
//           <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-slate-300">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6">
//               <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-slate-800 mb-2">No Available Time Slots</h3>
//             <p className="text-slate-600 max-w-md mx-auto">There are no available appointments at the moment. Please check back later or contact the provider directly.</p>
//           </div>
//         </div>
//       ) : (
//         <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//             {/* Calendar Section */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Calendar Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
//                 <div className="p-6 md:p-8">
//                   {/* Month Navigation */}
//                   <div className="flex items-center justify-between mb-8">
//                     <button 
//                       className="p-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm active:scale-95"
//                       onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                     >
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                       </svg>
//                     </button>
//                     <div className="text-center">
//                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{format(currentMonth, 'MMMM yyyy')}</h2>
//                       <p className="text-sm text-slate-500 mt-1">Select an available date</p>
//                     </div>
//                     <button 
//                       className="p-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm active:scale-95"
//                       onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                     >
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   </div>
                  
//                   {/* Day Headers */}
//                   <div className="grid grid-cols-7 gap-1 mb-2">
//                     {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
//                       <div key={d} className="text-center py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">
//                         {d}
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* Calendar Grid */}
//                   <div className="grid grid-cols-7 gap-1">
//                     {weeks.map((week, wi) => (
//                       week.map((d) => {
//                         const ds = format(d, 'yyyy-MM-dd')
//                         const isSelected = selectedDate && isSameDay(d, parseISO(`${selectedDate}T00:00:00`))
//                         const isAvailable = availableDates.has(ds)
//                         const isCurrentMonth = isSameMonth(d, currentMonth)
//                         const isTodayDate = isToday(d)
//                         const disabled = isDateDisabled(d)
                        
//                         return (
//                           <button
//                             key={ds}
//                             onClick={() => !disabled && setSelectedDate(ds)}
//                             disabled={disabled}
//                             className={`
//                               aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all duration-200
//                               ${isSelected 
//                                 ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg scale-105 ring-2 ring-indigo-500 ring-offset-2' 
//                                 : isAvailable && isCurrentMonth && !disabled
//                                 ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-900 hover:scale-105 hover:shadow-md hover:border-indigo-300'
//                                 : isCurrentMonth && !disabled
//                                 ? 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
//                                 : 'bg-slate-50 border border-slate-100 text-slate-400'
//                               }
//                               ${!isCurrentMonth ? 'opacity-50' : ''}
//                               ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
//                               ${isTodayDate && !isSelected ? 'border-2 border-indigo-400' : ''}
//                             `}
//                           >
//                             <span className={`${isTodayDate && !isSelected ? 'text-indigo-600 font-bold' : ''}`}>
//                               {format(d, 'd')}
//                             </span>
//                             {isAvailable && isCurrentMonth && !disabled && (
//                               <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-indigo-500'}`}></span>
//                             )}
//                           </button>
//                         )
//                       })
//                     ))}
//                   </div>

//                   {/* Legend */}
//                   <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-200">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600"></div>
//                       <span className="text-xs text-slate-600 font-medium">Selected</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 border border-indigo-300"></div>
//                       <span className="text-xs text-slate-600 font-medium">Available</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-white border border-slate-300"></div>
//                       <span className="text-xs text-slate-600 font-medium">Unavailable</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full border-2 border-indigo-400 bg-white"></div>
//                       <span className="text-xs text-slate-600 font-medium">Today</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Selected Date Times */}
//               {selectedDate && (
//                 <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
//                       <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       Available Times for {format(parseISO(`${selectedDate}T00:00:00`), 'EEEE, MMMM d')}
//                     </h3>
//                     <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
//                       {timesForSelectedDate.length} slot{timesForSelectedDate.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                   {timesForSelectedDate.length === 0 ? (
//                     <div className="text-center py-8">
//                       <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <p className="text-slate-600 font-medium">No available times for this date</p>
//                       <p className="text-sm text-slate-500 mt-1">Please select another date</p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                       {timesForSelectedDate.map((s) => (
//                         <button
//                           key={s.id}
//                           onClick={() => setSelectedSlot(s)}
//                           className={`
//                             py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
//                             ${selectedSlot?.id === s.id 
//                               ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg ring-2 ring-indigo-500 ring-offset-2 transform scale-105' 
//                               : 'bg-white border border-slate-300 text-slate-900 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow'
//                             }
//                           `}
//                         >
//                           {format(new Date(s.startTime), 'h:mm a')}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Booking Details Sidebar */}
//             <div className="space-y-6">
//               {/* Service Details Card */}
//               {serviceInfo && (
//                 <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//                   <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200 flex items-center gap-2">
//                     <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                     </svg>
//                     Service Details
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Service</p>
//                       <p className="text-base font-semibold text-slate-900">{serviceInfo.serviceName || `Listing #${serviceInfo.listingId}`}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Provider</p>
//                       <p className="text-base font-semibold text-slate-900">{serviceInfo.providerName || `Provider #${serviceInfo.providerId}`}</p>
//                     </div>
//                     {serviceInfo.price && (
//                       <div>
//                         <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Price</p>
//                         <p className="text-2xl font-bold text-indigo-600">${serviceInfo.price}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Notes Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//                 <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                   Additional Notes (Optional)
//                 </label>
//                 <textarea 
//                   value={notes} 
//                   onChange={(e) => setNotes(e.target.value)} 
//                   rows={4} 
//                   className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 outline-none resize-none bg-white"
//                   placeholder="Any special requests, instructions, or information for your provider..."
//                 />
//                 <p className="text-xs text-slate-500 mt-2">This will be shared with your service provider</p>
//               </div>

//               {/* Booking Summary */}
//               <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Summary</h3>
                
//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-600">Date:</span>
//                     <span className="font-medium text-slate-900">
//                       {selectedDate ? format(parseISO(`${selectedDate}T00:00:00`), 'MMM d, yyyy') : '--'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-600">Time:</span>
//                     <span className="font-medium text-slate-900">
//                       {selectedSlot ? format(new Date(selectedSlot.startTime), 'h:mm a') : '--'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-600">Duration:</span>
//                     <span className="font-medium text-slate-900">
//                       {selectedSlot ? '1 hour' : '--'}
//                     </span>
//                   </div>
//                   {serviceInfo?.price && (
//                     <div className="flex items-center justify-between text-sm pt-3 border-t border-indigo-200/50">
//                       <span className="text-slate-600">Total:</span>
//                       <span className="text-lg font-bold text-indigo-600">${serviceInfo.price}</span>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   disabled={!selectedSlot || booking}
//                   onClick={() => selectedSlot && onBook(selectedSlot)}
//                   className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
//                 >
//                   {booking ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span>Confirm Appointment</span>
//                     </>
//                   )}
//                 </button>
                
//                 <p className="text-xs text-slate-600 text-center mt-4">
//                   You'll receive a confirmation email with appointment details
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { getAvailableSlotsByListingApi, getAvailableSlotsByProviderApi } from '@/api/timeslots'
import { createBookingApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO,
  isToday,
  isPast,
  isBefore,
  startOfDay,
} from 'date-fns'

export default function BookService() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const providerFromState = location?.state?.providerId
  const listingDataFromState = location?.state?.listingData

  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booking, setBooking] = useState(false)

  const serviceInfo = slots.length > 0 ? slots[0] : listingDataFromState

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      let data = await getAvailableSlotsByListingApi(id)

      setSlots(data || [])
      if (!selectedDate && data && data.length) {
        const first = data[0]
        const d = format(new Date(first.startTime), 'yyyy-MM-dd')
        setSelectedDate(d)
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id, providerFromState])
  
  useEffect(() => {
  const t = setInterval(() => {
    // Only poll for THIS listing's slots, not all provider slots
    getAvailableSlotsByListingApi(id)
      .then(data => {
        if (Array.isArray(data)) {
          setSlots(data)
        }
      })
      .catch(() => {})
  }, 20000)
  return () => clearInterval(t)
}, [id]) 

  const onBook = async (slot) => {
    setBooking(true)
    try {
      await createBookingApi({
        customerId: user?.id,
        providerId: slot.providerId,
        listingId: slot.listingId,
        bookingDateTime: slot.startTime,
        notes: notes || undefined,
      })
      navigate('/customer/bookings', { replace: true })
    } catch (e) {
      alert(e?.response?.data?.message || 'Booking failed')
    } finally {
      setBooking(false)
    }
  }

  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
    const days = []
    let day = start
    while (day <= end) {
      days.push(day)
      day = addDays(day, 1)
    }
    return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => days.slice(i * 7, i * 7 + 7))
  }, [currentMonth])

  const timesForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return (slots || []).filter((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === selectedDate)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
  }, [slots, selectedDate])

  const availableDates = useMemo(() => {
    return new Set(slots.map(s => format(new Date(s.startTime), 'yyyy-MM-dd')))
  }, [slots])

  const isDateDisabled = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const isPastDate = isBefore(date, startOfDay(new Date()))
    return !availableDates.has(dateStr) || isPastDate
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Book Appointment</h1>
                {serviceInfo && (
                  <p className="text-sm text-slate-600 mt-1">
                    {serviceInfo.serviceName || `Listing #${serviceInfo.listingId}`} • {serviceInfo.providerName || `Provider #${serviceInfo.providerId}`}
                  </p>
                )}
              </div>
            </div>
            <Link 
              className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow"
              to="/customer/services"
            >
              ← Back to Services
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <p className="text-slate-700 font-medium">Loading availability...</p>
              <p className="text-sm text-slate-500 mt-1">Fetching the latest time slots</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="p-6 rounded-xl border border-red-200 bg-gradient-to-r from-red-50/50 to-rose-50/50 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Unable to load availability</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      ) : slots.length === 0 ? (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6">
              <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Available Time Slots</h3>
            <p className="text-slate-600 max-w-md mx-auto">There are no available appointments at the moment. Please check back later or contact the provider directly.</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Calendar Section - Made more compact */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar Card - Reduced size */}
              <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
                <div className="p-4 md:p-6">
                  {/* Month Navigation - Made more compact */}
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      className="p-2 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 active:scale-95"
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="text-center">
                      <h2 className="text-lg font-bold text-slate-900">{format(currentMonth, 'MMMM yyyy')}</h2>
                      <p className="text-xs text-slate-500 mt-1">Select an available date</p>
                    </div>
                    <button 
                      className="p-2 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 active:scale-95"
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Day Headers - Reduced size */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S','M','T','W','T','F','S'].map((d) => (
                      <div key={d} className="text-center py-1.5 text-xs font-semibold text-slate-600">
                        {d}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Grid - Made cells smaller */}
                  <div className="grid grid-cols-7 gap-1">
                    {weeks.map((week, wi) => (
                      week.map((d) => {
                        const ds = format(d, 'yyyy-MM-dd')
                        const isSelected = selectedDate && isSameDay(d, parseISO(`${selectedDate}T00:00:00`))
                        const isAvailable = availableDates.has(ds)
                        const isCurrentMonth = isSameMonth(d, currentMonth)
                        const isTodayDate = isToday(d)
                        const disabled = isDateDisabled(d)
                        
                        return (
                          <button
                            key={ds}
                            onClick={() => !disabled && setSelectedDate(ds)}
                            disabled={disabled}
                            className={`
                              h-8 sm:h-10 w-8 sm:w-13 rounded-md flex items-center justify-center text-xs sm:text-sm transition-all duration-200
                              ${isSelected 
                                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow scale-105 ring-1 ring-indigo-500' 
                                : isAvailable && isCurrentMonth && !disabled
                                ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-900 hover:scale-105 hover:shadow hover:border-indigo-300'
                                : isCurrentMonth && !disabled
                                ? 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
                                : 'bg-slate-50 border border-slate-100 text-slate-400'
                              }
                              ${!isCurrentMonth ? 'opacity-50' : ''}
                              ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                              ${isTodayDate && !isSelected ? 'border-2 border-indigo-400' : ''}
                            `}
                          >
                            <span className={`${isTodayDate && !isSelected ? 'text-indigo-600 font-bold' : ''}`}>
                              {format(d, 'd')}
                            </span>
                            {isAvailable && isCurrentMonth && !disabled && (
                              <span className={`absolute w-1 h-1 rounded-full bottom-1 ${isSelected ? 'bg-white' : 'bg-indigo-500'}`}></span>
                            )}
                          </button>
                        )
                      })
                    ))}
                  </div>

                  {/* Legend - Made more compact */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600"></div>
                      <span className="text-xs text-slate-600">Selected</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 border border-indigo-300"></div>
                      <span className="text-xs text-slate-600">Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-white border border-slate-300"></div>
                      <span className="text-xs text-slate-600">Unavailable</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full border-2 border-indigo-400 bg-white"></div>
                      <span className="text-xs text-slate-600">Today</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Date Times - Made more compact */}
              {selectedDate && (
                <div className="bg-white rounded-xl shadow border border-slate-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {format(parseISO(`${selectedDate}T00:00:00`), 'EEE, MMM d')}
                    </h3>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {timesForSelectedDate.length} slot{timesForSelectedDate.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {timesForSelectedDate.length === 0 ? (
                    <div className="text-center py-4">
                      <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-slate-600 text-sm">No available times for this date</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                      {timesForSelectedDate.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSlot(s)}
                          className={`
                            py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200
                            ${selectedSlot?.id === s.id 
                              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow ring-1 ring-indigo-500 transform scale-105' 
                              : 'bg-white border border-slate-300 text-slate-900 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow'
                            }
                          `}
                        >
                          {format(new Date(s.startTime), 'h:mm a')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Booking Details Sidebar - Adjusted for compactness */}
            <div className="space-y-6">
              {/* Service Details Card - More compact */}
              {serviceInfo && (
                <div className="bg-white rounded-xl shadow border border-slate-200 p-4 md:p-6">
                  <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Service Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Service</p>
                      <p className="text-sm font-semibold text-slate-900">{serviceInfo.serviceName || `Listing #${serviceInfo.listingId}`}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Provider</p>
                      <p className="text-sm font-semibold text-slate-900">{serviceInfo.providerName || `Provider #${serviceInfo.providerId}`}</p>
                    </div>
                    {serviceInfo.price && (
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Price</p>
                        <p className="text-xl font-bold text-indigo-600">${serviceInfo.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes Card - More compact */}
              <div className="bg-white rounded-xl shadow border border-slate-200 p-4 md:p-6">
                <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Notes (Optional)
                </label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  rows={3} 
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 outline-none resize-none bg-white"
                  placeholder="Any special requests or instructions..."
                />
              </div>

              {/* Booking Summary - More compact */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-xl p-4 md:p-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">Booking Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Date:</span>
                    <span className="font-medium text-slate-900">
                      {selectedDate ? format(parseISO(`${selectedDate}T00:00:00`), 'MMM d, yyyy') : '--'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Time:</span>
                    <span className="font-medium text-slate-900">
                      {selectedSlot ? format(new Date(selectedSlot.startTime), 'h:mm a') : '--'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-medium text-slate-900">
                      {selectedSlot ? '1 hour' : '--'}
                    </span>
                  </div>
                  {serviceInfo?.price && (
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-indigo-200/50">
                      <span className="text-slate-600 font-semibold">Total:</span>
                      <span className="text-lg font-bold text-indigo-600">${serviceInfo.price}</span>
                    </div>
                  )}
                </div>

                <button
                  disabled={!selectedSlot || booking}
                  onClick={() => selectedSlot && onBook(selectedSlot)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-lg shadow hover:shadow-md hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {booking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Confirm Appointment</span>
                    </>
                  )}
                </button>
                
                <p className="text-xs text-slate-600 text-center mt-3">
                  Confirmation email will be sent
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}