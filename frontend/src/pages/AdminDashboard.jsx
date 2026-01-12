// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { 
//   Users, 
//   Briefcase, 
//   CheckCircle, 
//   TrendingUp,
//   Clock,
//   DollarSign,
//   BarChart3,
//   Shield,
//   Loader2
// } from 'lucide-react'

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCustomers: 0,
//     totalProviders: 0,
//     totalListings: 0,
//     pendingListings: 0,
//     approvedListings: 0,
//     totalBookings: 0,
//     completedBookings: 0,
//     totalReviews: 0,
//     averageRating: 0
//   })
//   const [recentListings, setRecentListings] = useState([])
//   const [topCategories, setTopCategories] = useState([])
//   const [topServices, setTopServices] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       // Fetch stats
//       const statsRes = await fetch('/api/admin/stats')
//       if (!statsRes.ok) throw new Error('Failed to fetch stats')
//       const statsData = await statsRes.json()
//       setStats(statsData)

//       // Fetch pending listings
//       const listingsRes = await fetch('/api/admin/listings/pending')
//       if (listingsRes.ok) {
//         const listingsData = await listingsRes.json()
//         setRecentListings(listingsData.slice(0, 5))
//       }

//       // Fetch top categories
//       const categoriesRes = await fetch('/api/admin/top-categories?limit=5')
//       if (categoriesRes.ok) {
//         const categoriesData = await categoriesRes.json()
//         setTopCategories(categoriesData)
//       }

//       // Fetch top services
//       const servicesRes = await fetch('/api/admin/top-services?limit=5')
//       if (servicesRes.ok) {
//         const servicesData = await servicesRes.json()
//         setTopServices(servicesData)
//       }
//     } catch (err) {
//       console.error('Dashboard fetch error:', err)
//       setError('Failed to load dashboard data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const approveListing = async (listingId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//       const response = await fetch('/api/admin/listings/approve', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           listingId: listingId,
//           adminId: user.id,
//           adminNotes: 'Approved by admin'
//         })
//       })
//       if (response.ok) {
//         fetchDashboardData() // Refresh all data
//       } else {
//         throw new Error('Failed to approve listing')
//       }
//     } catch (error) {
//       console.error('Failed to approve listing:', error)
//       alert('Failed to approve listing')
//     }
//   }

//   const rejectListing = async (listingId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//       const response = await fetch('/api/admin/listings/reject', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           listingId: listingId,
//           adminId: user.id,
//           adminNotes: 'Rejected by admin'
//         })
//       })
//       if (response.ok) {
//         fetchDashboardData() // Refresh all data
//       } else {
//         throw new Error('Failed to reject listing')
//       }
//     } catch (error) {
//       console.error('Failed to reject listing:', error)
//       alert('Failed to reject listing')
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading dashboard data...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
//             <div className="w-6 h-6 text-red-600">!</div>
//           </div>
//           <p className="text-gray-900 font-medium mb-2">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//           <p className="text-gray-600 mt-1">Platform overview and analytics</p>
//         </div>
//         <div className="text-sm text-gray-500">
//           {new Date().toLocaleDateString('en-US', { 
//             weekday: 'long', 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric' 
//           })}
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Users"
//           value={stats.totalUsers}
//           icon={<Users className="w-6 h-6 text-blue-600" />}
//           color="blue"
//           subtext={`${stats.totalCustomers} Customers • ${stats.totalProviders} Providers`}
//           link="/admin/users"
//         />

//         <StatCard
//           title="Listings"
//           value={stats.totalListings}
//           icon={<Briefcase className="w-6 h-6 text-emerald-600" />}
//           color="emerald"
//           subtext={`${stats.approvedListings} Approved • ${stats.pendingListings} Pending`}
//           link="/admin/listings"
//         />

//         <StatCard
//           title="Bookings"
//           value={stats.totalBookings}
//           icon={<DollarSign className="w-6 h-6 text-purple-600" />}
//           color="purple"
//           subtext={`${stats.completedBookings} Completed`}
//         />

//         <StatCard
//           title="Rating"
//           value={stats.averageRating.toFixed(1)}
//           icon={<BarChart3 className="w-6 h-6 text-amber-600" />}
//           color="amber"
//           subtext={`Based on ${stats.totalReviews} reviews`}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Pending Listings */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">Pending Listings</h2>
//               <p className="text-sm text-gray-500 mt-1">Awaiting approval</p>
//             </div>
//             <Link to="/admin/listings?status=PENDING" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//               View all →
//             </Link>
//           </div>
          
//           {recentListings.length === 0 ? (
//             <div className="text-center py-8">
//               <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500">No pending listings</p>
//               <p className="text-sm text-gray-400 mt-1">All listings are approved</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentListings.map((listing) => (
//                 <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <h3 className="font-medium text-gray-900">{listing.serviceName}</h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-600">{listing.provider?.username}</span>
//                       <span className="text-xs px-2 py-1 bg-gray-200 rounded">{listing.category}</span>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1 truncate">{listing.description?.substring(0, 60)}...</p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <div className="text-lg font-semibold text-gray-900">${listing.price}</div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => approveListing(listing.id)}
//                         className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => rejectListing(listing.id)}
//                         className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Top Categories */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">Top Categories</h2>
//               <p className="text-sm text-gray-500 mt-1">Most popular by bookings</p>
//             </div>
//             <Link to="/admin/top-categories" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//               View all →
//             </Link>
//           </div>
          
