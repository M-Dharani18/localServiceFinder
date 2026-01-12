// // import { useState, useEffect } from 'react'
// // import { Search, Briefcase, Mail, Star, TrendingUp, Eye, Phone, MapPin } from 'lucide-react'

// // export default function AdminProviders() {
// //   const [providers, setProviders] = useState([])
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     fetchProviders()
// //   }, [])

// //   const fetchProviders = async () => {
// //     setLoading(true)
// //     try {
// //       const response = await fetch('/api/admin/users/providers')
// //       if (response.ok) {
// //         const data = await response.json()
// //         setProviders(data)
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch providers:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const getProviderStats = (providerId) => {
// //     // You might want to fetch provider-specific stats
// //     return {
// //       totalListings: 5,
// //       totalBookings: 3,
// //       avgRating: 0,
// //       completedBookings: 0
// //     }
// //   }

// //   const filteredProviders = providers.filter(provider =>
// //     provider.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     provider.email.toLowerCase().includes(searchTerm.toLowerCase())
// //   )

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading providers...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Manage Providers</h1>
// //           <p className="text-gray-600 mt-1">View and manage service providers</p>
// //         </div>
// //         <div className="text-sm text-gray-500">
// //           {filteredProviders.length} providers
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search providers by name or email..."
// //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Providers Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredProviders.length === 0 ? (
// //           <div className="col-span-3 text-center p-12">
// //             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// //               <Briefcase className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
// //             <p className="text-gray-500">
// //               {searchTerm ? 'Try a different search term' : 'No service providers available'}
// //             </p>
// //           </div>
// //         ) : (
// //           filteredProviders.map((provider) => {
// //             const stats = getProviderStats(provider.id)
// //             return (
// //               <div key={provider.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
// //                 <div className="flex items-start justify-between mb-4">
// //                   <div className="flex items-center">
// //                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
// //                       {provider.username?.charAt(0) || provider.email?.charAt(0)}
// //                     </div>
// //                     <div className="ml-4">
// //                       <h3 className="font-bold text-gray-900">{provider.username}</h3>
// //                       <div className="flex items-center text-sm text-gray-500 mt-1">
// //                         <Mail className="w-3 h-3 mr-1" />
// //                         {provider.email}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Provider Stats */}
// //                 <div className="grid grid-cols-2 gap-4 mb-6">
// //                   <div className="text-center p-3 bg-blue-50 rounded-lg">
// //                     <div className="text-2xl font-bold text-blue-700">{stats.totalListings}</div>
// //                     <div className="text-xs text-blue-600">Listings</div>
// //                   </div>
// //                   <div className="text-center p-3 bg-emerald-50 rounded-lg">
// //                     <div className="text-2xl font-bold text-emerald-700">{stats.totalBookings}</div>
// //                     <div className="text-xs text-emerald-600">Bookings</div>
// //                   </div>
// //                 </div>

// //                 {/* Additional Info (if available) */}
// //                 <div className="space-y-2 text-sm text-gray-600">
// //                   {provider.phone && (
// //                     <div className="flex items-center gap-2">
// //                       <Phone className="w-4 h-4" />
// //                       {provider.phone}
// //                     </div>
// //                   )}
// //                   {provider.location && (
// //                     <div className="flex items-center gap-2">
// //                       <MapPin className="w-4 h-4" />
// //                       {provider.location}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-2 mt-6">
// //                   <button
// //                     className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
// //                     title="View provider details"
// //                   >
// //                     <Eye className="w-4 h-4" />
// //                     View Profile
// //                   </button>
// //                   <button
// //                     className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
// //                     title="View provider listings"
// //                   >
// //                     <TrendingUp className="w-4 h-4" />
// //                     Listings
// //                   </button>
// //                 </div>
// //               </div>
// //             )
// //           })
// //         )}
// //       </div>
// //     </div>
// //   )
// // }




// // import { useState, useEffect } from 'react'
// // import { Search, Briefcase, Mail, Star, TrendingUp, Eye, Phone, MapPin, X, Calendar, DollarSign, CheckCircle, MessageCircle } from 'lucide-react'

// // export default function AdminProviders() {
// //   const [providers, setProviders] = useState([])
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [loading, setLoading] = useState(true)
// //   const [selectedProvider, setSelectedProvider] = useState(null)

// //   useEffect(() => {
// //     fetchProviders()
// //   }, [])

// //   const fetchProviders = async () => {
// //     setLoading(true)
// //     try {
// //       const response = await fetch('/api/admin/users/providers')
// //       if (response.ok) {
// //         const data = await response.json()
// //         setProviders(data)
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch providers:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const getProviderStats = (providerId) => {
// //     // You might want to fetch provider-specific stats
// //     return {
// //       totalListings: 5,
// //       totalBookings: 3,
// //       avgRating: 4.2,
// //       completedBookings: 2,
// //       pendingBookings: 1,
// //       totalRevenue: 2500,
// //       responseRate: 85
// //     }
// //   }

// //   const getProviderReviews = (providerId) => {
// //     // Mock reviews - replace with actual API call
// //     return [
// //       { id: 1, user: "Customer A", rating: 5, comment: "Excellent service!", date: "2024-01-15" },
// //       { id: 2, user: "Customer B", rating: 4, comment: "Good work, timely completion", date: "2024-01-10" },
// //       { id: 3, user: "Customer C", rating: 5, comment: "Highly recommended", date: "2024-01-05" }
// //     ]
// //   }

// //   const handleViewProfile = (provider) => {
// //     const stats = getProviderStats(provider.id)
// //     const reviews = getProviderReviews(provider.id)
// //     setSelectedProvider({ ...provider, stats, reviews })
// //   }

// //   const closeProfileOverlay = () => {
// //     setSelectedProvider(null)
// //   }

// //   const filteredProviders = providers.filter(provider =>
// //     provider.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     provider.email?.toLowerCase().includes(searchTerm.toLowerCase())
// //   )

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading providers...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Manage Providers</h1>
// //           <p className="text-gray-600 mt-1">View and manage service providers</p>
// //         </div>
// //         <div className="text-sm text-gray-500">
// //           {filteredProviders.length} providers
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search providers by name or email..."
// //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Providers Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredProviders.length === 0 ? (
// //           <div className="col-span-3 text-center p-12">
// //             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// //               <Briefcase className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
// //             <p className="text-gray-500">
// //               {searchTerm ? 'Try a different search term' : 'No service providers available'}
// //             </p>
// //           </div>
// //         ) : (
// //           filteredProviders.map((provider) => {
// //             const stats = getProviderStats(provider.id)
// //             return (
// //               <div key={provider.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
// //                 <div className="flex items-start justify-between mb-4">
// //                   <div className="flex items-center">
// //                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
// //                       {provider.username?.charAt(0) || provider.email?.charAt(0)}
// //                     </div>
// //                     <div className="ml-4">
// //                       <h3 className="font-bold text-gray-900">{provider.username}</h3>
// //                       <div className="flex items-center text-sm text-gray-500 mt-1">
// //                         <Mail className="w-3 h-3 mr-1" />
// //                         {provider.email}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Provider Stats */}
// //                 <div className="grid grid-cols-2 gap-4 mb-6">
// //                   <div className="text-center p-3 bg-blue-50 rounded-lg">
// //                     <div className="text-2xl font-bold text-blue-700">{stats.totalListings}</div>
// //                     <div className="text-xs text-blue-600">Listings</div>
// //                   </div>
// //                   <div className="text-center p-3 bg-emerald-50 rounded-lg">
// //                     <div className="text-2xl font-bold text-emerald-700">{stats.totalBookings}</div>
// //                     <div className="text-xs text-emerald-600">Bookings</div>
// //                   </div>
// //                 </div>

// //                 {/* Additional Info */}
// //                 <div className="space-y-2 text-sm text-gray-600">
// //                   {provider.phone && (
// //                     <div className="flex items-center gap-2">
// //                       <Phone className="w-4 h-4" />
// //                       {provider.phone}
// //                     </div>
// //                   )}
// //                   {provider.location && (
// //                     <div className="flex items-center gap-2">
// //                       <MapPin className="w-4 h-4" />
// //                       {provider.location}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-2 mt-6">
// //                   <button
// //                     onClick={() => handleViewProfile(provider)}
// //                     className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
// //                   >
// //                     <Eye className="w-4 h-4" />
// //                     View Profile
// //                   </button>
// //                   <button
// //                     className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
// //                   >
// //                     <TrendingUp className="w-4 h-4" />
// //                     Listings
// //                   </button>
// //                 </div>
// //               </div>
// //             )
// //           })
// //         )}
// //       </div>

// //       {/* Profile Overlay */}
// //       {selectedProvider && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
// //             {/* Header */}
// //             <div className="flex justify-between items-center p-6 border-b">
// //               <div className="flex items-center">
// //                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
// //                   {selectedProvider.username?.charAt(0) || selectedProvider.email?.charAt(0)}
// //                 </div>
// //                 <div className="ml-4">
// //                   <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.username}</h2>
// //                   <p className="text-gray-600">{selectedProvider.email}</p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={closeProfileOverlay}
// //                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 <X className="w-6 h-6 text-gray-500" />
// //               </button>
// //             </div>

// //             {/* Content */}
// //             <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
// //               {/* Contact Info */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //                 <div className="space-y-3">
// //                   <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
// //                   <div className="space-y-2">
// //                     {selectedProvider.phone && (
// //                       <div className="flex items-center gap-3 text-gray-700">
// //                         <Phone className="w-5 h-5 text-blue-500" />
// //                         <span>{selectedProvider.phone}</span>
// //                       </div>
// //                     )}
// //                     {selectedProvider.location && (
// //                       <div className="flex items-center gap-3 text-gray-700">
// //                         <MapPin className="w-5 h-5 text-red-500" />
// //                         <span>{selectedProvider.location}</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Statistics */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div className="bg-blue-50 p-4 rounded-xl">
// //                       <div className="flex items-center justify-between">
// //                         <Calendar className="w-8 h-8 text-blue-500" />
// //                         <div className="text-right">
// //                           <div className="text-2xl font-bold text-gray-900">{selectedProvider.stats.totalBookings}</div>
// //                           <div className="text-sm text-gray-600">Total Bookings</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="bg-green-50 p-4 rounded-xl">
// //                       <div className="flex items-center justify-between">
// //                         <DollarSign className="w-8 h-8 text-green-500" />
// //                         <div className="text-right">
// //                           <div className="text-2xl font-bold text-gray-900">${selectedProvider.stats.totalRevenue}</div>
// //                           <div className="text-sm text-gray-600">Revenue</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="bg-purple-50 p-4 rounded-xl">
// //                       <div className="flex items-center justify-between">
// //                         <CheckCircle className="w-8 h-8 text-purple-500" />
// //                         <div className="text-right">
// //                           <div className="text-2xl font-bold text-gray-900">{selectedProvider.stats.completedBookings}</div>
// //                           <div className="text-sm text-gray-600">Completed</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="bg-amber-50 p-4 rounded-xl">
// //                       <div className="flex items-center justify-between">
// //                         <MessageCircle className="w-8 h-8 text-amber-500" />
// //                         <div className="text-right">
// //                           <div className="text-2xl font-bold text-gray-900">{selectedProvider.stats.responseRate}%</div>
// //                           <div className="text-sm text-gray-600">Response Rate</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Rating and Reviews */}
// //               <div className="mb-8">
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating & Reviews</h3>
// //                 <div className="flex items-center gap-4 mb-6">
// //                   <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl">
// //                     <div className="text-3xl font-bold">{selectedProvider.stats.avgRating.toFixed(1)}</div>
// //                     <div className="text-sm opacity-90">Average Rating</div>
// //                   </div>
// //                   <div className="flex gap-1">
// //                     {[...Array(5)].map((_, i) => (
// //                       <Star
// //                         key={i}
// //                         className={`w-6 h-6 ${
// //                           i < Math.floor(selectedProvider.stats.avgRating)
// //                             ? 'text-amber-500 fill-amber-500'
// //                             : 'text-gray-300'
// //                         }`}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Reviews List */}
// //                 <div className="space-y-4">
// //                   <h4 className="font-medium text-gray-900">Recent Reviews</h4>
// //                   {selectedProvider.reviews.map((review) => (
// //                     <div key={review.id} className="border border-gray-200 rounded-xl p-4">
// //                       <div className="flex justify-between items-start mb-2">
// //                         <div>
// //                           <div className="font-medium text-gray-900">{review.user}</div>
// //                           <div className="flex gap-1 mt-1">
// //                             {[...Array(5)].map((_, i) => (
// //                               <Star
// //                                 key={i}
// //                                 className={`w-4 h-4 ${
// //                                   i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
// //                                 }`}
// //                               />
// //                             ))}
// //                           </div>
// //                         </div>
// //                         <div className="text-sm text-gray-500">{review.date}</div>
// //                       </div>
// //                       <p className="text-gray-700">{review.comment}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Listing Summary */}
// //               <div>
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Listing Summary</h3>
// //                 <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <div className="text-4xl font-bold text-gray-900">{selectedProvider.stats.totalListings}</div>
// //                       <div className="text-gray-600">Active Listings</div>
// //                     </div>
// //                     <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
// //                       View All Listings
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }






// // import { useState, useEffect } from 'react'
// // import { Search, Briefcase, Mail, Star, TrendingUp, Eye, Phone, MapPin, X, Calendar, DollarSign, CheckCircle, MessageCircle } from 'lucide-react'

// // export default function AdminProviders() {
// //   const [providers, setProviders] = useState([])
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [loading, setLoading] = useState(true)
// //   const [selectedProvider, setSelectedProvider] = useState(null)
// //   const [providerDetails, setProviderDetails] = useState(null)
// //   const [loadingDetails, setLoadingDetails] = useState(false)

// //   useEffect(() => {
// //     fetchProviders()
// //   }, [])

// //   // Fetch all providers with stats
// //   const fetchProviders = async () => {
// //     setLoading(true)
// //     try {
// //       const response = await fetch('/api/admin/providers')
// //       if (response.ok) {
// //         const data = await response.json()
// //         setProviders(data)
// //       } else {
// //         console.error('Failed to fetch providers:', response.status)
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch providers:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Fetch detailed provider information
// //   const fetchProviderDetails = async (providerId) => {
// //     setLoadingDetails(true)
// //     try {
// //       const [statsRes, reviewsRes, listingsRes] = await Promise.all([
// //         fetch(`/api/admin/providers/${providerId}/stats`),
// //         fetch(`/api/admin/providers/${providerId}/reviews`),
// //         fetch(`/api/admin/providers/${providerId}/listings`)
// //       ])

// //       if (statsRes.ok && reviewsRes.ok && listingsRes.ok) {
// //         const [statsData, reviewsData, listingsData] = await Promise.all([
// //           statsRes.json(),
// //           reviewsRes.json(),
// //           listingsRes.json()
// //         ])
        
// //         setProviderDetails({
// //           stats: statsData,
// //           reviews: reviewsData,
// //           listings: listingsData
// //         })
// //       } else {
// //         console.error('Failed to fetch provider details')
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch provider details:', error)
// //     } finally {
// //       setLoadingDetails(false)
// //     }
// //   }

// //   const handleViewProfile = async (provider) => {
// //     setSelectedProvider(provider)
// //     await fetchProviderDetails(provider.id)
// //   }

// //   const closeProfileOverlay = () => {
// //     setSelectedProvider(null)
// //     setProviderDetails(null)
// //   }

// //   const searchProviders = async () => {
// //     setLoading(true)
// //     try {
// //       let url = '/api/admin/providers/search'
// //       const params = new URLSearchParams()
      
// //       if (searchTerm) params.append('keyword', searchTerm)
      
// //       if (params.toString()) {
// //         url += '?' + params.toString()
// //       }
      
// //       const response = await fetch(url)
// //       if (response.ok) {
// //         const data = await response.json()
// //         setProviders(data)
// //       }
// //     } catch (error) {
// //       console.error('Failed to search providers:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const filteredProviders = providers.filter(provider =>
// //     provider.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     provider.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     (provider.location && provider.location.toLowerCase().includes(searchTerm.toLowerCase()))
// //   )

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading providers...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Manage Providers</h1>
// //           <p className="text-gray-600 text-sm mt-0.5">View and manage service providers</p>
// //         </div>
// //         <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
// //           {filteredProviders.length} providers
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search providers by name, email, or location..."
// //             className="w-full pl-9 pr-20 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && searchProviders()}
// //           />
// //           <button
// //             onClick={searchProviders}
// //             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-700"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {/* Providers Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredProviders.length === 0 ? (
// //           <div className="col-span-3 text-center p-12">
// //             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// //               <Briefcase className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
// //             <p className="text-gray-500">
// //               {searchTerm ? 'Try a different search term' : 'No service providers available'}
// //             </p>
// //           </div>
// //         ) : (
// //           filteredProviders.map((provider) => (
// //             <div key={provider.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
// //               <div className="flex items-start justify-between mb-4">
// //                 <div className="flex items-center">
// //                   <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
// //                     {provider.username?.charAt(0)?.toUpperCase() || provider.email?.charAt(0)?.toUpperCase()}
// //                   </div>
// //                   <div className="ml-4">
// //                     <h3 className="font-bold text-gray-900">{provider.username}</h3>
// //                     <div className="flex items-center text-sm text-gray-500 mt-1">
// //                       <Mail className="w-3 h-3 mr-1" />
// //                       {provider.email}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Provider Stats from API */}
// //               <div className="grid grid-cols-2 gap-4 mb-6">
// //                 <div className="text-center p-3 bg-blue-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-blue-700">{provider.totalListings || 0}</div>
// //                   <div className="text-xs text-blue-600">Listings</div>
// //                 </div>
// //                 <div className="text-center p-3 bg-emerald-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-emerald-700">{provider.totalBookings || 0}</div>
// //                   <div className="text-xs text-emerald-600">Bookings</div>
// //                 </div>
// //                 <div className="text-center p-3 bg-amber-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-amber-700">{provider.avgRating?.toFixed(1) || '0.0'}</div>
// //                   <div className="text-xs text-amber-600">Rating</div>
// //                 </div>
// //                 <div className="text-center p-3 bg-purple-50 rounded-lg">
// //                   <div className="text-2xl font-bold text-purple-700">{provider.responseRate || 0}%</div>
// //                   <div className="text-xs text-purple-600">Response</div>
// //                 </div>
// //               </div>

// //               {/* Additional Info */}
// //               <div className="space-y-2 text-sm text-gray-600 mb-4">
// //                 {provider.location && (
// //                   <div className="flex items-center gap-2">
// //                     <MapPin className="w-4 h-4 text-red-500" />
// //                     <span className="font-medium">{provider.location}</span>
// //                   </div>
// //                 )}
// //                 <div className="text-sm text-gray-500">
// //                   Joined: {new Date(provider.joinedAt || provider.createdAt).toLocaleDateString()}
// //                 </div>
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex gap-2 mt-6">
// //                 <button
// //                   onClick={() => handleViewProfile(provider)}
// //                   className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
// //                 >
// //                   <Eye className="w-4 h-4" />
// //                   View Profile
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     // Navigate to provider listings or open in new tab
// //                     window.open(`/admin/listings?provider=${provider.id}`, '_blank')
// //                   }}
// //                   className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
// //                 >
// //                   <TrendingUp className="w-4 h-4" />
// //                   Listings
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Profile Overlay with Real Data */}
// //       {selectedProvider && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
// //             {/* Header */}
// //             <div className="flex justify-between items-center p-6 border-b">
// //               <div className="flex items-center">
// //                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
// //                   {selectedProvider.username?.charAt(0)?.toUpperCase() || selectedProvider.email?.charAt(0)?.toUpperCase()}
// //                 </div>
// //                 <div className="ml-4">
// //                   <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.username}</h2>
// //                   <p className="text-gray-600">{selectedProvider.email}</p>
// //                   <p className="text-sm text-gray-500 mt-1">
// //                     Joined on {new Date(selectedProvider.joinedAt || selectedProvider.createdAt).toLocaleDateString()}
// //                   </p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={closeProfileOverlay}
// //                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 <X className="w-6 h-6 text-gray-500" />
// //               </button>
// //             </div>

