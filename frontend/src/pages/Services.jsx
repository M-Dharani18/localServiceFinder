// import { useEffect, useMemo, useState } from 'react'
// import {
//   getAllAvailableListingsApi,
//   searchListingsApi,
//   filterByCategoryApi,
//   filterByLocationApi,
//   advancedSearchApi,
//   getCategoriesApi,
//   getLocationsApi,
// } from '@/api/listings'
// import ListingCard from '@/components/ListingCard'
// import { useAuth } from '@/context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// export default function Services() {
//   const { role, isAuthed } = useAuth()
//   const navigate = useNavigate()
//   const [list, setList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [categories, setCategories] = useState([])
//   const [locations, setLocations] = useState([])

//   const [filters, setFilters] = useState({
//     keyword: '',
//     category: '',
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     sortBy: '', // 'price_asc' | 'price_desc' | 'distance' | 'relevance'
//   })

//   const hasAnyFilter = useMemo(() => {
//     return Object.values(filters).some((v) => String(v || '').trim() !== '')
//   }, [filters])

//   const loadBase = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getAllAvailableListingsApi()
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load services')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const loadOptions = async () => {
//     try {
//       const [cats, locs] = await Promise.all([getCategoriesApi(), getLocationsApi()])
//       setCategories(cats || [])
//       setLocations(locs || [])
//     } catch {
//       // non-blocking
//     }
//   }

//   useEffect(() => {
//     loadBase()
//     loadOptions()
//   }, [])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setFilters((f) => ({ ...f, [name]: value }))
//   }

//   const onClear = () => {
//     setFilters({ keyword: '', category: '', location: '', minPrice: '', maxPrice: '', sortBy: '' })
//     loadBase()
//   }

//   const onSearch = async (e) => {
//     e?.preventDefault?.()
//     setLoading(true)
//     setError('')
//     try {
//       // Prefer advanced search when multiple filters present
//       const payload = {
//         keyword: filters.keyword || undefined,
//         category: filters.category || undefined,
//         location: filters.location || undefined,
//         minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
//         maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
//         sortBy: filters.sortBy || undefined,
//       }
//       const data = await advancedSearchApi(payload)
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to search')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onBook = (listing) => {
//     // Milestone 3 will implement booking flow
//     if (!isAuthed || role !== 'CUSTOMER') {
//       return navigate('/login', { replace: true })
//     }
//     navigate(`/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Find Services</h1>

//         <form onSubmit={onSearch} className="bg-white border rounded shadow p-4 grid gap-4">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Keyword</label>
//               <input name="keyword" value={filters.keyword} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search by name or description" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Category</label>
//               <select name="category" value={filters.category} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
//                 <option value="">All</option>
//                 {categories.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Location</label>
//               <select name="location" value={filters.location} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
//                 <option value="">All</option>
//                 {locations.map((l) => (
//                   <option key={l} value={l}>{l}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Min Price</label>
//               <input name="minPrice" type="number" step="0.01" value={filters.minPrice} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Max Price</label>
//               <input name="maxPrice" type="number" step="0.01" value={filters.maxPrice} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Sort By</label>
//               <select name="sortBy" value={filters.sortBy} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
//                 <option value="">Default</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="relevance">Relevance</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 justify-end">
//             <button type="button" onClick={onClear} className="px-4 py-2 rounded border">Clear</button>
//             <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Search</button>
//           </div>
//         </form>

//         <div className="mt-6">
//           {loading ? (
//             <div>Loading...</div>
//           ) : error ? (
//             <div className="text-red-600">{error}</div>
//           ) : list.length === 0 ? (
//             <div className="text-gray-600">No services found.</div>
//           ) : (
//             <div className="space-y-3">
//               {list.map((l) => (
//                 <ListingCard
//                   key={l.id}
//                   listing={l}
//                   action={
//                     <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => onBook(l)}>
//                       Book
//                     </button>
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
//   getAllAvailableListingsApi,
//   searchListingsApi,
//   filterByCategoryApi,
//   filterByLocationApi,
//   advancedSearchApi,
//   getCategoriesApi,
//   getLocationsApi,
// } from '@/api/listings'
// import ListingCard from '@/components/ListingCard'
// import { useAuth } from '@/context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// export default function Services() {
//   const { role, isAuthed } = useAuth()
//   const navigate = useNavigate()
//   const [list, setList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [categories, setCategories] = useState([])
//   const [locations, setLocations] = useState([])

