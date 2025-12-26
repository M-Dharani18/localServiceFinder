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



import { useEffect, useMemo, useState } from 'react'
import {
  getAllAvailableListingsApi,
  searchListingsApi,
  filterByCategoryApi,
  filterByLocationApi,
  advancedSearchApi,
  getCategoriesApi,
  getLocationsApi,
} from '@/api/listings'
import ListingCard from '@/components/ListingCard'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Services() {
  const { role, isAuthed } = useAuth()
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])

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

  const loadBase = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllAvailableListingsApi()
      setList(data || [])
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

  const onSearch = async (e) => {
    e?.preventDefault?.()
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
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to search')
    } finally {
      setLoading(false)
    }
  }

  const onBook = (listing) => {
    if (!isAuthed || role !== 'CUSTOMER') {
      return navigate('/login', { replace: true })
    }
    navigate(`/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Find Services
          </h1>
          <p className="text-gray-600">Discover and book the perfect service for your needs</p>
        </div>

        <form onSubmit={onSearch} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">🔍 Search & Filter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Keyword</label>
              <input 
                name="keyword" 
                value={filters.keyword} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none" 
                placeholder="Search by name or description" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select 
                name="category" 
                value={filters.category} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
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
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price ($)</label>
              <input 
                name="minPrice" 
                type="number" 
                step="0.01" 
                value={filters.minPrice} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price ($)</label>
              <input 
                name="maxPrice" 
                type="number" 
                step="0.01" 
                value={filters.maxPrice} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="1000.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={onChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              >
                <option value="">Default</option>
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
              type="submit" 
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              🔍 Search
            </button>
          </div>
        </form>

        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              {hasAnyFilter ? '🎯 Search Results' : '📋 All Services'}
            </h2>
            {list.length > 0 && (
              <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-medium">
                {list.length} {list.length === 1 ? 'service' : 'services'} found
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700">
              <span className="font-medium">{error}</span>
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-600 text-lg mb-2">No services found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  action={
                    <button 
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all" 
                      onClick={() => onBook(l)}
                    >
                      📅 Book Now
                    </button>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}