//           {topCategories.length === 0 ? (
//             <div className="text-center py-8">
//               <TrendingUp className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500">No category data available</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {topCategories.map((category, index) => (
//                 <div key={category.category} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
//                       <span className="text-sm font-bold text-purple-700">{index + 1}</span>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-900">{category.category}</h3>
//                       <p className="text-sm text-gray-500">{category.listingCount} listings</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold text-gray-900">{category.bookingCount}</div>
//                     <div className="text-xs text-gray-500">bookings</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <QuickActionCard
//             title="Manage Listings"
//             description="Approve or reject listings"
//             icon={<Briefcase className="w-5 h-5 text-blue-600" />}
//             color="blue"
//             link="/admin/listings"
//           />

//           <QuickActionCard
//             title="Manage Users"
//             description="View and manage all users"
//             icon={<Users className="w-5 h-5 text-emerald-600" />}
//             color="emerald"
//             link="/admin/users"
//           />

//           <QuickActionCard
//             title="Manage Providers"
//             description="View service providers"
//             icon={<Shield className="w-5 h-5 text-purple-600" />}
//             color="purple"
//             link="/admin/providers"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Helper components
// function StatCard({ title, value, icon, color, subtext, link }) {
//   const bgColor = {
//     blue: 'bg-blue-100',
//     emerald: 'bg-emerald-100',
//     purple: 'bg-purple-100',
//     amber: 'bg-amber-100'
//   }[color] || 'bg-gray-100'

//   const content = (
//     <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-gray-300 transition-colors">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//           {subtext && <p className="text-sm text-gray-500 mt-2">{subtext}</p>}
//         </div>
//         <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
//           {icon}
//         </div>
//       </div>
//       {link && (
//         <Link to={link} className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 font-medium">
//           View details →
//         </Link>
//       )}
//     </div>
//   )

//   return link ? <Link to={link}>{content}</Link> : content
// }

// function QuickActionCard({ title, description, icon, color, link }) {
//   const bgColor = {
//     blue: 'bg-blue-100',
//     emerald: 'bg-emerald-100',
//     purple: 'bg-purple-100'
//   }[color] || 'bg-gray-100'

//   return (
//     <Link 
//       to={link} 
//       className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-gray-300 transition-colors group"
//     >
//       <div className="flex items-center gap-3">
//         <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
//           {icon}
//         </div>
//         <div>
//           <h3 className="font-medium text-gray-900">{title}</h3>
//           <p className="text-sm text-gray-500">{description}</p>
//         </div>
//       </div>
//     </Link>
//   )
// }




// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { 
//   Users, 
//   Briefcase, 
//   CheckCircle, 
//   TrendingUp,
//   Clock,
//   DollarSign,
//   BarChart3,
//   Shield,
//   Loader2,
//   Calendar,
//   PieChart as PieChartIcon,
//   TrendingDown,
//   Activity,
//   Star,
//   AlertCircle,
//   ArrowUpRight,
//   ArrowDownRight
// } from 'lucide-react'
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
// } from 'recharts'

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCustomers: 0,
//     totalProviders: 0,
//     totalListings: 0,
//     pendingListings: 0,
//     approvedListings: 0,
//     totalBookings: 0,
//     completedBookings: 0,
//     totalReviews: 0,
//     averageRating: 0
//   })
//   const [recentListings, setRecentListings] = useState([])
//   const [topCategories, setTopCategories] = useState([])
//   const [topServices, setTopServices] = useState([])
//   const [chartData, setChartData] = useState({
//     dailyBookings: [],
//     categoryDistribution: [],
//     userStats: [],
//     revenueStats: {}
//   })
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       // Fetch all data in parallel
//       const [
//         statsRes, 
//         listingsRes, 
//         categoriesRes, 
//         servicesRes,
//         dailyBookingsRes,
//         categoryDistRes,
//         userStatsRes,
//         revenueRes
//       ] = await Promise.all([
//         fetch('/api/admin/stats'),
//         fetch('/api/admin/listings/pending'),
//         fetch('/api/admin/top-categories?limit=5'),
//         fetch('/api/admin/top-services?limit=5'),
//         fetch('/api/admin/stats/daily-bookings'),
//         fetch('/api/admin/stats/category-distribution'),
//         fetch('/api/admin/stats/user-statistics'),
//         fetch('/api/admin/stats/revenue')
//       ])

//       // Handle stats
//       if (!statsRes.ok) throw new Error('Failed to fetch stats')
//       const statsData = await statsRes.json()
//       setStats(statsData)

//       // Handle pending listings
//       if (listingsRes.ok) {
//         const listingsData = await listingsRes.json()
//         setRecentListings(listingsData.slice(0, 5))
//       }