//   const [filters, setFilters] = useState({
//     keyword: '',
//     category: '',
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     sortBy: '',
//   })

//   const hasAnyFilter = useMemo(() => {
//     return Object.values(filters).some((v) => String(v || '').trim() !== '')
//   }, [filters])

//   const loadBase = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getAllAvailableListingsApi()
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load services')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const loadOptions = async () => {
//     try {
//       const [cats, locs] = await Promise.all([getCategoriesApi(), getLocationsApi()])
//       setCategories(cats || [])
//       setLocations(locs || [])
//     } catch {
//       // non-blocking
//     }
//   }

//   useEffect(() => {
//     loadBase()
//     loadOptions()
//   }, [])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setFilters((f) => ({ ...f, [name]: value }))
//   }

//   const onClear = () => {
//     setFilters({ keyword: '', category: '', location: '', minPrice: '', maxPrice: '', sortBy: '' })
//     loadBase()
//   }

//   const onSearch = async (e) => {
//     e?.preventDefault?.()
//     setLoading(true)
//     setError('')
//     try {
//       const payload = {
//         keyword: filters.keyword || undefined,
//         category: filters.category || undefined,
//         location: filters.location || undefined,
//         minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
//         maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
//         sortBy: filters.sortBy || undefined,
//       }
//       const data = await advancedSearchApi(payload)
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to search')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onBook = (listing) => {
//     if (!isAuthed || role !== 'CUSTOMER') {
//       return navigate('/login', { replace: true })
//     }
//     navigate(`customer/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
//             Find Services
//           </h1>
//           <p className="text-gray-600">Discover and book the perfect service for your needs</p>
//         </div>

//         <form onSubmit={onSearch} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">🔍 Search & Filter</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Keyword</label>
//               <input 
//                 name="keyword" 
//                 value={filters.keyword} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 placeholder="Search by name or description" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//               <select 
//                 name="category" 
//                 value={filters.category} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <select 
//                 name="location" 
//                 value={filters.location} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//               >
//                 <option value="">All Locations</option>
//                 {locations.map((l) => (
//                   <option key={l} value={l}>{l}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price ($)</label>
//               <input 
//                 name="minPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.minPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price ($)</label>
//               <input 
//                 name="maxPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.maxPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//                 placeholder="1000.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
//               <select 
//                 name="sortBy" 
//                 value={filters.sortBy} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//               >
//                 <option value="">Default</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="relevance">Relevance</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 justify-end pt-4">
//             <button 
//               type="button" 
//               onClick={onClear} 
//               className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
//             >
//               Clear Filters
//             </button>
//             <button 
//               type="submit" 
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
//             >
//               🔍 Search
//             </button>
//           </div>
//         </form>

//         <div>
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {hasAnyFilter ? '🎯 Search Results' : '📋 All Services'}
//             </h2>
//             {list.length > 0 && (
//               <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-medium">
//                 {list.length} {list.length === 1 ? 'service' : 'services'} found
//               </span>
//             )}
//           </div>
          
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading services...</p>
//             </div>
//           ) : error ? (
//             <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//               <span className="font-medium">{error}</span>
//             </div>
//           ) : list.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//               <div className="text-5xl mb-4">🔍</div>
//               <p className="text-gray-600 text-lg mb-2">No services found</p>
//               <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {list.map((l) => (
//                 <ListingCard
//                   key={l.id}
//                   listing={l}
//                   action={
//                     <button 
//                       className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all" 
//                       onClick={() => onBook(l)}
//                     >
//                       📅 Book Now
//                     </button>
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
//   getAllAvailableListingsApi,
//   searchListingsApi,
//   filterByCategoryApi,
//   filterByLocationApi,
//   advancedSearchApi,
//   getCategoriesApi,
//   getLocationsApi,
// } from '@/api/listings'
// import ListingCard from '@/components/ListingCard'
// import { useAuth } from '@/context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// export default function Services() {
//   const { role, isAuthed } = useAuth()
//   const navigate = useNavigate()
//   const [list, setList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [categories, setCategories] = useState([])
//   const [locations, setLocations] = useState([])

