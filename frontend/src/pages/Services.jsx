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
    sortBy: '', // 'price_asc' | 'price_desc' | 'distance' | 'relevance'
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
      // Prefer advanced search when multiple filters present
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
    // Milestone 3 will implement booking flow
    if (!isAuthed || role !== 'CUSTOMER') {
      return navigate('/login', { replace: true })
    }
    navigate(`/services/${listing.id}/book`, { state: { providerId: listing.providerId } })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Find Services</h1>

        <form onSubmit={onSearch} className="bg-white border rounded shadow p-4 grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Keyword</label>
              <input name="keyword" value={filters.keyword} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search by name or description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" value={filters.category} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select name="location" value={filters.location} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Price</label>
              <input name="minPrice" type="number" step="0.01" value={filters.minPrice} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Price</label>
              <input name="maxPrice" type="number" step="0.01" value={filters.maxPrice} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sort By</label>
              <select name="sortBy" value={filters.sortBy} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button type="button" onClick={onClear} className="px-4 py-2 rounded border">Clear</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Search</button>
          </div>
        </form>

        <div className="mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : list.length === 0 ? (
            <div className="text-gray-600">No services found.</div>
          ) : (
            <div className="space-y-3">
              {list.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  action={
                    <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => onBook(l)}>
                      Book
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