// //             {/* Content */}
// //             <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
// //               {loadingDetails ? (
// //                 <div className="flex items-center justify-center py-12">
// //                   <div className="text-center">
// //                     <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
// //                     <p className="text-gray-600">Loading provider details...</p>
// //                   </div>
// //                 </div>
// //               ) : providerDetails ? (
// //                 <>
// //                   {/* Contact Info */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //                     <div className="space-y-3">
// //                       <h3 className="text-lg font-semibold text-gray-900">Provider Information</h3>
// //                       <div className="space-y-2">
// //                         <div className="flex items-center gap-3 text-gray-700">
// //                           <Mail className="w-5 h-5 text-blue-500" />
// //                           <span>{selectedProvider.email}</span>
// //                         </div>
// //                         {selectedProvider.location && (
// //                           <div className="flex items-center gap-3 text-gray-700">
// //                             <MapPin className="w-5 h-5 text-red-500" />
// //                             <span className="font-medium">{selectedProvider.location}</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Statistics */}
// //                     <div>
// //                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div className="bg-blue-50 p-4 rounded-xl">
// //                           <div className="flex items-center justify-between">
// //                             <Calendar className="w-8 h-8 text-blue-500" />
// //                             <div className="text-right">
// //                               <div className="text-2xl font-bold text-gray-900">{providerDetails.stats?.totalBookings || 0}</div>
// //                               <div className="text-sm text-gray-600">Total Bookings</div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="bg-green-50 p-4 rounded-xl">
// //                           <div className="flex items-center justify-between">
// //                             <DollarSign className="w-8 h-8 text-green-500" />
// //                             <div className="text-right">
// //                               <div className="text-2xl font-bold text-gray-900">${providerDetails.stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
// //                               <div className="text-sm text-gray-600">Revenue</div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="bg-purple-50 p-4 rounded-xl">
// //                           <div className="flex items-center justify-between">
// //                             <CheckCircle className="w-8 h-8 text-purple-500" />
// //                             <div className="text-right">
// //                               <div className="text-2xl font-bold text-gray-900">{providerDetails.stats?.completedBookings || 0}</div>
// //                               <div className="text-sm text-gray-600">Completed</div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="bg-amber-50 p-4 rounded-xl">
// //                           <div className="flex items-center justify-between">
// //                             <MessageCircle className="w-8 h-8 text-amber-500" />
// //                             <div className="text-right">
// //                               <div className="text-2xl font-bold text-gray-900">{providerDetails.stats?.responseRate || 0}%</div>
// //                               <div className="text-sm text-gray-600">Response Rate</div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Rating and Reviews */}
// //                   <div className="mb-8">
// //                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating & Reviews</h3>
// //                     <div className="flex items-center gap-4 mb-6">
// //                       <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl">
// //                         <div className="text-3xl font-bold">{providerDetails.stats?.avgRating?.toFixed(1) || '0.0'}</div>
// //                         <div className="text-sm opacity-90">Average Rating</div>
// //                       </div>
// //                       <div className="flex gap-1">
// //                         {[...Array(5)].map((_, i) => (
// //                           <Star
// //                             key={i}
// //                             className={`w-6 h-6 ${
// //                               i < Math.floor(providerDetails.stats?.avgRating || 0)
// //                                 ? 'text-amber-500 fill-amber-500'
// //                                 : 'text-gray-300'
// //                             }`}
// //                           />
// //                         ))}
// //                       </div>
// //                       <div className="text-gray-600 ml-4">
// //                         ({providerDetails.reviews?.length || 0} reviews)
// //                       </div>
// //                     </div>