//       // Handle top categories
//       if (categoriesRes.ok) {
//         const categoriesData = await categoriesRes.json()
//         setTopCategories(categoriesData)
//       }

//       // Handle top services
//       if (servicesRes.ok) {
//         const servicesData = await servicesRes.json()
//         setTopServices(servicesData)
//       }

//       // Handle chart data
//       let dailyBookings = []
//       if (dailyBookingsRes.ok) {
//         const dailyData = await dailyBookingsRes.json()
//         dailyBookings = Object.entries(dailyData).map(([date, value]) => ({
//           date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
//           fullDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//           bookings: value
//         }))
//       }

//       let categoryDistribution = []
//       if (categoryDistRes.ok) {
//         const categoryData = await categoryDistRes.json()
//         categoryDistribution = Object.entries(categoryData).map(([name, value]) => ({
//           name,
//           value
//         }))
//       }

//       let userStats = []
//       if (userStatsRes.ok) {
//         const userData = await userStatsRes.json()
//         userStats = [
//           { name: 'Customers', count: userData.totalCustomers || 0 },
//           { name: 'Providers', count: userData.totalProviders || 0 },
//           { name: 'Admins', count: userData.admins || 0 }
//         ]
//       }

//       let revenueStats = {}
//       if (revenueRes.ok) {
//         revenueStats = await revenueRes.json()
//       }

//       setChartData({
//         dailyBookings,
//         categoryDistribution,
//         userStats,
//         revenueStats
//       })

//     } catch (err) {
//       console.error('Dashboard fetch error:', err)
//       setError('Failed to load dashboard data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const approveListing = async (listingId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//       const response = await fetch('/api/admin/listings/approve', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           listingId: listingId,
//           adminId: user.id,
//           adminNotes: 'Approved by admin'
//         })
//       })
//       if (response.ok) {
//         fetchDashboardData() // Refresh all data
//       } else {
//         throw new Error('Failed to approve listing')
//       }
//     } catch (error) {
//       console.error('Failed to approve listing:', error)
//       alert('Failed to approve listing')
//     }
//   }

//   const rejectListing = async (listingId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//       const response = await fetch('/api/admin/listings/reject', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           listingId: listingId,
//           adminId: user.id,
//           adminNotes: 'Rejected by admin'
//         })
//       })
//       if (response.ok) {
//         fetchDashboardData() // Refresh all data
//       } else {
//         throw new Error('Failed to reject listing')
//       }
//     } catch (error) {
//       console.error('Failed to reject listing:', error)
//       alert('Failed to reject listing')
//     }
//   }

//   // Chart colors
//   const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading dashboard data...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-6 h-6 text-red-600" />
//           </div>
//           <p className="text-gray-900 font-medium mb-2">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//           <p className="text-gray-600 mt-1">Platform overview and analytics</p>
//         </div>
//         <div className="flex items-center justify-between sm:justify-end gap-4">
//           <div className="text-sm text-gray-500 hidden sm:block">
//             {new Date().toLocaleDateString('en-US', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}
//           </div>
//           <button
//             onClick={fetchDashboardData}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
//           >
//             <Activity className="w-4 h-4" />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//         <StatCard
//           title="Total Users"
//           value={stats.totalUsers}
//           icon={<Users className="w-6 h-6 text-blue-600" />}
//           color="blue"
//           subtext={`${stats.totalCustomers} Customers • ${stats.totalProviders} Providers`}
//           link="/admin/users"
//           trend="+12.5%"
//           trendUp={true}
//         />

//         <StatCard
//           title="Listings"
//           value={stats.totalListings}
//           icon={<Briefcase className="w-6 h-6 text-emerald-600" />}
//           color="emerald"
//           subtext={`${stats.approvedListings} Approved • ${stats.pendingListings} Pending`}
//           link="/admin/listings"
//           trend="+8.2%"
//           trendUp={true}
//         />

//         <StatCard
//           title="Bookings"
//           value={stats.totalBookings}
//           icon={<DollarSign className="w-6 h-6 text-purple-600" />}
//           color="purple"
//           subtext={`${stats.completedBookings} Completed`}
//           trend="+24.3%"
//           trendUp={true}
//         />