//   const [filters, setFilters] = useState({
//     keyword: '',
//     category: '',
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     sortBy: '',
//   })

//   const hasAnyFilter = useMemo(() => {
//     return Object.values(filters).some((v) => String(v || '').trim() !== '')
//   }, [filters])

//   const loadBase = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getAllAvailableListingsApi()
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load services')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const loadOptions = async () => {
//     try {
//       const [cats, locs] = await Promise.all([getCategoriesApi(), getLocationsApi()])
//       setCategories(cats || [])
//       setLocations(locs || [])
//     } catch {
//       // non-blocking
//     }
//   }

//   useEffect(() => {
//     loadBase()
//     loadOptions()
//   }, [])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setFilters((f) => ({ ...f, [name]: value }))
//   }

//   const onClear = () => {
//     setFilters({ keyword: '', category: '', location: '', minPrice: '', maxPrice: '', sortBy: '' })
//     loadBase()
//   }

//   const onSearch = async (e) => {
//     e?.preventDefault?.()
//     setLoading(true)
//     setError('')
//     try {
//       const payload = {
//         keyword: filters.keyword || undefined,
//         category: filters.category || undefined,
//         location: filters.location || undefined,
//         minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
//         maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
//         sortBy: filters.sortBy || undefined,
//       }
//       const data = await advancedSearchApi(payload)
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to search')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onBook = (listing) => {
//     // FIXED ROUTE: Changed from /services/{id}/book to /customer/services/{id}/book
//     if (!isAuthed || role !== 'CUSTOMER') {
//       return navigate('/login', { replace: true })
//     }
//     navigate(`/customer/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
//             Find Services
//           </h1>
//           <p className="text-gray-600">Discover and book the perfect service for your needs</p>
//         </div>

//         <form onSubmit={onSearch} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">🔍 Search & Filter</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Keyword</label>
//               <input 
//                 name="keyword" 
//                 value={filters.keyword} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
//                 placeholder="Search by name or description" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//               <select 
//                 name="category" 
//                 value={filters.category} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <select 
//                 name="location" 
//                 value={filters.location} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//               >
//                 <option value="">All Locations</option>
//                 {locations.map((l) => (
//                   <option key={l} value={l}>{l}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price ($)</label>
//               <input 
//                 name="minPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.minPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price ($)</label>
//               <input 
//                 name="maxPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.maxPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//                 placeholder="1000.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
//               <select 
//                 name="sortBy" 
//                 value={filters.sortBy} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
//               >
//                 <option value="">Default</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="relevance">Relevance</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 justify-end pt-4">
//             <button 
//               type="button" 
//               onClick={onClear} 
//               className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
//             >
//               Clear Filters
//             </button>
//             <button 
//               type="submit" 
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
//             >
//               🔍 Search
//             </button>
//           </div>
//         </form>

//         <div>
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {hasAnyFilter ? '🎯 Search Results' : '📋 All Services'}
//             </h2>
//             {list.length > 0 && (
//               <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-medium">
//                 {list.length} {list.length === 1 ? 'service' : 'services'} found
//               </span>
//             )}
//           </div>
          
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading services...</p>
//             </div>
//           ) : error ? (
//             <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//               <span className="font-medium">{error}</span>
//             </div>
//           ) : list.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//               <div className="text-5xl mb-4">🔍</div>
//               <p className="text-gray-600 text-lg mb-2">No services found</p>
//               <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {list.map((l) => (
//                 <ListingCard
//                   key={l.id}
//                   listing={l}
//                   action={
//                     <button 
//                       className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all" 
//                       onClick={() => onBook(l)}
//                     >
//                       📅 Book Now
//                     </button>
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
//   getAllAvailableListingsApi,
//   advancedSearchApi,
//   getCategoriesApi,
//   getLocationsApi,
// } from '@/api/listings'
// import { useAuth } from '@/context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// export default function Services() {
//   const { role, isAuthed } = useAuth()
//   const navigate = useNavigate() 
//   const [list, setList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [categories, setCategories] = useState([])
//   const [locations, setLocations] = useState([])