// //                     {/* Reviews List */}
// //                     <div className="space-y-4">
// //                       <h4 className="font-medium text-gray-900">Recent Reviews</h4>
// //                       {providerDetails.reviews && providerDetails.reviews.length > 0 ? (
// //                         providerDetails.reviews.slice(0, 5).map((review) => (
// //                           <div key={review.id} className="border border-gray-200 rounded-xl p-4">
// //                             <div className="flex justify-between items-start mb-2">
// //                               <div>
// //                                 <div className="font-medium text-gray-900">{review.userName || 'Customer'}</div>
// //                                 <div className="flex gap-1 mt-1">
// //                                   {[...Array(5)].map((_, i) => (
// //                                     <Star
// //                                       key={i}
// //                                       className={`w-4 h-4 ${
// //                                         i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
// //                                       }`}
// //                                     />
// //                                   ))}
// //                                 </div>
// //                               </div>
// //                               <div className="text-sm text-gray-500">
// //                                 {new Date(review.createdAt).toLocaleDateString()}
// //                               </div>
// //                             </div>
// //                             <p className="text-gray-700">{review.comment}</p>
// //                           </div>
// //                         ))
// //                       ) : (
// //                         <p className="text-gray-500 text-center py-4">No reviews yet</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Listing Summary */}
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Listing Summary</h3>
// //                     <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <div className="text-4xl font-bold text-gray-900">{providerDetails.stats?.totalListings || 0}</div>
// //                           <div className="text-gray-600">Active Listings</div>
// //                         </div>
// //                         <button 
// //                           onClick={() => {
// //                             // Navigate to provider listings
// //                             window.open(`/admin/listings?provider=${selectedProvider.id}`, '_blank')
// //                           }}
// //                           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
// //                         >
// //                           View All Listings
// //                         </button>
// //                       </div>
// //                       {providerDetails.listings && providerDetails.listings.length > 0 && (
// //                         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
// //                           {providerDetails.listings.slice(0, 4).map((listing) => (
// //                             <div key={listing.id} className="bg-white/80 p-3 rounded-lg border">
// //                               <div className="font-medium text-gray-900">{listing.title || listing.serviceName}</div>
// //                               <div className="text-sm text-gray-600 mt-1">${listing.price} • {listing.category}</div>
// //                               <div className="text-xs text-gray-500 mt-1">
// //                                 Status: <span className={`font-medium ${listing.status === 'APPROVED' ? 'text-green-600' : 'text-amber-600'}`}>
// //                                   {listing.status}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                           ))}
// //                           {providerDetails.listings.length > 4 && (
// //                             <div className="text-center text-gray-500 text-sm">
// //                               +{providerDetails.listings.length - 4} more listings
// //                             </div>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="text-center py-12">
// //                   <p className="text-gray-500">Failed to load provider details</p>
// //                   <button 
// //                     onClick={() => fetchProviderDetails(selectedProvider.id)}
// //                     className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
// //                   >
// //                     Retry
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// // import { useState, useEffect } from 'react'
// // import { Search, Briefcase, Mail, Star, TrendingUp, Eye, Phone, MapPin, X, Calendar, DollarSign, CheckCircle, MessageCircle, Award, BarChart3 } from 'lucide-react'