//         <StatCard
//           title="Rating"
//           value={stats.averageRating.toFixed(1)}
//           icon={<Star className="w-6 h-6 text-amber-600" />}
//           color="amber"
//           subtext={`Based on ${stats.totalReviews} reviews`}
//           trend="+0.4"
//           trendUp={true}
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Daily Bookings Chart */}
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-blue-600" />
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Daily Bookings</h2>
//             </div>
//             <span className="text-sm text-gray-500">Last 7 days</span>
//           </div>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData.dailyBookings}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
//                 <XAxis 
//                   dataKey="date" 
//                   stroke="#6b7280"
//                   fontSize={12}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis 
//                   stroke="#6b7280"
//                   fontSize={12}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Tooltip 
//                   contentStyle={{
//                     backgroundColor: 'white',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
//                     fontSize: '12px'
//                   }}
//                   formatter={(value) => [value, 'Bookings']}
//                   labelFormatter={(label, items) => {
//                     if (items && items[0]) {
//                       return chartData.dailyBookings.find(d => d.date === label)?.fullDate || label;
//                     }
//                     return label;
//                   }}
//                 />
//                 <Bar 
//                   dataKey="bookings" 
//                   fill="#4F46E5" 
//                   radius={[4, 4, 0, 0]}
//                   name="Bookings"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Category Distribution Chart */}
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <PieChartIcon className="w-5 h-5 text-emerald-600" />
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Category Distribution</h2>
//             </div>
//             <span className="text-sm text-gray-500">Active listings</span>
//           </div>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={chartData.categoryDistribution}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => 
//                     percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''
//                   }
//                   outerRadius={70}
//                   innerRadius={30}
//                   fill="#8884d8"
//                   dataKey="value"
//                   paddingAngle={2}
//                 >
//                   {chartData.categoryDistribution.map((entry, index) => (
//                     <Cell 
//                       key={`cell-${index}`} 
//                       fill={COLORS[index % COLORS.length]} 
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   formatter={(value, name, props) => [
//                     `${value} listings`,
//                     props.payload.name
//                   ]}
//                   contentStyle={{
//                     backgroundColor: 'white',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
//                   }}
//                 />
//                 <Legend 
//                   layout="vertical"
//                   verticalAlign="middle"
//                   align="right"
//                   wrapperStyle={{
//                     paddingLeft: '20px',
//                     fontSize: '12px'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Revenue and User Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue Stats */}
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <DollarSign className="w-5 h-5 text-purple-600" />
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Revenue Overview</h2>
//             </div>
//             <span className="text-sm text-gray-500">Current period</span>
//           </div>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-100">
//                 <p className="text-sm text-gray-600">Total Revenue</p>
//                 <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
//                   ${chartData.revenueStats.totalRevenue?.toLocaleString() || '0'}
//                 </p>
//                 <div className="flex items-center gap-1 mt-2">
//                   <ArrowUpRight className="w-4 h-4 text-emerald-600" />
//                   <span className="text-sm text-emerald-600 font-medium">+12.4%</span>
//                   <span className="text-xs text-gray-500 ml-2">from last month</span>
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
//                 <p className="text-sm text-gray-600">Avg. Booking Value</p>
//                 <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
//                   ${chartData.revenueStats.averageBookingValue?.toFixed(2) || '0'}
//                 </p>
//                 <div className="flex items-center gap-1 mt-2">
//                   <ArrowUpRight className="w-4 h-4 text-emerald-600" />
//                   <span className="text-sm text-emerald-600 font-medium">+5.2%</span>
//                   <span className="text-xs text-gray-500 ml-2">from last month</span>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-sm text-gray-600">Monthly Revenue</p>
//                 <p className="text-xl font-bold text-gray-900 mt-1">
//                   ${chartData.revenueStats.monthlyRevenue?.toLocaleString() || '0'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-sm text-gray-600">Weekly Revenue</p>
//                 <p className="text-xl font-bold text-gray-900 mt-1">
//                   ${chartData.revenueStats.weeklyRevenue?.toLocaleString() || '0'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* User Statistics Chart */}
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <Users className="w-5 h-5 text-blue-600" />
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">User Statistics</h2>
//             </div>
//             <span className="text-sm text-gray-500">By role</span>
//           </div>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart 
//                 data={chartData.userStats}
//                 margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//               >
//                 <CartesianGrid 
//                   strokeDasharray="3 3" 
//                   stroke="#f3f4f6" 
//                   vertical={false}
//                 />
//                 <XAxis 
//                   dataKey="name" 
//                   stroke="#6b7280"
//                   fontSize={12}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis 
//                   stroke="#6b7280"
//                   fontSize={12}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Tooltip 
//                   contentStyle={{
//                     backgroundColor: 'white',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
//                   }}
//                   formatter={(value) => [value, 'Users']}
//                 />
//                 <Bar 
//                   dataKey="count" 
//                   fill="#10B981" 
//                   radius={[4, 4, 0, 0]}
//                   name="Users"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Pending Listings and Top Categories */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Pending Listings */}
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Pending Listings</h2>
//               <p className="text-sm text-gray-500 mt-1">Awaiting approval</p>
//             </div>
//             <Link to="/admin/listings?status=PENDING" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//               View all →
//             </Link>
//           </div>
          
//           {recentListings.length === 0 ? (
//             <div className="text-center py-8">
//               <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500">No pending listings</p>
//               <p className="text-sm text-gray-400 mt-1">All listings are approved</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentListings.map((listing) => (
//                 <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="font-medium text-gray-900 truncate">{listing.serviceName}</h3>
//                       <span className={`text-xs px-2 py-1 rounded-full ${listing.category === 'Cleaning' ? 'bg-blue-100 text-blue-700' : listing.category === 'Repair' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
//                         {listing.category}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-600">{listing.provider?.username}</span>
//                       <span className="text-xs text-gray-400">•</span>
//                       <span className="text-sm text-gray-500">{listing.location}</span>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-2 truncate">{listing.description?.substring(0, 60)}...</p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2 ml-4">
//                     <div className="text-lg font-semibold text-gray-900">${listing.price}</div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => approveListing(listing.id)}
//                         className="px-3 py-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => rejectListing(listing.id)}
//                         className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Top Categories */}
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Top Categories</h2>
//               <p className="text-sm text-gray-500 mt-1">Most popular by bookings</p>
//             </div>
//             <Link to="/admin/top-categories" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//               View all →
//             </Link>
//           </div>
          
//           {topCategories.length === 0 ? (
//             <div className="text-center py-8">
//               <TrendingUp className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//               <p className="text-gray-500">No category data available</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {topCategories.map((category, index) => (
//                 <div key={category.category} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-10 h-10 rounded-lg ${index === 0 ? 'bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200' : index === 1 ? 'bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200' : index === 2 ? 'bg-gradient-to-br from-amber-50 to-amber-100/30 border border-amber-100' : 'bg-gray-50 border border-gray-100'} flex items-center justify-center`}>
//                       <span className={`text-sm font-bold ${index === 0 ? 'text-amber-700' : index === 1 ? 'text-gray-700' : index === 2 ? 'text-amber-600' : 'text-gray-600'}`}>
//                         {index + 1}
//                       </span>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-900">{category.category}</h3>
//                       <p className="text-sm text-gray-500">{category.listingCount} listings</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold text-gray-900">{category.bookingCount}</div>
//                     <div className="text-xs text-gray-500">bookings</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <QuickActionCard
//             title="Manage Listings"
//             description="Approve or reject listings"
//             icon={<Briefcase className="w-5 h-5 text-blue-600" />}
//             color="blue"
//             link="/admin/listings"
//           />

//           <QuickActionCard
//             title="Manage Users"
//             description="View and manage all users"
//             icon={<Users className="w-5 h-5 text-emerald-600" />}
//             color="emerald"
//             link="/admin/users"
//           />

//           <QuickActionCard
//             title="Manage Providers"
//             description="View service providers"
//             icon={<Shield className="w-5 h-5 text-purple-600" />}
//             color="purple"
//             link="/admin/providers"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // StatCard Component
// function StatCard({ title, value, icon, color, subtext, link, trend, trendUp }) {
//   const bgColor = {
//     blue: 'bg-gradient-to-br from-blue-50 to-blue-100/30 border-blue-200',
//     emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100/30 border-emerald-200',
//     purple: 'bg-gradient-to-br from-purple-50 to-purple-100/30 border-purple-200',
//     amber: 'bg-gradient-to-br from-amber-50 to-amber-100/30 border-amber-200'
//   }[color] || 'bg-gray-50 border-gray-200'

//   const iconBg = {
//     blue: 'bg-blue-100 text-blue-600',
//     emerald: 'bg-emerald-100 text-emerald-600',
//     purple: 'bg-purple-100 text-purple-600',
//     amber: 'bg-amber-100 text-amber-600'
//   }[color] || 'bg-gray-100 text-gray-600'

//   const content = (
//     <div className={`rounded-xl p-5 border ${bgColor} hover:shadow-md transition-all duration-200`}>
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-sm font-medium text-gray-600">{title}</p>
//             {trend && (
//               <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
//                 {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
//                 {trend}
//               </div>
//             )}
//           </div>
//           <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
//           {subtext && (
//             <p className="text-xs text-gray-500 mt-2">{subtext}</p>
//           )}
//         </div>
//         <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ml-4`}>
//           {icon}
//         </div>
//       </div>
//       {link && (
//         <div className="mt-4 pt-3 border-t border-gray-200/50">
//           <Link to={link} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
//             View details
//             <ArrowUpRight className="w-3 h-3 ml-1" />
//           </Link>
//         </div>
//       )}
//     </div>
//   )

//   return link ? <Link to={link}>{content}</Link> : content
// }

// // QuickActionCard Component
// function QuickActionCard({ title, description, icon, color, link }) {
//   const bgColor = {
//     blue: 'bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-300',
//     emerald: 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200 hover:border-emerald-300',
//     purple: 'bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:border-purple-300'
//   }[color] || 'bg-gray-50 border-gray-200'

//   const iconBg = {
//     blue: 'bg-blue-100 group-hover:bg-blue-200',
//     emerald: 'bg-emerald-100 group-hover:bg-emerald-200',
//     purple: 'bg-purple-100 group-hover:bg-purple-200'
//   }[color] || 'bg-gray-100'

//   return (
//     <Link 
//       to={link} 
//       className={`group rounded-xl p-5 border ${bgColor} hover:shadow-md transition-all duration-200`}
//     >
//       <div className="flex items-center gap-4">
//         <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
//           {icon}
//         </div>
//         <div>
//           <h3 className="font-semibold text-gray-900">{title}</h3>
//           <p className="text-sm text-gray-500 mt-1">{description}</p>
//         </div>
//       </div>
//       <div className="flex justify-end mt-4">
//         <div className="text-sm text-gray-400 group-hover:text-blue-600 transition-colors">
//           Access →
//         </div>
//       </div>
//     </Link>
//   )
// }





import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  TrendingUp,
  DollarSign,
  Shield,
  Loader2,
  Calendar,
  PieChart as PieChartIcon,
  Activity,
  Star,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Target,
  TrendingDown
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalProviders: 0,
    totalListings: 0,
    pendingListings: 0,
    approvedListings: 0,
    totalBookings: 0,
    completedBookings: 0,
    totalReviews: 0,
    averageRating: 0
  })
  const [recentListings, setRecentListings] = useState([])
  const [topCategories, setTopCategories] = useState([])
  const [topServices, setTopServices] = useState([])
  const [chartData, setChartData] = useState({
    dailyBookings: [],
    categoryDistribution: [],
    userStats: [],
    revenueStats: {}
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [revenueGrowth, setRevenueGrowth] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError('')
    try {
      // Fetch all data in parallel
      const [
        statsRes, 
        listingsRes, 
        categoriesRes, 
        servicesRes,
        dailyBookingsRes,
        categoryDistRes,
        userStatsRes,
        revenueRes
      ] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/listings/pending'),
        fetch('/api/admin/top-categories?limit=5'),
        fetch('/api/admin/top-services?limit=5'),
        fetch('/api/admin/stats/daily-bookings'),
        fetch('/api/admin/stats/category-distribution'),
        fetch('/api/admin/stats/user-statistics'),
        fetch('/api/admin/stats/revenue')
      ])

      // Handle stats
      if (!statsRes.ok) throw new Error('Failed to fetch stats')
      const statsData = await statsRes.json()
      setStats(statsData)

      // Handle pending listings
      if (listingsRes.ok) {
        const listingsData = await listingsRes.json()
        setRecentListings(listingsData.slice(0, 5))
      }

      // Handle top categories
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setTopCategories(categoriesData)
      }

      // Handle top services
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setTopServices(servicesData)
      }

      // Handle chart data
      let dailyBookings = []
      if (dailyBookingsRes.ok) {
        const dailyData = await dailyBookingsRes.json()
        dailyBookings = Object.entries(dailyData).map(([date, value]) => ({
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          bookings: value
        }))
      }

      let categoryDistribution = []
      if (categoryDistRes.ok) {
        const categoryData = await categoryDistRes.json()
        categoryDistribution = Object.entries(categoryData).map(([name, value]) => ({
          name,
          value
        }))
      }

      let userStats = []
      if (userStatsRes.ok) {
        const userData = await userStatsRes.json()
        userStats = [
          { name: 'Customers', count: userData.customers || 0 },
          { name: 'Providers', count: userData.providers || 0 },
          { name: 'Admins', count: userData.admins || 0 },
          { name: 'Active', count: userData.activeUsers || 0 }
        ]
      }

      let revenueStats = {}