//   const [filters, setFilters] = useState({
//     keyword: '',
//     category: '',
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     sortBy: '',
//   })

//   const hasAnyFilter = useMemo(() => {
//     return Object.values(filters).some((v) => String(v || '').trim() !== '')
//   }, [filters])

//   const loadBase = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getAllAvailableListingsApi()
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load services')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const loadOptions = async () => {
//     try {
//       const [cats, locs] = await Promise.all([getCategoriesApi(), getLocationsApi()])
//       setCategories(cats || [])
//       setLocations(locs || [])
//     } catch {
//       // non-blocking
//     }
//   }

//   useEffect(() => {
//     loadBase()
//     loadOptions()
//   }, [])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setFilters((f) => ({ ...f, [name]: value }))
//   }

//   const onClear = () => {
//     setFilters({ keyword: '', category: '', location: '', minPrice: '', maxPrice: '', sortBy: '' })
//     loadBase()
//   }

//   const onSearch = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const payload = {
//         keyword: filters.keyword || undefined,
//         category: filters.category || undefined,
//         location: filters.location || undefined,
//         minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
//         maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
//         sortBy: filters.sortBy || undefined,
//       }
//       const data = await advancedSearchApi(payload)
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to search')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onBook = (listing) => {
//     // Navigation handled by parent app
//     if (!isAuthed || role !== 'CUSTOMER') {
//       alert('Please login as a customer to book services')
//       return
//     }
//     console.log('Booking service:', listing)
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 overflow-auto pt-20">
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
//             Find Services
//           </h1>
//           <p className="text-gray-600">Discover and book the perfect service for your needs</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6"> Search & Filter</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Keyword</label>
//               <input 
//                 name="keyword" 
//                 value={filters.keyword} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//                 placeholder="Search by name or description" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//               <select 
//                 name="category" 
//                 value={filters.category} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <select 
//                 name="location" 
//                 value={filters.location} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//               >
//                 <option value="">All Locations</option>
//                 {locations.map((l) => (
//                   <option key={l} value={l}>{l}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price (₹)</label>
//               <input 
//                 name="minPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.minPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price (₹)</label>
//               <input 
//                 name="maxPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.maxPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//                 placeholder="1000.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
//               <select 
//                 name="sortBy" 
//                 value={filters.sortBy} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//               >
//                 <option value="">Default</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="relevance">Relevance</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 justify-end pt-4">
//             <button 
//               type="button" 
//               onClick={onClear} 
//               className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
//             >
//               Clear Filters
//             </button>
//             <button 
//               type="button"
//               onClick={onSearch} 
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all"
//             >
//                Search
//             </button>
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {hasAnyFilter ? ' Search Results' : '📋 All Services'}
//             </h2>
//             {list.length > 0 && (
//               <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full font-medium shadow-sm border border-gray-200">
//                 {list.length} {list.length === 1 ? 'service' : 'services'} found
//               </span>
//             )}
//           </div>
          
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading services...</p>
//             </div>
//           ) : error ? (
//             <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//               <span className="font-medium">{error}</span>
//             </div>
//           ) : list.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//               <div className="text-5xl mb-4"></div>
//               <p className="text-gray-600 text-lg mb-2">No services found</p>
//               <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {list.map((l) => (
//                 <div key={l.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
//                   <div className="flex items-start justify-between gap-6">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <h3 className="text-xl font-bold text-gray-800">
//                           {l.serviceName}
//                         </h3>
//                         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200">
//                           Available
//                         </span>
//                       </div>
                      