// // export default function AdminProviders() {
// //   const [providers, setProviders] = useState([])
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [loading, setLoading] = useState(true)
// //   const [selectedProvider, setSelectedProvider] = useState(null)
// //   const [providerDetails, setProviderDetails] = useState(null)
// //   const [loadingDetails, setLoadingDetails] = useState(false)

// //   useEffect(() => {
// //     fetchProviders()
// //   }, [])

// //   const fetchProviders = async () => {
// //     setLoading(true)
// //     try {
// //       const response = await fetch('/api/admin/providers')
// //       if (response.ok) {
// //         const data = await response.json()
// //         setProviders(data)
// //       } else {
// //         console.error('Failed to fetch providers:', response.status)
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch providers:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const fetchProviderDetails = async (providerId) => {
// //     setLoadingDetails(true)
// //     try {
// //       const [statsRes, reviewsRes, listingsRes] = await Promise.all([
// //         fetch(`/api/admin/providers/${providerId}/stats`),
// //         fetch(`/api/admin/providers/${providerId}/reviews`),
// //         fetch(`/api/admin/providers/${providerId}/listings`)
// //       ])

// //       if (statsRes.ok && reviewsRes.ok && listingsRes.ok) {
// //         const [statsData, reviewsData, listingsData] = await Promise.all([
// //           statsRes.json(),
// //           reviewsRes.json(),
// //           listingsRes.json()
// //         ])
        
// //         setProviderDetails({
// //           stats: statsData,
// //           reviews: reviewsData,
// //           listings: listingsData
// //         })
// //       } else {
// //         console.error('Failed to fetch provider details')
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch provider details:', error)
// //     } finally {
// //       setLoadingDetails(false)
// //     }
// //   }

// //   const handleViewProfile = async (provider) => {
// //     setSelectedProvider(provider)
// //     await fetchProviderDetails(provider.id)
// //   }

// //   const closeProfileOverlay = () => {
// //     setSelectedProvider(null)
// //     setProviderDetails(null)
// //   }

// //   const searchProviders = async () => {
// //     setLoading(true)
// //     try {
// //       let url = '/api/admin/providers/search'
// //       const params = new URLSearchParams()
      
// //       if (searchTerm) params.append('keyword', searchTerm)
      
// //       if (params.toString()) {
// //         url += '?' + params.toString()
// //       }
      
// //       const response = await fetch(url)
// //       if (response.ok) {
// //         const data = await response.json()
// //         setProviders(data)
// //       }
// //     } catch (error) {
// //       console.error('Failed to search providers:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const filteredProviders = providers.filter(provider =>
// //     provider.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     provider.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     (provider.location && provider.location.toLowerCase().includes(searchTerm.toLowerCase()))
// //   )

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading providers...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
// //       {/* Header with Stats */}
// //       <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-4 text-white">
// //         <div className="flex justify-between items-center">
// //           <div>
// //             <h1 className="text-2xl font-bold">Provider Management</h1>
// //             <p className="text-purple-100 text-sm">Manage and monitor service providers</p>
// //           </div>
// //           <div className="flex gap-4">
// //             <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
// //               <div className="text-2xl font-bold">{filteredProviders.length}</div>
// //               <div className="text-xs opacity-90">Total</div>
// //             </div>
// //             <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
// //               <div className="text-2xl font-bold">{filteredProviders.filter(p => p.totalListings > 0).length}</div>
// //               <div className="text-xs opacity-90">Active</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search */}
// //         <div className="relative mt-3">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search by name, email, or location..."
// //             className="w-full pl-10 pr-24 py-2.5 text-sm text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-lg focus:ring-2 focus:ring-white shadow-lg placeholder-gray-500"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && searchProviders()}
// //           />
// //           <button
// //             onClick={searchProviders}
// //             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 shadow-md"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {/* Providers Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
// //         {filteredProviders.length === 0 ? (
// //           <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm">
// //             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-3">
// //               <Briefcase className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-1">No providers found</h3>
// //             <p className="text-sm text-gray-500">
// //               {searchTerm ? 'Try a different search term' : 'No service providers available'}
// //             </p>
// //           </div>
// //         ) : (
// //           filteredProviders.map((provider) => (
// //             <div key={provider.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
// //               {/* Card Header with Gradient */}
// //               <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 relative">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-purple-600 font-bold text-lg shadow-md">
// //                       {provider.username?.charAt(0)?.toUpperCase() || provider.email?.charAt(0)?.toUpperCase()}
// //                     </div>
// //                     <div className="text-white">
// //                       <h3 className="font-bold text-sm truncate max-w-[120px]">{provider.username}</h3>
// //                       <div className="flex items-center gap-1 text-xs opacity-90">
// //                         <Calendar className="w-3 h-3" />
// //                         {new Date(provider.joinedAt || provider.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
// //                     <div className="flex items-center gap-1">
// //                       <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
// //                       <span className="text-white font-bold text-sm">{provider.avgRating?.toFixed(1) || '0.0'}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Card Body */}
// //               <div className="p-3">
// //                 {/* Contact Info */}
// //                 <div className="mb-3 space-y-1">
// //                   <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-md p-1.5">
// //                     <Mail className="w-3 h-3 text-blue-500 flex-shrink-0" />
// //                     <span className="truncate">{provider.email}</span>
// //                   </div>
// //                   {provider.location && (
// //                     <div className="flex items-center gap-2 text-xs text-gray-700 bg-red-50 rounded-md p-1.5">
// //                       <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
// //                       <span className="truncate font-medium">{provider.location}</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Stats Grid */}
// //                 <div className="grid grid-cols-4 gap-1.5 mb-3">
// //                   <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
// //                     <div className="text-lg font-bold text-blue-700">{provider.totalListings || 0}</div>
// //                     <div className="text-[10px] text-blue-600 font-medium">Listings</div>
// //                   </div>
// //                   <div className="text-center p-2 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
// //                     <div className="text-lg font-bold text-emerald-700">{provider.totalBookings || 0}</div>
// //                     <div className="text-[10px] text-emerald-600 font-medium">Bookings</div>
// //                   </div>
// //                   <div className="text-center p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
// //                     <div className="text-lg font-bold text-amber-700">{provider.avgRating?.toFixed(1) || '0.0'}</div>
// //                     <div className="text-[10px] text-amber-600 font-medium">Rating</div>
// //                   </div>
// //                   <div className="text-center p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
// //                     <div className="text-lg font-bold text-purple-700">{provider.responseRate || 0}%</div>
// //                     <div className="text-[10px] text-purple-600 font-medium">Response</div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => handleViewProfile(provider)}
// //                     className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm text-xs font-semibold"
// //                   >
// //                     <Eye className="w-3.5 h-3.5" />
// //                     View
// //                   </button>
// //                   <button
// //                     onClick={() => window.open(`/admin/listings?provider=${provider.id}`, '_blank')}
// //                     className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm text-xs font-semibold"
// //                   >
// //                     <TrendingUp className="w-3.5 h-3.5" />
// //                     Listings
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Profile Overlay */}
// //       {selectedProvider && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
// //           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
// //             {/* Modal Header */}
// //             <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white relative">
// //               <button
// //                 onClick={closeProfileOverlay}
// //                 className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-lg transition-colors"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //               <div className="flex items-center gap-3">
// //                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-purple-600 font-bold text-2xl shadow-lg">
// //                   {selectedProvider.username?.charAt(0)?.toUpperCase() || selectedProvider.email?.charAt(0)?.toUpperCase()}
// //                 </div>
// //                 <div>
// //                   <h2 className="text-2xl font-bold">{selectedProvider.username}</h2>
// //                   <p className="text-purple-100 text-sm">{selectedProvider.email}</p>
// //                   <p className="text-xs text-purple-200 mt-1">
// //                     Member since {new Date(selectedProvider.joinedAt || selectedProvider.createdAt).toLocaleDateString()}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Modal Content */}
// //             <div className="overflow-y-auto max-h-[calc(95vh-130px)] bg-gray-50">
// //               {loadingDetails ? (
// //                 <div className="flex items-center justify-center py-20">
// //                   <div className="text-center">
// //                     <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
// //                     <p className="text-sm text-gray-600">Loading details...</p>
// //                   </div>
// //                 </div>
// //               ) : providerDetails ? (
// //                 <div className="p-4 space-y-3">
// //                   {/* Quick Stats Row */}
// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                     <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <Calendar className="w-6 h-6 opacity-80" />
// //                         <Award className="w-5 h-5 opacity-60" />
// //                       </div>
// //                       <div className="text-3xl font-bold">{providerDetails.stats?.totalBookings || 0}</div>
// //                       <div className="text-xs opacity-90 font-medium">Total Bookings</div>
// //                     </div>
// //                     <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl text-white shadow-lg">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <DollarSign className="w-6 h-6 opacity-80" />
// //                         <BarChart3 className="w-5 h-5 opacity-60" />
// //                       </div>
// //                       <div className="text-3xl font-bold">${providerDetails.stats?.totalRevenue?.toFixed(0) || '0'}</div>
// //                       <div className="text-xs opacity-90 font-medium">Revenue</div>
// //                     </div>
// //                     <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white shadow-lg">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <CheckCircle className="w-6 h-6 opacity-80" />
// //                         <TrendingUp className="w-5 h-5 opacity-60" />
// //                       </div>
// //                       <div className="text-3xl font-bold">{providerDetails.stats?.completedBookings || 0}</div>
// //                       <div className="text-xs opacity-90 font-medium">Completed</div>
// //                     </div>
// //                     <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-xl text-white shadow-lg">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <MessageCircle className="w-6 h-6 opacity-80" />
// //                         <Star className="w-5 h-5 opacity-60" />
// //                       </div>
// //                       <div className="text-3xl font-bold">{providerDetails.stats?.responseRate || 0}%</div>
// //                       <div className="text-xs opacity-90 font-medium">Response Rate</div>
// //                     </div>
// //                   </div>