if (revenueRes.ok) {
  revenueStats = await revenueRes.json()
  
  // Calculate average booking value if not provided
  if (!revenueStats.averageBookingValue && revenueStats.completedBookings) {
    revenueStats.averageBookingValue = revenueStats.totalRevenue / revenueStats.completedBookings;
  }
  
  console.log("Revenue Data:", revenueStats);
}

setChartData({
  dailyBookings,
  categoryDistribution,
  userStats,
  revenueStats
});

    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const approveListing = async (listingId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const response = await fetch('/api/admin/listings/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listingId,
          adminId: user.id,
          adminNotes: 'Approved by admin'
        })
      })
      if (response.ok) {
        fetchDashboardData() // Refresh all data
      } else {
        throw new Error('Failed to approve listing')
      }
    } catch (error) {
      console.error('Failed to approve listing:', error)
      alert('Failed to approve listing')
    }
  }

  const rejectListing = async (listingId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const response = await fetch('/api/admin/listings/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listingId,
          adminId: user.id,
          adminNotes: 'Rejected by admin'
        })
      })
      if (response.ok) {
        fetchDashboardData() // Refresh all data
      } else {
        throw new Error('Failed to reject listing')
      }
    } catch (error) {
      console.error('Failed to reject listing:', error)
      alert('Failed to reject listing')
    }
  }

  // Chart colors
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-gray-900 font-medium mb-2">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and analytics</p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="text-sm text-gray-500 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Activity className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="blue"
          subtext={`${stats.totalCustomers} Customers • ${stats.totalProviders} Providers`}
          link="/admin/users"
          trend={`${chartData.revenueStats.userGrowth || 0}%`}
          trendUp={chartData.revenueStats.userGrowth > 0}
        />

        <StatCard
          title="Listings"
          value={stats.totalListings}
          icon={<Briefcase className="w-6 h-6 text-emerald-600" />}
          color="emerald"
          subtext={`${stats.approvedListings} Approved • ${stats.pendingListings} Pending`}
          link="/admin/listings"
          trend="+8.2%"
          trendUp={true}
        />

        <StatCard
  title="Bookings"
  value={stats.totalBookings}
  icon={<CreditCard className="w-6 h-6 text-purple-600" />}
  color="purple"
  subtext={`${chartData.revenueStats.completedBookings || 0} Completed • ${(chartData.revenueStats.conversionRate || 0).toFixed(1)}% Conversion`}
  trend={`${(chartData.revenueStats.conversionRate || 0).toFixed(1)}%`}
  trendUp={true}