//                       {l.description && (
//                         <p className="text-gray-600 mb-3">{l.description}</p>
//                       )}
                      
//                       <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold"> Price:</span>
//                           <span className="text-lg font-bold text-purple-500">₹{l.price}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold"> Category:</span>
//                           <span className="text-purple-700 text-md font-medium">{l.category}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold"> Location:</span>
//                           <span>{l.location}</span>
//                         </div>
//                       </div>
                      
//                       {l.imageUrl && (
//                         <div className="mt-3">
//                           <img src={l.imageUrl} alt={l.serviceName} className="h-32 w-auto rounded-lg object-cover" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <button 
//                       className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all" 
//                       onClick={() => onBook(l)}
//                     >
//                       Book Now
//                     </button>
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


// import { useEffect, useMemo, useState } from 'react'
// import {
//   getAllAvailableListingsApi,
//   advancedSearchApi,
//   getCategoriesApi,
//   getLocationsApi,
// } from '@/api/listings'
// import { useAuth } from '@/context/AuthContext'
// import { useNavigate } from 'react-router-dom' // Add this import

// export default function Services() {
//   const { role, isAuthed } = useAuth()
//   const navigate = useNavigate() // Add this hook
//   const [list, setList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const [categories, setCategories] = useState([])
//   const [locations, setLocations] = useState([])

//   const [filters, setFilters] = useState({
//     keyword: '',
//     category: '',
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     sortBy: '',
//   })

//   const hasAnyFilter = useMemo(() => {
//     return Object.values(filters).some((v) => String(v || '').trim() !== '')
//   }, [filters])

//   const loadBase = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const data = await getAllAvailableListingsApi()
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to load services')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const loadOptions = async () => {
//     try {
//       const [cats, locs] = await Promise.all([getCategoriesApi(), getLocationsApi()])
//       setCategories(cats || [])
//       setLocations(locs || [])
//     } catch {
//       // non-blocking
//     }
//   }

//   useEffect(() => {
//     loadBase()
//     loadOptions()
//   }, [])

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setFilters((f) => ({ ...f, [name]: value }))
//   }

//   const onClear = () => {
//     setFilters({ keyword: '', category: '', location: '', minPrice: '', maxPrice: '', sortBy: '' })
//     loadBase()
//   }

//   const onSearch = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const payload = {
//         keyword: filters.keyword || undefined,
//         category: filters.category || undefined,
//         location: filters.location || undefined,
//         minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
//         maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
//         sortBy: filters.sortBy || undefined,
//       }
//       const data = await advancedSearchApi(payload)
//       setList(data || [])
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Failed to search')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onBook = (listing) => {
//     // Check if user is authenticated and has customer role
//     if (!isAuthed || role !== 'CUSTOMER') {
//       alert('Please login as a customer to book services')
//       navigate('/login', { replace: true }) // Navigate to login page
//       return
//     }
//     // Navigate to booking page with listing ID
//     navigate(`/customer/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 overflow-auto pt-20">
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
//             Find Services
//           </h1>
//           <p className="text-gray-600">Discover and book the perfect service for your needs</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6"> Search & Filter</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Keyword</label>
//               <input 
//                 name="keyword" 
//                 value={filters.keyword} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
//                 placeholder="Search by name or description" 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//               <select 
//                 name="category" 
//                 value={filters.category} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <select 
//                 name="location" 
//                 value={filters.location} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//               >
//                 <option value="">All Locations</option>
//                 {locations.map((l) => (
//                   <option key={l} value={l}>{l}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price (₹)</label>
//               <input 
//                 name="minPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.minPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price (₹)</label>
//               <input 
//                 name="maxPrice" 
//                 type="number" 
//                 step="0.01" 
//                 value={filters.maxPrice} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//                 placeholder="1000.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
//               <select 
//                 name="sortBy" 
//                 value={filters.sortBy} 
//                 onChange={onChange} 
//                 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
//               >
//                 <option value="">Default</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="relevance">Relevance</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 justify-end pt-4">
//             <button 
//               type="button" 
//               onClick={onClear} 
//               className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
//             >
//               Clear Filters
//             </button>
//             <button 
//               type="button"
//               onClick={onSearch} 
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all"
//             >
//                Search
//             </button>
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {hasAnyFilter ? ' Search Results' : '📋 All Services'}
//             </h2>
//             {list.length > 0 && (
//               <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full font-medium shadow-sm border border-gray-200">
//                 {list.length} {list.length === 1 ? 'service' : 'services'} found
//               </span>
//             )}
//           </div>
          
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading services...</p>
//             </div>
//           ) : error ? (
//             <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
//               <span className="font-medium">{error}</span>
//             </div>
//           ) : list.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
//               <div className="text-5xl mb-4"></div>
//               <p className="text-gray-600 text-lg mb-2">No services found</p>
//               <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {list.map((l) => (
//                 <div key={l.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
//                   <div className="flex items-start justify-between gap-6">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <h3 className="text-xl font-bold text-gray-800">
//                           {l.serviceName}
//                         </h3>
//                         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200">
//                           Available
//                         </span>
//                       </div>
                      