// //                   {/* Location Info */}
// //                   {selectedProvider.location && (
// //                     <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
// //                       <div className="flex items-center gap-2">
// //                         <MapPin className="w-5 h-5 text-red-500" />
// //                         <div>
// //                           <div className="text-xs text-gray-500">Location</div>
// //                           <div className="font-semibold text-gray-900">{selectedProvider.location}</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Rating & Reviews Section */}
// //                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //                     <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 text-white">
// //                       <div className="flex items-center justify-between">
// //                         <div className="flex items-center gap-4">
// //                           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
// //                             <div className="text-4xl font-bold">{providerDetails.stats?.avgRating?.toFixed(1) || '0.0'}</div>
// //                             <div className="text-xs opacity-90">Rating</div>
// //                           </div>
// //                           <div>
// //                             <div className="flex gap-1 mb-1">
// //                               {[...Array(5)].map((_, i) => (
// //                                 <Star
// //                                   key={i}
// //                                   className={`w-5 h-5 ${
// //                                     i < Math.floor(providerDetails.stats?.avgRating || 0)
// //                                       ? 'fill-white text-white'
// //                                       : 'text-white/30'
// //                                   }`}
// //                                 />
// //                               ))}
// //                             </div>
// //                             <div className="text-sm font-medium">{providerDetails.reviews?.length || 0} reviews</div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Reviews List */}
// //                     <div className="p-4 bg-gray-50">
// //                       {providerDetails.reviews && providerDetails.reviews.length > 0 ? (
// //                         <div className="space-y-2 max-h-72 overflow-y-auto">
// //                           {providerDetails.reviews.slice(0, 5).map((review) => (
// //                             <div key={review.id} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
// //                               <div className="flex justify-between items-start mb-2">
// //                                 <div className="flex items-center gap-2">
// //                                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
// //                                     {review.userName?.charAt(0)?.toUpperCase() || 'C'}
// //                                   </div>
// //                                   <div>
// //                                     <div className="text-sm font-semibold text-gray-900">{review.userName || 'Customer'}</div>
// //                                     <div className="flex gap-0.5">
// //                                       {[...Array(5)].map((_, i) => (
// //                                         <Star
// //                                           key={i}
// //                                           className={`w-3 h-3 ${
// //                                             i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
// //                                           }`}
// //                                         />
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                                 <div className="text-xs text-gray-500">
// //                                   {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
// //                                 </div>
// //                               </div>
// //                               <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       ) : (
// //                         <p className="text-sm text-gray-500 text-center py-8">No reviews yet</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Listings Section */}
// //                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //                     <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white flex items-center justify-between">
// //                       <div className="flex items-center gap-3">
// //                         <Briefcase className="w-6 h-6" />
// //                         <div>
// //                           <div className="text-2xl font-bold">{providerDetails.stats?.totalListings || 0}</div>
// //                           <div className="text-xs opacity-90">Active Listings</div>
// //                         </div>
// //                       </div>
// //                       <button 
// //                         onClick={() => window.open(`/admin/listings?provider=${selectedProvider.id}`, '_blank')}
// //                         className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-semibold shadow-md"
// //                       >
// //                         View All
// //                       </button>
// //                     </div>
// //                     {providerDetails.listings && providerDetails.listings.length > 0 && (
// //                       <div className="p-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-2">
// //                         {providerDetails.listings.slice(0, 6).map((listing) => (
// //                           <div key={listing.id} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
// //                             <div className="flex justify-between items-start mb-1">
// //                               <div className="text-sm font-semibold text-gray-900 truncate flex-1">{listing.title || listing.serviceName}</div>
// //                               <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${
// //                                 listing.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
// //                               }`}>
// //                                 {listing.status}
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center justify-between text-xs">
// //                               <span className="text-gray-600">{listing.category}</span>
// //                               <span className="font-bold text-green-600">${listing.price}</span>
// //                             </div>
// //                           </div>
// //                         ))}
// //                         {providerDetails.listings.length > 6 && (
// //                           <div className="col-span-2 text-center text-gray-500 text-sm py-2 bg-gray-100 rounded-lg">
// //                             +{providerDetails.listings.length - 6} more listings
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-16">
// //                   <p className="text-sm text-gray-500 mb-3">Failed to load provider details</p>
// //                   <button 
// //                     onClick={() => fetchProviderDetails(selectedProvider.id)}
// //                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-md"
// //                   >
// //                     Retry
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }



