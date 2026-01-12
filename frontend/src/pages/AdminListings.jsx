import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Flag, 
  Clock,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AdminListings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'PENDING')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchListings()
  }, [statusFilter, currentPage])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/listings?status=${statusFilter}&page=${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setListings(data.listings || data)
        // If your backend supports pagination
        if (data.totalPages) setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (status) => {
    setStatusFilter(status)
    setCurrentPage(1)
    setSearchParams({ status })
  }

  const handleApprove = async (listingId) => {
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
        fetchListings()
      }
    } catch (error) {
      console.error('Failed to approve listing:', error)
      alert('Failed to approve listing')
    }
  }

  const handleReject = async (listingId) => {
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
        fetchListings()
      }
    } catch (error) {
      console.error('Failed to reject listing:', error)
      alert('Failed to reject listing')
    }
  }

  const handleFlag = async (listingId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const response = await fetch('/api/admin/listings/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listingId,
          adminId: user.id,
          adminNotes: 'Flagged for review'
        })
      })
      if (response.ok) {
        fetchListings()
      }
    } catch (error) {
      console.error('Failed to flag listing:', error)
      alert('Failed to flag listing')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-emerald-100 text-emerald-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      case 'FLAGGED': return 'bg-amber-100 text-amber-800'
      case 'PENDING': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="w-4 h-4" />
      case 'REJECTED': return <XCircle className="w-4 h-4" />
      case 'FLAGGED': return <Flag className="w-4 h-4" />
      case 'PENDING': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  const filteredListings = listings.filter(listing => 
    listing.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.provider?.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
          <p className="text-gray-600 mt-1">Approve, reject, or flag service listings</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter by status:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings by name, category, or provider..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-3 text-gray-600">Loading listings...</span>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center p-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try a different search term' : `No ${statusFilter.toLowerCase()} listings available`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{listing.serviceName}</div>
                        <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                          {listing.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{listing.provider?.username}</div>
                      <div className="text-sm text-gray-500">{listing.provider?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {listing.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-semibold text-gray-900">Rs. {listing.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {getStatusIcon(listing.status)}
                        {listing.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {listing.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(listing.id)}
                              className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(listing.id)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleFlag(listing.id)}
                              className="px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
                            >
                              Flag
                            </button>
                          </>
                        )}
                        {listing.status === 'FLAGGED' && (
                          <>
                            <button
                              onClick={() => handleApprove(listing.id)}
                              className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(listing.id)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <Link
                          to={`/customer/services/${listing.id}`}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          target="_blank"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}