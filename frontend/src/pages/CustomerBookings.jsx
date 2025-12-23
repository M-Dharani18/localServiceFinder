import { useEffect, useState } from 'react'
import { getCustomerBookingsApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

export default function CustomerBookings() {
  const { user } = useAuth()
  const customerId = user?.id
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-600">No bookings yet.</div>
        ) : (
          <div className="space-y-3">
            {items.map((b) => (
              <div key={b.id} className="bg-white border rounded p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{b.serviceName || `Listing #${b.listingId}`}</div>
                  <div className="text-sm text-gray-600">{b.providerName || `Provider #${b.providerId}`}</div>
                  <div className="text-sm text-gray-700">{format(new Date(b.bookingDateTime), 'EEE, dd MMM yyyy - hh:mm a')}</div>
                </div>
                <div className="text-sm">
                  <span className="px-2 py-1 rounded border bg-gray-50">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