// import { useState, useEffect } from 'react'
// import { Search, Briefcase, Mail, Star, TrendingUp, Eye, Phone, MapPin, X, Calendar, DollarSign, CheckCircle, MessageCircle } from 'lucide-react'

// export default function AdminProviders() {
//   const [providers, setProviders] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [selectedProvider, setSelectedProvider] = useState(null)
//   const [providerDetails, setProviderDetails] = useState(null)
//   const [loadingDetails, setLoadingDetails] = useState(false)

//   useEffect(() => {
//     fetchProviders()
//   }, [])

//   const fetchProviders = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch('/api/admin/providers')
//       if (response.ok) {
//         const data = await response.json()
//         setProviders(data)
//       } else {
//         console.error('Failed to fetch providers:', response.status)
//       }
//     } catch (error) {
//       console.error('Failed to fetch providers:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchProviderDetails = async (providerId) => {
//     setLoadingDetails(true)
//     try {
//       const [statsRes, reviewsRes, listingsRes] = await Promise.all([
//         fetch(`/api/admin/providers/${providerId}/stats`),
//         fetch(`/api/admin/providers/${providerId}/reviews`),
//         fetch(`/api/admin/providers/${providerId}/listings`)
//       ])

//       if (statsRes.ok && reviewsRes.ok && listingsRes.ok) {
//         const [statsData, reviewsData, listingsData] = await Promise.all([
//           statsRes.json(),
//           reviewsRes.json(),
//           listingsRes.json()
//         ])
        
//         setProviderDetails({
//           stats: statsData,
//           reviews: reviewsData,
//           listings: listingsData
//         })
//       } else {
//         console.error('Failed to fetch provider details')
//       }
//     } catch (error) {
//       console.error('Failed to fetch provider details:', error)
//     } finally {
//       setLoadingDetails(false)
//     }
//   }

//   const handleViewProfile = async (provider) => {
//     setSelectedProvider(provider)
//     await fetchProviderDetails(provider.id)
//   }

//   const closeProfileOverlay = () => {
//     setSelectedProvider(null)
//     setProviderDetails(null)
//   }

//   const searchProviders = async () => {
//     setLoading(true)
//     try {
//       let url = '/api/admin/providers/search'
//       const params = new URLSearchParams()
      
//       if (searchTerm) params.append('keyword', searchTerm)
      
//       if (params.toString()) {
//         url += '?' + params.toString()
//       }
      