//                       {l.description && (
//                         <p className="text-gray-600 mb-3">{l.description}</p>
//                       )}
                      
//                       <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold"> Price:</span>
//                           <span className="text-lg font-bold text-purple-500">₹{l.price}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold"> Category:</span>
//                           <span className="text-purple-700 text-md font-medium">{l.category}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold"> Location:</span>
//                           <span>{l.location}</span>
//                         </div>
//                       </div>
                      
//                       {l.imageUrl && (
//                         <div className="mt-3">
//                           <img src={l.imageUrl} alt={l.serviceName} className="h-32 w-auto rounded-lg object-cover" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <button 
//                       className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all" 
//                       onClick={() => onBook(l)}
//                     >
//                       Book Now
//                     </button>
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


// src/pages/Services.jsx - Updated to show reviews

// import React, { useState, useEffect } from 'react';
// import { Search, MapPin, DollarSign, Star } from 'lucide-react';
// import listingsAPI from '../api/listings';
// import reviewAPI from '../api/reviews';
// import { toast } from 'react-toastify';
// import StarRating from '../components/StarRating';

// const Services = () => {
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [listingRatings, setListingRatings] = useState({});
//   const [loading, setLoading] = useState(true);

//   const categories = ['Electrical', 'Plumbing', 'Cleaning', 'Tutoring', 'Carpentry', 'Painting', 'Gardening', 'Others'];

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   useEffect(() => {
//     filterListings();
//   }, [searchTerm, selectedCategory, listings]);

//   const fetchListings = async () => {
//     try {
//       const data = await listingsAPI.getAll();
//       setListings(data);
//       setFilteredListings(data);

//       // Fetch ratings for all listings
//       const ratingPromises = data.map(async (listing) => {
//         try {
//           const rating = await reviewAPI.getListingRating(listing.id);
//           return { listingId: listing.id, rating };
//         } catch (error) {
//           return { listingId: listing.id, rating: { averageRating: 0, totalReviews: 0 } };
//         }
//       });

//       const ratings = await Promise.all(ratingPromises);
//       const ratingsMap = {};
//       ratings.forEach(({ listingId, rating }) => {
//         ratingsMap[listingId] = rating;
//       });
//       setListingRatings(ratingsMap);
//     } catch (error) {
//       toast.error('Failed to fetch services');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterListings = () => {
//     let filtered = listings;

//     if (searchTerm) {
//       filtered = filtered.filter(listing =>
//         listing.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         listing.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter(listing => listing.category === selectedCategory);
//     }

//     setFilteredListings(filtered);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-gray-500">Loading services...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Services</h1>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search for services..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-3">Categories</h3>
//         <div className="flex flex-wrap gap-3">
//           <button
//             onClick={() => setSelectedCategory('')}
//             className={`px-4 py-2 rounded-lg font-medium transition ${
//               selectedCategory === ''
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//             }`}
//           >
//             All
//           </button>
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-lg font-medium transition ${
//                 selectedCategory === category
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Services Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredListings.length === 0 ? (
//           <div className="col-span-3 text-center py-12">
//             <p className="text-gray-500">No services found</p>
//           </div>
//         ) : (
//           filteredListings.map((listing) => {
//             const rating = listingRatings[listing.id] || { averageRating: 0, totalReviews: 0 };
            
//             return (
//               <div key={listing.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
//                 {/* Image */}
//                 {listing.imageUrl && (
//                   <img
//                     src={listing.imageUrl}
//                     alt={listing.serviceName}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}

//                 {/* Content */}
//                 <div className="p-5">
//                   {/* Title */}
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {listing.serviceName}
//                   </h3>

//                   {/* Rating */}
//                   <div className="mb-3">
//                     <StarRating
//                       rating={rating.averageRating}
//                       totalReviews={rating.totalReviews}
//                       size={16}
//                     />
//                   </div>

//                   {/* Description */}
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                     {listing.description}
//                   </p>

//                   {/* Details */}
//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <MapPin size={14} />
//                       {listing.location}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <DollarSign size={14} className="text-green-600" />
//                       <span className="text-lg font-bold text-green-600">${listing.price}</span>
//                     </div>
//                     <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
//                       {listing.category}
//                     </div>
//                   </div>

//                   {/* Provider Info */}
//                   {listing.provider && (
//                     <p className="text-xs text-gray-500 mb-4">
//                       Provider: <span className="font-medium">{listing.provider.username}</span>
//                     </p>
//                   )}

//                   {/* Book Button */}
//                   <button
//                     onClick={() => {/* Handle booking */}}
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;


import { useEffect, useMemo, useState } from 'react'
import {
  getAllAvailableListingsApi,
  advancedSearchApi,
  getCategoriesApi,
  getLocationsApi,
} from '@/api/listings'
import reviewAPI from '@/api/reviews'  // Use the reviewAPI you provided
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import StarRating from '@/components/StarRating'

export default function Services() {
  const { role, isAuthed } = useAuth()
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  
  // Store ratings for each listing
  const [listingRatings, setListingRatings] = useState({})

  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
  })

  const hasAnyFilter = useMemo(() => {
    return Object.values(filters).some((v) => String(v || '').trim() !== '')
  }, [filters])

  // Fetch ratings for all listings
  const fetchAllRatings = async (listingsArray) => {
    const ratingPromises = listingsArray.map(async (listing) => {
      try {
        const rating = await reviewAPI.getListingRating(listing.id)
        return { listingId: listing.id, rating }
      } catch (error) {
        console.error(`Failed to fetch rating for listing ${listing.id}:`, error)
        return { listingId: listing.id, rating: { averageRating: 0, totalReviews: 0 } }
      }
    })

    const ratings = await Promise.all(ratingPromises)
    const ratingsMap = {}
    ratings.forEach(({ listingId, rating }) => {
      ratingsMap[listingId] = rating
    })
    setListingRatings(ratingsMap)
  }

  const loadBase = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllAvailableListingsApi()
      setList(data || [])
      
      // Fetch ratings for all listings
      if (data && data.length > 0) {
        await fetchAllRatings(data)
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const loadOptions = async () => {
    try {
      const [cats, locs] = await Promise.all([getCategoriesApi(), getLocationsApi()])
      setCategories(cats || [])
      setLocations(locs || [])
    } catch {
      // non-blocking
    }
  }

  useEffect(() => {
    loadBase()
    loadOptions()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setFilters((f) => ({ ...f, [name]: value }))
  }

  const onClear = () => {
    setFilters({ keyword: '', category: '', location: '', minPrice: '', maxPrice: '', sortBy: '' })
    loadBase()
  }

  const onSearch = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        keyword: filters.keyword || undefined,
        category: filters.category || undefined,
        location: filters.location || undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        sortBy: filters.sortBy || undefined,
      }
      const data = await advancedSearchApi(payload)
      setList(data || [])
      
      // Fetch ratings for search results
      if (data && data.length > 0) {
        await fetchAllRatings(data)
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to search')
    } finally {
      setLoading(false)
    }
  }

  // Add this function to sort by rating
  const getSortedListings = () => {
    let sortedListings = [...list];
    
    if (filters.sortBy === 'rating_desc') {
      sortedListings.sort((a, b) => {
        const ratingA = listingRatings[a.id]?.averageRating || 0;
        const ratingB = listingRatings[b.id]?.averageRating || 0;
        return ratingB - ratingA; // Descending order
      });
    } else if (filters.sortBy === 'price_asc') {
      sortedListings.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      sortedListings.sort((a, b) => b.price - a.price);
    }
    // Add other sort options if needed
    
    return sortedListings;
  }

  const onBook = (listing) => {
    if (!isAuthed || role !== 'CUSTOMER') {
      alert('Please login as a customer to book services')
      navigate('/login', { replace: true })
      return
    }
    navigate(`/customer/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
  }

  const sortedListings = getSortedListings();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 overflow-auto pt-20">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            Find Services
          </h1>
          <p className="text-gray-600">Discover and book the perfect service for your needs</p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6"> Search & Filter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Keyword</label>
              <input 
                name="keyword" 
                value={filters.keyword} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none" 
                placeholder="Search by name or description" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select 
                name="category" 
                value={filters.category} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <select 
                name="location" 
                value={filters.location} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
              >
                <option value="">All Locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price (₹)</label>
              <input 
                name="minPrice" 
                type="number" 
                step="0.01" 
                value={filters.minPrice} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price (₹)</label>
              <input 
                name="maxPrice" 
                type="number" 
                step="0.01" 
                value={filters.maxPrice} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                placeholder="1000.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
              >
                <option value="">Default</option>
                <option value="rating_desc">Rating: High to Low</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-3 justify-end pt-4">
            <button 
              type="button" 
              onClick={onClear} 
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Clear Filters
            </button>
            <button 
              type="button"
              onClick={onSearch} 
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all"
            >
              Search
            </button>
          </div>
        </div>

        {/* Services List Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              {hasAnyFilter ? ' Search Results' : '📋 All Services'}
            </h2>
            {sortedListings.length > 0 && (
              <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full font-medium shadow-sm border border-gray-200">
                {sortedListings.length} {sortedListings.length === 1 ? 'service' : 'services'} found
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
              <span className="font-medium">{error}</span>
            </div>
          ) : sortedListings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-5xl mb-4"></div>
              <p className="text-gray-600 text-lg mb-2">No services found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedListings.map((listing) => {
                const rating = listingRatings[listing.id] || { averageRating: 0, totalReviews: 0 };
                
                return (
                  <div key={listing.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-800">
                            {listing.serviceName}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200">
                            Available
                          </span>
                        </div>
                        
                        {/* Rating Display */}
                        <div className="mb-3">
                          <StarRating
                            rating={rating.averageRating}
                            totalReviews={rating.totalReviews}
                            size={16}
                          />
                        </div>
                        
                        {listing.description && (
                          <p className="text-gray-600 mb-3">{listing.description}</p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold"> Price:</span>
                            <span className="text-lg font-bold text-purple-500">₹{listing.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold"> Category:</span>
                            <span className="text-purple-700 text-md font-medium">{listing.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold"> Location:</span>
                            <span>{listing.location}</span>
                          </div>
                        </div>
                        
                        {listing.imageUrl && (
                          <div className="mt-3">
                            <img 
                              src={listing.imageUrl} 
                              alt={listing.serviceName} 
                              className="h-32 w-auto rounded-lg object-cover" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150x128?text=No+Image";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {rating.totalReviews > 0 ? (
                            <span>Based on {rating.totalReviews} {rating.totalReviews === 1 ? 'review' : 'reviews'}</span>
                          ) : (
                            <span>No reviews yet</span>
                          )}
                        </div>
                        <button 
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all" 
                          onClick={() => onBook(listing)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}