/>

        <StatCard
          title="Rating"
          value={stats.averageRating.toFixed(1)}
          icon={<Star className="w-6 h-6 text-amber-600" />}
          color="amber"
          subtext={`Based on ${stats.totalReviews} reviews`}
          trend="+0.4"
          trendUp={true}
        />
      </div>

      {/* Revenue Overview Section */}
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <DollarSign className="w-5 h-5 text-purple-600" />
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">Revenue Overview</h2>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Real-time from database</span>
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {/* Total Revenue Card */}
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-100">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
        <div className={`flex items-center gap-1 text-xs font-medium ${chartData.revenueStats.revenueGrowth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          {chartData.revenueStats.revenueGrowth > 0 ? 
            <ArrowUpRight className="w-3 h-3" /> : 
            <ArrowDownRight className="w-3 h-3" />
          }
          {chartData.revenueStats.revenueGrowth?.toFixed(1) || '0.0'}%
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
        ₹{chartData.revenueStats.totalRevenue?.toLocaleString(undefined, { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        }) || '0.00'}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        From {chartData.revenueStats.completedBookings || 0} completed bookings
      </p>
    </div>

    {/* Average Booking Value Card */}
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
      <p className="text-sm font-medium text-gray-600">Avg. Booking Value</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
        ₹{(chartData.revenueStats.averageBookingValue || 0).toFixed(2)}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">Per booking</span>
        <span className="text-xs text-emerald-600 font-medium">
          {chartData.revenueStats.completedBookings || 0} bookings
        </span>
      </div>
    </div>

    {/* Monthly Revenue Card */}
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 border border-emerald-100">
      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
        ₹{chartData.revenueStats.monthlyRevenue?.toLocaleString(undefined, { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        }) || '0.00'}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">Current month</span>
        <span className="text-xs text-emerald-600 font-medium">
          {chartData.revenueStats.monthlyRevenue > chartData.revenueStats.weeklyRevenue ? '+' : ''}
        </span>
      </div>
    </div>

    {/* Weekly Revenue Card */}
    <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-4 border border-amber-100">
      <p className="text-sm font-medium text-gray-600">Weekly Revenue</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
        ₹{chartData.revenueStats.weeklyRevenue?.toLocaleString(undefined, { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        }) || '0.00'}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">Last 7 days</span>
        <span className="text-xs text-emerald-600 font-medium">+{chartData.revenueStats.completedBookings || 0} bookings</span>
      </div>
    </div>
  </div>

  {/* Additional Revenue Metrics */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">Conversion Rate</p>
      <p className="text-xl font-bold text-gray-900 mt-1">
        {(chartData.revenueStats.conversionRate || 0).toFixed(1)}%
      </p>
      <div className="flex items-center gap-1 mt-2">
        <Target className="w-4 h-4 text-blue-600" />
        <span className="text-xs text-gray-500">
          {chartData.revenueStats.completedBookings || 0} / {chartData.revenueStats.totalBookings || 0} bookings
        </span>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">Avg. Revenue per User</p>
      <p className="text-xl font-bold text-gray-900 mt-1">
        ₹{(chartData.revenueStats.avgRevenuePerUser || 0).toFixed(2)}
      </p>
      <div className="flex items-center gap-1 mt-2">
        <Users className="w-4 h-4 text-green-600" />
        <span className="text-xs text-gray-500">
          Based on {stats.totalUsers || 0} users
        </span>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Booking Status</p>
        <span className="text-xs text-gray-500">Total: {chartData.revenueStats.totalBookings || 0}</span>
      </div>
      <div className="space-y-1 mt-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-emerald-600 font-medium">Completed</span>
          <span className="text-sm font-medium">{chartData.revenueStats.completedBookings || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-amber-600 font-medium">Pending</span>
          <span className="text-sm font-medium">{chartData.revenueStats.pendingBookings || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-red-600 font-medium">Cancelled</span>
          <span className="text-sm font-medium">{chartData.revenueStats.cancelledBookings || 0}</span>
        </div>
      </div>
    </div>
  </div>
  
  {/* Summary */}
  <div className="mt-6 pt-4 border-t border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-700">Revenue Summary</p>
        <p className="text-xs text-gray-500 mt-1">
          ₹{chartData.revenueStats.totalRevenue || '0'} total revenue from {chartData.revenueStats.completedBookings || 0} completed bookings
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-700">
          Avg. ₹{(chartData.revenueStats.averageBookingValue || 0).toFixed(2)} per booking
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {(chartData.revenueStats.conversionRate || 0).toFixed(1)}% conversion rate
        </p>
      </div>
    </div>
  </div>
</div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Bookings Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Daily Bookings</h2>
            </div>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.dailyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [value, 'Bookings']}
                  labelFormatter={(label, items) => {
                    if (items && items[0]) {
                      return chartData.dailyBookings.find(d => d.date === label)?.fullDate || label;
                    }
                    return label;
                  }}
                />
                <Bar 
                  dataKey="bookings" 
                  fill="#4F46E5" 
                  radius={[4, 4, 0, 0]}
                  name="Bookings"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Category Distribution</h2>
            </div>
            <span className="text-sm text-gray-500">Active listings</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => 
                    percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''
                  }
                  outerRadius={70}
                  innerRadius={30}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {chartData.categoryDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} listings`,
                    props.payload.name
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend 
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: '20px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* User Statistics Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">User Statistics</h2>
          </div>
          <span className="text-sm text-gray-500">Real-time from database</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData.userStats}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#f3f4f6" 
                vertical={false}
              />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value) => [value, 'Users']}
              />
              <Bar 
                dataKey="count" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
                name="Users"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-xl font-bold text-gray-900">{chartData.userStats.find(u => u.name === 'Active')?.count || 0}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">New This Month</p>
            <p className="text-xl font-bold text-gray-900">{chartData.revenueStats.newUsersThisMonth || 0}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Verified Users</p>
            <p className="text-xl font-bold text-gray-900">{chartData.revenueStats.verifiedUsers || 0}</p>
          </div>
        </div>
      </div>

      {/* Pending Listings and Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Listings */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Pending Listings</h2>
              <p className="text-sm text-gray-500 mt-1">Awaiting approval</p>
            </div>
            <Link to="/admin/listings?status=PENDING" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all →
            </Link>
          </div>
          
          {recentListings.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No pending listings</p>
              <p className="text-sm text-gray-400 mt-1">All listings are approved</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{listing.serviceName}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${listing.category === 'Cleaning' ? 'bg-blue-100 text-blue-700' : listing.category === 'Repair' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                        {listing.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{listing.provider?.username}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{listing.location}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 truncate">{listing.description?.substring(0, 60)}...</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <div className="text-lg font-semibold text-gray-900">${listing.price}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveListing(listing.id)}
                        className="px-3 py-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectListing(listing.id)}
                        className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Top Categories</h2>
              <p className="text-sm text-gray-500 mt-1">Most popular by bookings</p>
            </div>
            <Link to="/admin/top-categories" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all →
            </Link>
          </div>
          
          {topCategories.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No category data available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${index === 0 ? 'bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200' : index === 1 ? 'bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200' : index === 2 ? 'bg-gradient-to-br from-amber-50 to-amber-100/30 border border-amber-100' : 'bg-gray-50 border border-gray-100'} flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${index === 0 ? 'text-amber-700' : index === 1 ? 'text-gray-700' : index === 2 ? 'text-amber-600' : 'text-gray-600'}`}>
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.category}</h3>
                      <p className="text-sm text-gray-500">{category.listingCount} listings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{category.bookingCount}</div>
                    <div className="text-xs text-gray-500">bookings</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Manage Listings"
            description="Approve or reject listings"
            icon={<Briefcase className="w-5 h-5 text-blue-600" />}
            color="blue"
            link="/admin/listings"
          />

          <QuickActionCard
            title="Manage Users"
            description="View and manage all users"
            icon={<Users className="w-5 h-5 text-emerald-600" />}
            color="emerald"
            link="/admin/users"
          />

          <QuickActionCard
            title="Manage Providers"
            description="View service providers"
            icon={<Shield className="w-5 h-5 text-purple-600" />}
            color="purple"
            link="/admin/providers"
          />
        </div>
      </div>
    </div>
  )
}

// StatCard Component
function StatCard({ title, value, icon, color, subtext, link, trend, trendUp }) {
  const bgColor = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100/30 border-blue-200',
    emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100/30 border-emerald-200',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100/30 border-purple-200',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100/30 border-amber-200'
  }[color] || 'bg-gray-50 border-gray-200'

  const iconBg = {
    blue: 'bg-blue-100 text-blue-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600'
  }[color] || 'bg-gray-100 text-gray-600'

  const content = (
    <div className={`rounded-xl p-5 border ${bgColor} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {trend}
              </div>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
          {subtext && (
            <p className="text-xs text-gray-500 mt-2">{subtext}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ml-4`}>
          {icon}
        </div>
      </div>
      {link && (
        <div className="mt-4 pt-3 border-t border-gray-200/50">
          <Link to={link} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
            View details
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      )}
    </div>
  )

  return link ? <Link to={link}>{content}</Link> : content
}

// QuickActionCard Component
function QuickActionCard({ title, description, icon, color, link }) {
  const bgColor = {
    blue: 'bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-300',
    emerald: 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200 hover:border-emerald-300',
    purple: 'bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:border-purple-300'
  }[color] || 'bg-gray-50 border-gray-200'

  const iconBg = {
    blue: 'bg-blue-100 group-hover:bg-blue-200',
    emerald: 'bg-emerald-100 group-hover:bg-emerald-200',
    purple: 'bg-purple-100 group-hover:bg-purple-200'
  }[color] || 'bg-gray-100'

  return (
    <Link 
      to={link} 
      className={`group rounded-xl p-5 border ${bgColor} hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <div className="text-sm text-gray-400 group-hover:text-blue-600 transition-colors">
          Access →
        </div>
      </div>
    </Link>
  )
}