//       const response = await fetch(url)
//       if (response.ok) {
//         const data = await response.json()
//         setProviders(data)
//       }
//     } catch (error) {
//       console.error('Failed to search providers:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredProviders = providers.filter(provider =>
//     provider.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     provider.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (provider.location && provider.location.toLowerCase().includes(searchTerm.toLowerCase()))
//   )

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading providers...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">Provider Management</h1>
//             <p className="text-gray-600 text-sm mt-1">Manage and monitor service providers</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="text-center bg-gray-100 rounded-lg px-3 py-2">
//               <div className="text-lg font-semibold text-gray-800">{filteredProviders.length}</div>
//               <div className="text-xs text-gray-600">Total</div>
//             </div>
//             <div className="text-center bg-blue-50 rounded-lg px-3 py-2">
//               <div className="text-lg font-semibold text-blue-600">{filteredProviders.filter(p => p.totalListings > 0).length}</div>
//               <div className="text-xs text-blue-600">Active</div>
//             </div>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative mt-4">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name, email, or location..."
//             className="w-full pl-10 pr-28 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && searchProviders()}
//           />
//           <button
//             onClick={searchProviders}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Providers Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {filteredProviders.length === 0 ? (
//           <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
//             <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
//               <Briefcase className="w-7 h-7 text-gray-400" />
//             </div>
//             <h3 className="text-base font-medium text-gray-800 mb-1">No providers found</h3>
//             <p className="text-gray-600 text-sm">
//               {searchTerm ? 'Try a different search term' : 'No service providers available'}
//             </p>
//           </div>
//         ) : (
//           filteredProviders.map((provider) => (
//             <div key={provider.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
//               {/* Card Header */}
//               <div className="p-4 border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-semibold text-sm">
//                     {provider.username?.charAt(0)?.toUpperCase() || provider.email?.charAt(0)?.toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-medium text-gray-800 text-sm truncate">{provider.username}</h3>
//                       <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
//                         <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
//                         <span className="text-xs font-medium text-amber-700">{provider.avgRating?.toFixed(1) || '0.0'}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
//                       <Calendar className="w-3 h-3" />
//                       Joined {new Date(provider.joinedAt || provider.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Card Body */}
//               <div className="p-4">
//                 {/* Contact Info */}
//                 <div className="space-y-2 mb-3">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                     <span className="truncate text-sm">{provider.email}</span>
//                   </div>
//                   {provider.location && (
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                       <span className="truncate">{provider.location}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-4 gap-2 mb-4">
//                   <div className="text-center p-2 bg-blue-50 rounded">
//                     <div className="text-base font-semibold text-blue-700">{provider.totalListings || 0}</div>
//                     <div className="text-xs text-blue-600 mt-1">Listings</div>
//                   </div>
//                   <div className="text-center p-2 bg-emerald-50 rounded">
//                     <div className="text-base font-semibold text-emerald-700">{provider.totalBookings || 0}</div>
//                     <div className="text-xs text-emerald-600 mt-1">Bookings</div>
//                   </div>
//                   <div className="text-center p-2 bg-amber-50 rounded">
//                     <div className="text-base font-semibold text-amber-700">{provider.avgRating?.toFixed(1) || '0.0'}</div>
//                     <div className="text-xs text-amber-600 mt-1">Rating</div>
//                   </div>
//                   <div className="text-center p-2 bg-purple-50 rounded">
//                     <div className="text-base font-semibold text-purple-700">{provider.responseRate || 0}%</div>
//                     <div className="text-xs text-purple-600 mt-1">Response</div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleViewProfile(provider)}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-sm font-medium"
//                   >
//                     <Eye className="w-4 h-4" />
//                     View
//                   </button>
//                   <button
//                     onClick={() => window.open(`/admin/listings?provider=${provider.id}`, '_blank')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
//                   >
//                     <TrendingUp className="w-4 h-4" />
//                     Listings
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Profile Overlay */}
//       {selectedProvider && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-semibold text-lg">
//                   {selectedProvider.username?.charAt(0)?.toUpperCase() || selectedProvider.email?.charAt(0)?.toUpperCase()}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800">{selectedProvider.username}</h2>
//                   <p className="text-gray-600 text-sm">{selectedProvider.email}</p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Joined {new Date(selectedProvider.joinedAt || selectedProvider.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={closeProfileOverlay}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="overflow-y-auto max-h-[calc(90vh-80px)] bg-gray-50">
//               {loadingDetails ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="text-center">
//                     <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
//                     <p className="text-gray-600 text-sm">Loading details...</p>
//                   </div>
//                 </div>
//               ) : providerDetails ? (
//                 <div className="p-5 space-y-4">
//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     <div className="bg-white p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center gap-2 mb-1">
//                         <Calendar className="w-5 h-5 text-blue-500" />
//                         <div className="text-right flex-1">
//                           <div className="text-lg font-semibold text-gray-800">{providerDetails.stats?.totalBookings || 0}</div>
//                           <div className="text-xs text-gray-600">Bookings</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-white p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center gap-2 mb-1">
//                         <DollarSign className="w-5 h-5 text-emerald-500" />
//                         <div className="text-right flex-1">
//                           <div className="text-lg font-semibold text-gray-800">${providerDetails.stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
//                           <div className="text-xs text-gray-600">Revenue</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-white p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center gap-2 mb-1">
//                         <CheckCircle className="w-5 h-5 text-purple-500" />
//                         <div className="text-right flex-1">
//                           <div className="text-lg font-semibold text-gray-800">{providerDetails.stats?.completedBookings || 0}</div>
//                           <div className="text-xs text-gray-600">Completed</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-white p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center gap-2 mb-1">
//                         <MessageCircle className="w-5 h-5 text-amber-500" />
//                         <div className="text-right flex-1">
//                           <div className="text-lg font-semibold text-gray-800">{providerDetails.stats?.responseRate || 0}%</div>
//                           <div className="text-xs text-gray-600">Response Rate</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location Info */}
//                   {selectedProvider.location && (
//                     <div className="bg-white p-4 rounded-lg border border-gray-200">
//                       <div className="flex items-center gap-3">
//                         <MapPin className="w-5 h-5 text-red-500" />
//                         <div>
//                           <div className="text-sm text-gray-500 mb-1">Location</div>
//                           <div className="font-medium text-gray-800">{selectedProvider.location}</div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Rating Section */}
//                   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                     <div className="p-4 border-b border-gray-200 bg-gray-50">
//                       <h3 className="font-medium text-gray-800">Rating & Reviews</h3>
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="bg-blue-50 px-4 py-3 rounded-lg">
//                           <div className="text-2xl font-semibold text-gray-800">{providerDetails.stats?.avgRating?.toFixed(1) || '0.0'}</div>
//                           <div className="text-xs text-gray-600">Average Rating</div>
//                         </div>
//                         <div>
//                           <div className="flex gap-1 mb-1">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-5 h-5 ${
//                                   i < Math.floor(providerDetails.stats?.avgRating || 0)
//                                     ? 'text-amber-500 fill-amber-500'
//                                     : 'text-gray-300'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <div className="text-sm text-gray-600">({providerDetails.reviews?.length || 0} reviews)</div>
//                         </div>
//                       </div>

//                       {/* Reviews List */}
//                       {providerDetails.reviews && providerDetails.reviews.length > 0 ? (
//                         <div className="space-y-3">
//                           <h4 className="text-sm font-medium text-gray-700">Recent Reviews</h4>
//                           {providerDetails.reviews.slice(0, 3).map((review) => (
//                             <div key={review.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
//                               <div className="flex justify-between items-start mb-2">
//                                 <div>
//                                   <div className="font-medium text-gray-800 text-sm">{review.userName || 'Customer'}</div>
//                                   <div className="flex gap-0.5 mt-1">
//                                     {[...Array(5)].map((_, i) => (
//                                       <Star
//                                         key={i}
//                                         className={`w-3.5 h-3.5 ${
//                                           i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
//                                         }`}
//                                       />
//                                     ))}
//                                   </div>
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                 </div>
//                               </div>
//                               <p className="text-gray-700 text-sm line-clamp-2">{review.comment}</p>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-gray-500 text-sm text-center py-4">No reviews yet</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Listings Section */}
//                   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                     <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Briefcase className="w-5 h-5 text-gray-600" />
//                         <div>
//                           <div className="font-medium text-gray-800">Active Listings</div>
//                           <div className="text-sm text-gray-600">{providerDetails.stats?.totalListings || 0} listings</div>
//                         </div>
//                       </div>
//                       <button 
//                         onClick={() => window.open(`/admin/listings?provider=${selectedProvider.id}`, '_blank')}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     {providerDetails.listings && providerDetails.listings.length > 0 && (
//                       <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {providerDetails.listings.slice(0, 4).map((listing) => (
//                           <div key={listing.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
//                             <div className="flex justify-between items-start mb-2">
//                               <div className="font-medium text-gray-800 text-sm truncate">{listing.title || listing.serviceName}</div>
//                               <div className={`text-xs px-2 py-1 rounded ${
//                                 listing.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
//                               }`}>
//                                 {listing.status}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between text-xs">
//                               <span className="text-gray-600">{listing.category}</span>
//                               <span className="font-medium text-emerald-600">${listing.price}</span>
//                             </div>
//                           </div>
//                         ))}
//                         {providerDetails.listings.length > 4 && (
//                           <div className="col-span-2 text-center text-gray-500 text-sm py-2">
//                             +{providerDetails.listings.length - 4} more listings
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 text-sm mb-3">Failed to load provider details</p>
//                   <button 
//                     onClick={() => fetchProviderDetails(selectedProvider.id)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
//                   >
//                     Retry
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }






import { useState, useEffect } from 'react'
import { Search, Briefcase, Mail, Star, TrendingUp, Eye, Phone, MapPin, X, Calendar, DollarSign, CheckCircle, MessageCircle, Users, Award } from 'lucide-react'

