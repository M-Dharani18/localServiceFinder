// // import { useState, useEffect } from 'react'
// // import { Search, Users as UsersIcon, Mail, User, Shield, Trash2, Eye } from 'lucide-react'

// // export default function AdminUsers() {
// //   const [allUsers, setAllUsers] = useState([])
// //   const [customers, setCustomers] = useState([])
// //   const [providers, setProviders] = useState([])
// //   const [activeTab, setActiveTab] = useState('all')
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     fetchUsers()
// //   }, [])

// //   const fetchUsers = async () => {
// //     setLoading(true)
// //     try {
// //       // Fetch all users
// //       const allRes = await fetch('/api/admin/users')
// //       if (allRes.ok) {
// //         const allData = await allRes.json()
// //         setAllUsers(allData)
// //       }

// //       // Fetch customers
// //       const customersRes = await fetch('/api/admin/users/customers')
// //       if (customersRes.ok) {
// //         const customersData = await customersRes.json()
// //         setCustomers(customersData)
// //       }

// //       // Fetch providers
// //       const providersRes = await fetch('/api/admin/users/providers')
// //       if (providersRes.ok) {
// //         const providersData = await providersRes.json()
// //         setProviders(providersData)
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch users:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const deleteUser = async (userId) => {
// //     if (!window.confirm('Are you sure you want to delete this user?')) return
    
// //     try {
// //       const response = await fetch(`/api/admin/users/${userId}`, {
// //         method: 'DELETE'
// //       })
// //       if (response.ok) {
// //         fetchUsers() // Refresh the list
// //       } else {
// //         throw new Error('Failed to delete user')
// //       }
// //     } catch (error) {
// //       console.error('Failed to delete user:', error)
// //       alert('Failed to delete user')
// //     }
// //   }

// //   const getUsers = () => {
// //     switch (activeTab) {
// //       case 'customers': return customers
// //       case 'providers': return providers
// //       default: return allUsers
// //     }
// //   }

// //   const filteredUsers = getUsers().filter(user =>
// //     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
// //   )

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-[60vh]">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading users...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
// //           <p className="text-gray-600 mt-1">View and manage all platform users</p>
// //         </div>
// //         <div className="text-sm text-gray-500">
// //           {filteredUsers.length} users found
// //         </div>
// //       </div>

// //       {/* Tabs and Search */}
// //       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //         <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
// //           <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
// //             {[
// //               { id: 'all', label: 'All Users', count: allUsers.length },
// //               { id: 'customers', label: 'Customers', count: customers.length },
// //               { id: 'providers', label: 'Providers', count: providers.length }
// //             ].map((tab) => (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => setActiveTab(tab.id)}
// //                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
// //                   activeTab === tab.id
// //                     ? 'bg-white text-gray-900 shadow'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 {tab.label} ({tab.count})
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search users by name or email..."
// //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Users Table */}
// //       <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
// //         {filteredUsers.length === 0 ? (
// //           <div className="text-center p-12">
// //             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// //               <UsersIcon className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
// //             <p className="text-gray-500">
// //               {searchTerm ? 'Try a different search term' : 'No users available'}
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {filteredUsers.map((user) => (
// //                   <tr key={user.id} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center">
// //                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
// //                           {user.username?.charAt(0) || user.email?.charAt(0)}
// //                         </div>
// //                         <div className="ml-4">
// //                           <div className="font-medium text-gray-900">{user.username}</div>
// //                           <div className="text-sm text-gray-500">ID: {user.id}</div>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center text-sm text-gray-900">
// //                         <Mail className="w-4 h-4 mr-2 text-gray-400" />
// //                         {user.email}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
// //                         user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
// //                         user.role === 'PROVIDER' ? 'bg-blue-100 text-blue-800' :
// //                         'bg-emerald-100 text-emerald-800'
// //                       }`}>
// //                         {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
// //                         {user.role === 'PROVIDER' && <User className="w-3 h-3" />}
// //                         {user.role}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       {/* If your user model has createdAt field */}
// //                       {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={() => deleteUser(user.id)}
// //                           className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
// //                           disabled={user.role === 'ADMIN'}
// //                           title={user.role === 'ADMIN' ? 'Cannot delete admin users' : 'Delete user'}
// //                         >
// //                           <Trash2 className="w-3 h-3" />
// //                           Delete
// //                         </button>
// //                         <button
// //                           className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
// //                           title="View user details"
// //                         >
// //                           <Eye className="w-3 h-3" />
// //                           View
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }




// import { useState, useEffect } from 'react'
// import { Search, Users as UsersIcon, Mail, User, Shield, Trash2, Eye, Calendar, Award, TrendingUp, X } from 'lucide-react'

// export default function AdminUsers() {
//   const [allUsers, setAllUsers] = useState([])
//   const [customers, setCustomers] = useState([])
//   const [providers, setProviders] = useState([])
//   const [activeTab, setActiveTab] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [userDetails, setUserDetails] = useState(null)
//   const [loadingDetails, setLoadingDetails] = useState(false)

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     setLoading(true)
//     try {
//       // Fetch all users
//       const allRes = await fetch('/api/admin/users')
//       if (allRes.ok) {
//         const allData = await allRes.json()
//         setAllUsers(allData)
//       }

//       // Fetch customers
//       const customersRes = await fetch('/api/admin/users/customers')
//       if (customersRes.ok) {
//         const customersData = await customersRes.json()
//         setCustomers(customersData)
//       }

//       // Fetch providers
//       const providersRes = await fetch('/api/admin/users/providers')
//       if (providersRes.ok) {
//         const providersData = await providersRes.json()
//         setProviders(providersData)
//       }
//     } catch (error) {
//       console.error('Failed to fetch users:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchUserDetails = async (userId) => {
//     setLoadingDetails(true)
//     try {
//       const [statsRes, activityRes] = await Promise.all([
//         fetch(`/api/admin/users/${userId}/stats`),
//         fetch(`/api/admin/users/${userId}/activity`)
//       ])

//       if (statsRes.ok && activityRes.ok) {
//         const [statsData, activityData] = await Promise.all([
//           statsRes.json(),
//           activityRes.json()
//         ])
        
//         setUserDetails({
//           stats: statsData,
//           activity: activityData
//         })
//       } else {
//         console.error('Failed to fetch user details')
//       }
//     } catch (error) {
//       console.error('Failed to fetch user details:', error)
//     } finally {
//       setLoadingDetails(false)
//     }
//   }

//   const handleViewUser = async (user) => {
//     setSelectedUser(user)
//     await fetchUserDetails(user.id)
//   }

//   const closeUserOverlay = () => {
//     setSelectedUser(null)
//     setUserDetails(null)
//   }

//   const deleteUser = async (userId) => {
//     if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: 'DELETE'
//       })
//       if (response.ok) {
//         fetchUsers() // Refresh the list
//         if (selectedUser?.id === userId) {
//           closeUserOverlay()
//         }
//       } else {
//         throw new Error('Failed to delete user')
//       }
//     } catch (error) {
//       console.error('Failed to delete user:', error)
//       alert('Failed to delete user')
//     }
//   }

//   const getUsers = () => {
//     switch (activeTab) {
//       case 'customers': return customers
//       case 'providers': return providers
//       default: return allUsers
//     }
//   }

//   const filteredUsers = getUsers().filter(user =>
//     user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading users...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4 p-4 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 min-h-screen">
//       {/* Header with Stats */}
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-5 text-white">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-white">User Management</h1>
//             <p className="text-indigo-100 text-sm mt-1">Manage and monitor all platform users</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
//               <div className="text-2xl font-bold text-white">{allUsers.length}</div>
//               <div className="text-xs text-indigo-100">Total Users</div>
//             </div>
//             <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
//               <div className="text-2xl font-bold text-white">{providers.length}</div>
//               <div className="text-xs text-indigo-100">Providers</div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex space-x-1 mt-4">
//           {[
//             { id: 'all', label: 'All Users', count: allUsers.length },
//             { id: 'customers', label: 'Customers', count: customers.length },
//             { id: 'providers', label: 'Providers', count: providers.length }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 activeTab === tab.id
//                   ? 'bg-white text-indigo-600 shadow-lg'
//                   : 'text-indigo-100 hover:bg-white/20'
//               }`}
//             >
//               {tab.label} ({tab.count})
//             </button>
//           ))}
//         </div>

//         {/* Search */}
//         <div className="relative mt-5">
//           <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl"></div>
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
//           <input
//             type="text"
//             placeholder="Search users by name or email..."
//             className="relative w-full pl-12 pr-28 py-3.5 text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500 shadow-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md z-10"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold text-blue-700">{allUsers.length}</div>
//               <div className="text-sm text-blue-600 font-medium">All Users</div>
//             </div>
//             <UsersIcon className="w-8 h-8 text-blue-500/60" />
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold text-emerald-700">{providers.length}</div>
//               <div className="text-sm text-emerald-600 font-medium">Providers</div>
//             </div>
//             <User className="w-8 h-8 text-emerald-500/60" />
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold text-amber-700">{customers.length}</div>
//               <div className="text-sm text-amber-600 font-medium">Customers</div>
//             </div>
//             <UsersIcon className="w-8 h-8 text-amber-500/60" />
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold text-purple-700">{allUsers.filter(u => u.role === 'ADMIN').length}</div>
//               <div className="text-sm text-purple-600 font-medium">Admins</div>
//             </div>
//             <Shield className="w-8 h-8 text-purple-500/60" />
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
//         {filteredUsers.length === 0 ? (
//           <div className="text-center p-12">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
//               <UsersIcon className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
//             <p className="text-gray-500">
//               {searchTerm ? 'Try a different search term' : 'No users available'}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-sm">
//                           {user.username?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <div className="ml-4">
//                           <div className="font-medium text-gray-900">{user.username}</div>
//                           <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <Mail className="w-4 h-4 mr-2 text-gray-400" />
//                         {user.email}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
//                         user.role === 'ADMIN' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
//                         user.role === 'PROVIDER' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' :
//                         'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
//                       }`}>
//                         {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
//                         {user.role === 'PROVIDER' && <User className="w-3 h-3" />}
//                         {user.role}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleViewUser(user)}
//                           className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-sm font-medium"
//                           title="View user details"
//                         >
//                           <Eye className="w-3 h-3" />
//                           View
//                         </button>
//                         <button
//                           onClick={() => deleteUser(user.id)}
//                           className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-sm font-medium"
//                           disabled={user.role === 'ADMIN'}
//                           title={user.role === 'ADMIN' ? 'Cannot delete admin users' : 'Delete user'}
//                         >
//                           <Trash2 className="w-3 h-3" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* User Detail Overlay */}
//       {selectedUser && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-300">
//             {/* Modal Header */}
//             <div className={`p-5 text-white relative ${
//               selectedUser.role === 'ADMIN' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
//               selectedUser.role === 'PROVIDER' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
//               'bg-gradient-to-r from-emerald-500 to-green-600'
//             }`}>
//               <button
//                 onClick={closeUserOverlay}
//                 className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center font-bold text-xl shadow-lg" style={{
//                   color: selectedUser.role === 'ADMIN' ? '#9333ea' :
//                         selectedUser.role === 'PROVIDER' ? '#3b82f6' :
//                         '#10b981'
//                 }}>
//                   {selectedUser.username?.charAt(0)?.toUpperCase() || selectedUser.email?.charAt(0)?.toUpperCase()}
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">{selectedUser.username}</h2>
//                   <p className="text-white/90 text-sm">{selectedUser.email}</p>
//                   <div className="flex items-center gap-3 mt-2">
//                     <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
//                       {selectedUser.role}
//                     </div>
//                     <div className="flex items-center gap-1 text-xs text-white/80">
//                       <Calendar className="w-3 h-3" />
//                       Joined {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Content */}
//             <div className="overflow-y-auto max-h-[calc(90vh-140px)] bg-gradient-to-br from-gray-50 to-indigo-50/30">
//               {loadingDetails ? (
//                 <div className="flex items-center justify-center py-16">
//                   <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600 text-sm">Loading user details...</p>
//                   </div>
//                 </div>
//               ) : userDetails ? (
//                 <div className="p-5 space-y-4">
//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm">
//                       <div className="flex items-center justify-between">
//                         <TrendingUp className="w-8 h-8 text-blue-500" />
//                         <div className="text-right">
//                           <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalActivities || 0}</div>
//                           <div className="text-sm text-blue-600">Activities</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 shadow-sm">
//                       <div className="flex items-center justify-between">
//                         <Calendar className="w-8 h-8 text-emerald-500" />
//                         <div className="text-right">
//                           <div className="text-xl font-bold text-gray-800">{userDetails.stats?.activeDays || 0}</div>
//                           <div className="text-sm text-emerald-600">Active Days</div>
//                         </div>
//                       </div>
//                     </div>
//                     {selectedUser.role === 'PROVIDER' ? (
//                       <>
//                         <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm">
//                           <div className="flex items-center justify-between">
//                             <Award className="w-8 h-8 text-purple-500" />
//                             <div className="text-right">
//                               <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalListings || 0}</div>
//                               <div className="text-sm text-purple-600">Listings</div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 shadow-sm">
//                           <div className="flex items-center justify-between">
//                             <TrendingUp className="w-8 h-8 text-amber-500" />
//                             <div className="text-right">
//                               <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalBookings || 0}</div>
//                               <div className="text-sm text-amber-600">Bookings</div>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm">
//                           <div className="flex items-center justify-between">
//                             <Award className="w-8 h-8 text-purple-500" />
//                             <div className="text-right">
//                               <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalBookings || 0}</div>
//                               <div className="text-sm text-purple-600">Bookings</div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 shadow-sm">
//                           <div className="flex items-center justify-between">
//                             <TrendingUp className="w-8 h-8 text-amber-500" />
//                             <div className="text-right">
//                               <div className="text-xl font-bold text-gray-800">${userDetails.stats?.totalSpent?.toFixed(0) || '0'}</div>
//                               <div className="text-sm text-amber-600">Total Spent</div>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>

//                   {/* User Information */}
//                   <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5">
//                     <h3 className="font-semibold text-gray-800 mb-4">User Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                         <Mail className="w-5 h-5 text-blue-500" />
//                         <div>
//                           <div className="text-xs text-gray-500">Email Address</div>
//                           <div className="font-medium text-gray-800">{selectedUser.email}</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                         <UsersIcon className="w-5 h-5 text-emerald-500" />
//                         <div>
//                           <div className="text-xs text-gray-500">User Role</div>
//                           <div className="font-medium text-gray-800">{selectedUser.role}</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                         <Calendar className="w-5 h-5 text-purple-500" />
//                         <div>
//                           <div className="text-xs text-gray-500">Member Since</div>
//                           <div className="font-medium text-gray-800">
//                             {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                         <Award className="w-5 h-5 text-amber-500" />
//                         <div>
//                           <div className="text-xs text-gray-500">User Status</div>
//                           <div className="font-medium text-green-600">Active</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Activity */}
//                   {userDetails.activity && userDetails.activity.length > 0 && (
//                     <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl overflow-hidden">
//                       <div className="p-5 border-b border-gray-200">
//                         <h3 className="font-semibold text-gray-800">Recent Activity</h3>
//                         <p className="text-sm text-gray-600 mt-1">Last {userDetails.activity.length} activities</p>
//                       </div>
//                       <div className="p-5">
//                         <div className="space-y-3 max-h-64 overflow-y-auto">
//                           {userDetails.activity.map((activity, index) => (
//                             <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
//                               <div className="flex justify-between items-start mb-2">
//                                 <div className="font-medium text-sm text-gray-800">{activity.action}</div>
//                                 <div className="text-xs text-gray-500">
//                                   {new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                 </div>
//                               </div>
//                               <p className="text-xs text-gray-600">{activity.details}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 text-sm mb-3">Failed to load user details</p>
//                   <button 
//                     onClick={() => fetchUserDetails(selectedUser.id)}
//                     className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 text-sm font-medium shadow-sm"
//                   >
//                     Retry
//                   </button>
//                 </div>
//               )}

//               {/* Delete Button */}
//               <div className="p-5 border-t border-gray-200 bg-white">
//                 <button
//                   onClick={() => deleteUser(selectedUser.id)}
//                   disabled={selectedUser.role === 'ADMIN'}
//                   className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
//                     selectedUser.role === 'ADMIN'
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md'
//                   }`}
//                   title={selectedUser.role === 'ADMIN' ? 'Cannot delete admin users' : 'Delete this user permanently'}
//                 >
//                   {selectedUser.role === 'ADMIN' ? 'Admin Users Cannot Be Deleted' : 'Delete User Account'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




import { useState, useEffect } from 'react'
import { Search, Users as UsersIcon, Mail, User, Shield, Trash2, Eye, Calendar, Award, TrendingUp, X } from 'lucide-react'

export default function AdminUsers() {
  const [allUsers, setAllUsers] = useState([])
  const [customers, setCustomers] = useState([])
  const [providers, setProviders] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // Fetch all users
      const allRes = await fetch('/api/admin/users')
      if (allRes.ok) {
        const allData = await allRes.json()
        setAllUsers(allData)
      }

      // Fetch customers
      const customersRes = await fetch('/api/admin/users/customers')
      if (customersRes.ok) {
        const customersData = await customersRes.json()
        setCustomers(customersData)
      }

      // Fetch providers
      const providersRes = await fetch('/api/admin/users/providers')
      if (providersRes.ok) {
        const providersData = await providersRes.json()
        setProviders(providersData)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserDetails = async (userId) => {
    setLoadingDetails(true)
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch(`/api/admin/users/${userId}/stats`),
        fetch(`/api/admin/users/${userId}/activity`)
      ])

      if (statsRes.ok && activityRes.ok) {
        const [statsData, activityData] = await Promise.all([
          statsRes.json(),
          activityRes.json()
        ])
        
        setUserDetails({
          stats: statsData,
          activity: activityData
        })
      } else {
        console.error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleViewUser = async (user) => {
    setSelectedUser(user)
    await fetchUserDetails(user.id)
  }

  const closeUserOverlay = () => {
    setSelectedUser(null)
    setUserDetails(null)
  }

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchUsers() // Refresh the list
        if (selectedUser?.id === userId) {
          closeUserOverlay()
        }
      } else {
        throw new Error('Failed to delete user')
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Failed to delete user')
    }
  }

  const getUsers = () => {
    switch (activeTab) {
      case 'customers': return customers
      case 'providers': return providers
      default: return allUsers
    }
  }

  const filteredUsers = getUsers().filter(user =>
    (user.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 min-h-screen">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 rounded-xl shadow-lg p-5 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-indigo-100 text-sm mt-1">Manage and monitor all platform users</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">{allUsers.length}</div>
              <div className="text-xs text-indigo-100">Total Users</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">{providers.length}</div>
              <div className="text-xs text-indigo-100">Providers</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4">
          {[
            { id: 'all', label: 'All Users', count: allUsers.length },
            { id: 'customers', label: 'Customers', count: customers.length },
            { id: 'providers', label: 'Providers', count: providers.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-indigo-100 hover:bg-white/20'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl"></div>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="relative w-full pl-12 pr-28 py-3.5 text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500 shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
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
              <div className="text-2xl font-bold text-blue-700">{allUsers.length}</div>
              <div className="text-sm text-blue-600 font-medium">All Users</div>
            </div>
            <UsersIcon className="w-8 h-8 text-blue-500/60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-700">{providers.length}</div>
              <div className="text-sm text-emerald-600 font-medium">Providers</div>
            </div>
            <User className="w-8 h-8 text-emerald-500/60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-700">{customers.length}</div>
              <div className="text-sm text-amber-600 font-medium">Customers</div>
            </div>
            <UsersIcon className="w-8 h-8 text-amber-500/60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">{allUsers.filter(u => u.role === 'ADMIN').length}</div>
              <div className="text-sm text-purple-600 font-medium">Admins</div>
            </div>
            <Shield className="w-8 h-8 text-purple-500/60" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {filteredUsers.length === 0 ? (
          <div className="text-center p-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try a different search term' : 'No users available'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  // Safely handle user ID - convert to string if needed
                  const userId = String(user.id || '');
                  const shortId = userId.length > 8 ? userId.substring(0, 8) + '...' : userId;
                  
                  return (
                    <tr key={userId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-sm">
                            {user.username?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{user.username || 'No name'}</div>
                            <div className="text-sm text-gray-500">ID: {shortId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {user.email || 'No email'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                          user.role === 'ADMIN' ? 'bg-gradient-to-r from-purple-500 to-purple-500 text-white' :
                          user.role === 'PROVIDER' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' :
                          'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                        }`}>
                          {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                          {user.role === 'PROVIDER' && <User className="w-3 h-3" />}
                          {user.role || 'USER'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-sm font-medium"
                            title="View user details"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gradient-to-r from-red-500 to-red-500 text-white rounded-lg hover:from-red-600 hover:to-white-600 transition-all shadow-sm font-medium"
                            disabled={user.role === 'ADMIN'}
                            title={user.role === 'ADMIN' ? 'Cannot delete admin users' : 'Delete user'}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Detail Overlay */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-300">
            {/* Modal Header */}
            <div className={`p-5 text-white relative ${
              selectedUser.role === 'ADMIN' ? 'bg-gradient-to-r from-purple-600 to-purple-600' :
              selectedUser.role === 'PROVIDER' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
              'bg-gradient-to-r from-emerald-500 to-green-600'
            }`}>
              <button
                onClick={closeUserOverlay}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center font-bold text-xl shadow-lg" style={{
                  color: selectedUser.role === 'ADMIN' ? '#9333ea' :
                        selectedUser.role === 'PROVIDER' ? '#3b82f6' :
                        '#10b981'
                }}>
                  {selectedUser.username?.charAt(0)?.toUpperCase() || selectedUser.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedUser.username || 'No name'}</h2>
                  <p className="text-white/90 text-sm">{selectedUser.email || 'No email'}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                      {selectedUser.role || 'USER'}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <Calendar className="w-3 h-3" />
                      Joined {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] bg-gradient-to-br from-gray-50 to-indigo-50/30">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading user details...</p>
                  </div>
                </div>
              ) : userDetails ? (
                <div className="p-5 space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <TrendingUp className="w-8 h-8 text-blue-500" />
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalActivities || 0}</div>
                          <div className="text-sm text-blue-600">Activities</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <Calendar className="w-8 h-8 text-emerald-500" />
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800">{userDetails.stats?.activeDays || 0}</div>
                          <div className="text-sm text-emerald-600">Active Days</div>
                        </div>
                      </div>
                    </div>
                    {selectedUser.role === 'PROVIDER' ? (
                      <>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <Award className="w-8 h-8 text-purple-500" />
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalListings || 0}</div>
                              <div className="text-sm text-purple-600">Listings</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <TrendingUp className="w-8 h-8 text-amber-500" />
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalBookings || 0}</div>
                              <div className="text-sm text-amber-600">Bookings</div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <Award className="w-8 h-8 text-purple-500" />
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-800">{userDetails.stats?.totalBookings || 0}</div>
                              <div className="text-sm text-purple-600">Bookings</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <TrendingUp className="w-8 h-8 text-amber-500" />
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-800">${userDetails.stats?.totalSpent?.toFixed(0) || '0'}</div>
                              <div className="text-sm text-amber-600">Total Spent</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* User Information */}
                  <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">User Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="text-xs text-gray-500">Email Address</div>
                          <div className="font-medium text-gray-800">{selectedUser.email || 'No email'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <UsersIcon className="w-5 h-5 text-emerald-500" />
                        <div>
                          <div className="text-xs text-gray-500">User Role</div>
                          <div className="font-medium text-gray-800">{selectedUser.role || 'USER'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <div>
                          <div className="text-xs text-gray-500">Member Since</div>
                          <div className="font-medium text-gray-800">
                            {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs text-gray-500">User Status</div>
                          <div className="font-medium text-green-600">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  {userDetails.activity && userDetails.activity.length > 0 && (
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="p-5 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                        <p className="text-sm text-gray-600 mt-1">Last {userDetails.activity.length} activities</p>
                      </div>
                      <div className="p-5">
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {userDetails.activity.slice(0, 5).map((activity, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-medium text-sm text-gray-800">{activity.action || 'Activity'}</div>
                                <div className="text-xs text-gray-500">
                                  {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{activity.details || 'No details available'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm mb-3">Failed to load user details</p>
                  <button 
                    onClick={() => fetchUserDetails(selectedUser.id)}
                    className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 text-sm font-medium shadow-sm"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Delete Button */}
              <div className="p-5 border-t border-gray-200 bg-white">
                <button
                  onClick={() => deleteUser(selectedUser.id)}
                  disabled={selectedUser.role === 'ADMIN'}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                    selectedUser.role === 'ADMIN'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-red-500 text-white hover:from-red-600 hover:to-white-600 shadow-md'
                  }`}
                  title={selectedUser.role === 'ADMIN' ? 'Cannot delete admin users' : 'Delete this user permanently'}
                >
                  {selectedUser.role === 'ADMIN' ? 'Admin Users Cannot Be Deleted' : 'Delete User Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}