export default function AdminProviders() {
  const [providers, setProviders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [providerDetails, setProviderDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/providers')
      if (response.ok) {
        const data = await response.json()
        setProviders(data)
      } else {
        console.error('Failed to fetch providers:', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProviderDetails = async (providerId) => {
    setLoadingDetails(true)
    try {
      const [statsRes, reviewsRes, listingsRes] = await Promise.all([
        fetch(`/api/admin/providers/${providerId}/stats`),
        fetch(`/api/admin/providers/${providerId}/reviews`),
        fetch(`/api/admin/providers/${providerId}/listings`)
      ])

      if (statsRes.ok && reviewsRes.ok && listingsRes.ok) {
        const [statsData, reviewsData, listingsData] = await Promise.all([
          statsRes.json(),
          reviewsRes.json(),
          listingsRes.json()
        ])
        
        setProviderDetails({
          stats: statsData,
          reviews: reviewsData,
          listings: listingsData
        })
      } else {
        console.error('Failed to fetch provider details')
      }
    } catch (error) {
      console.error('Failed to fetch provider details:', error)
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleViewProfile = async (provider) => {
    setSelectedProvider(provider)
    await fetchProviderDetails(provider.id)
  }

  const closeProfileOverlay = () => {
    setSelectedProvider(null)
    setProviderDetails(null)
  }

  const searchProviders = async () => {
    setLoading(true)
    try {
      let url = '/api/admin/providers/search'
      const params = new URLSearchParams()
      
      if (searchTerm) params.append('keyword', searchTerm)
      
      if (params.toString()) {
        url += '?' + params.toString()
      }
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProviders(data)
      }
    } catch (error) {
      console.error('Failed to search providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProviders = providers.filter(provider =>
    provider.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (provider.location && provider.location.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading providers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 rounded-xl shadow-lg p-5 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Provider Management</h1>
            <p className="text-indigo-100 text-sm mt-1">Manage and monitor service providers</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">{filteredProviders.length}</div>
              <div className="text-xs text-indigo-100">Total</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">{filteredProviders.filter(p => p.totalListings > 0).length}</div>
              <div className="text-xs text-indigo-100">Active</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl"></div>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search by name, email, or location..."
            className="relative w-full pl-12 pr-28 py-3.5 text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500 shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchProviders()}
          />
          <button
            onClick={searchProviders}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md z-10"
          >
            Search
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-700">{providers.length}</div>
              <div className="text-sm text-blue-600 font-medium">All Providers</div>
            </div>
            <Users className="w-8 h-8 text-blue-500/60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-700">{providers.filter(p => p.avgRating >= 4).length}</div>
              <div className="text-sm text-emerald-600 font-medium">Top Rated</div>
            </div>
            <Award className="w-8 h-8 text-emerald-500/60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-700">{Math.round(providers.reduce((acc, p) => acc + (p.avgRating || 0), 0) / providers.length * 10) / 10 || 0}</div>
              <div className="text-sm text-amber-600 font-medium">Avg Rating</div>
            </div>
            <Star className="w-8 h-8 text-amber-500/60 fill-amber-500/60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">{Math.round(providers.reduce((acc, p) => acc + (p.responseRate || 0), 0) / providers.length) || 0}%</div>
              <div className="text-sm text-purple-600 font-medium">Avg Response</div>
            </div>
            <MessageCircle className="w-8 h-8 text-purple-500/60" />
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProviders.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No providers found</h3>
            <p className="text-gray-600 text-sm">
              {searchTerm ? 'Try a different search term' : 'No service providers available'}
            </p>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <div key={provider.id} className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-200">
              {/* Card Header */}
              <div className="relative overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {provider.username?.charAt(0)?.toUpperCase() || provider.email?.charAt(0)?.toUpperCase()}
                      </div>
                      {provider.avgRating >= 4 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 text-sm truncate">{provider.username}</h3>
                        <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-amber-50 px-2 py-1 rounded-full border border-amber-200">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-semibold text-amber-700">{provider.avgRating?.toFixed(1) || '0.0'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        Joined {new Date(provider.joinedAt || provider.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100">
                    <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="truncate text-sm">{provider.email}</span>
                  </div>
                  {provider.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-2 border border-red-100">
                      <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="truncate">{provider.location}</span>
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-base font-bold text-blue-700">{provider.totalListings || 0}</div>
                    <div className="text-xs text-blue-600 font-medium mt-1">Listings</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                    <div className="text-base font-bold text-emerald-700">{provider.totalBookings || 0}</div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">Bookings</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <div className="text-base font-bold text-amber-700">{provider.avgRating?.toFixed(1) || '0.0'}</div>
                    <div className="text-xs text-amber-600 font-medium mt-1">Rating</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="text-base font-bold text-purple-700">{provider.responseRate || 0}%</div>
                    <div className="text-xs text-purple-600 font-medium mt-1">Response</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(provider)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-sm text-sm font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    View Profile
                  </button>
                  <button
                    onClick={() => window.open(`/admin/listings?provider=${provider.id}`, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all shadow-sm text-sm font-semibold"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Listings
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Profile Overlay */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden border border-gray-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-600 p-5 text-white relative">
              <button
                onClick={closeProfileOverlay}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-lg">
                    {selectedProvider.username?.charAt(0)?.toUpperCase() || selectedProvider.email?.charAt(0)?.toUpperCase()}
                  </div>
                  {selectedProvider.avgRating >= 4 && (
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                      <Star className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProvider.username}</h2>
                  <p className="text-indigo-100 text-sm">{selectedProvider.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      Joined {new Date(selectedProvider.joinedAt || selectedProvider.createdAt).toLocaleDateString()}
                    </div>
                    {selectedProvider.location && (
                      <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {selectedProvider.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-140px)] bg-gradient-to-br from-gray-50 to-indigo-50/30">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading details...</p>
                  </div>
                </div>
              ) : providerDetails ? (
                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <Calendar className="w-8 h-8 text-blue-500" />
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">{providerDetails.stats?.totalBookings || 0}</div>
                          <div className="text-sm text-blue-600">Bookings</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <DollarSign className="w-8 h-8 text-emerald-500" />
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">${providerDetails.stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
                          <div className="text-sm text-emerald-600">Revenue</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <CheckCircle className="w-8 h-8 text-purple-500" />
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">{providerDetails.stats?.completedBookings || 0}</div>
                          <div className="text-sm text-purple-600">Completed</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <MessageCircle className="w-8 h-8 text-amber-500" />
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">{providerDetails.stats?.responseRate || 0}%</div>
                          <div className="text-sm text-amber-600">Response</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-200 rounded-xl overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Rating & Reviews</h3>
                        <div className="flex items-center gap-1 text-sm text-amber-600">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          {providerDetails.reviews?.length || 0} reviews
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white px-5 py-4 rounded-xl">
                          <div className="text-3xl font-bold">{providerDetails.stats?.avgRating?.toFixed(1) || '0.0'}</div>
                          <div className="text-sm opacity-90">Average Rating</div>
                        </div>
                        <div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < Math.floor(providerDetails.stats?.avgRating || 0)
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">Based on {providerDetails.reviews?.length || 0} customer reviews</div>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="border-t border-amber-200 p-5 bg-white">
                      {providerDetails.reviews && providerDetails.reviews.length > 0 ? (
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800 mb-3">Recent Reviews</h4>
                          {providerDetails.reviews.slice(0, 3).map((review) => (
                            <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                                    {review.userName?.charAt(0)?.toUpperCase() || 'C'}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-800">{review.userName || 'Customer'}</div>
                                    <div className="flex gap-0.5 mt-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm text-center py-6">No reviews yet</p>
                      )}
                    </div>
                  </div>

                  {/* Listings Section */}
                  <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-6 h-6 text-blue-500" />
                          <div>
                            <h3 className="font-semibold text-gray-800">Active Listings</h3>
                            <div className="text-sm text-blue-600">{providerDetails.stats?.totalListings || 0} total listings</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => window.open(`/admin/listings?provider=${selectedProvider.id}`, '_blank')}
                          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all text-sm font-semibold shadow-sm"
                        >
                          View All Listings
                        </button>
                      </div>
                      {providerDetails.listings && providerDetails.listings.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {providerDetails.listings.slice(0, 4).map((listing) => (
                            <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-medium text-gray-800 text-sm truncate flex-1">{listing.title || listing.serviceName}</div>
                                <div className={`text-xs font-semibold px-2 py-1 rounded ${
                                  listing.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {listing.status}
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{listing.category}</span>
                                <span className="font-bold text-emerald-600">${listing.price}</span>
                              </div>
                            </div>
                          ))}
                          {providerDetails.listings.length > 4 && (
                            <div className="col-span-2 text-center text-gray-500 text-sm py-3">
                              +{providerDetails.listings.length - 4} more listings
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm mb-3">Failed to load provider details</p>
                  <button 
                    onClick={() => fetchProviderDetails(selectedProvider.id)}
                    className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 text-sm font-medium shadow-sm"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}