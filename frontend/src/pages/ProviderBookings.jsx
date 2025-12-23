import { useEffect, useState } from 'react'
import { getProviderBookingsApi, confirmBookingApi, completeBookingApi, cancelBookingApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

export default function ProviderBookings() {
  const { user } = useAuth()
  const providerId = user?.id
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const data = await getProviderBookingsApi(providerId)
      setItems(data || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [providerId])

  const act = async (fn, id) => {
    try {
      await fn(id)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Action failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Incoming Bookings</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-600">No bookings yet.</div>
        ) : (
          <div className="space-y-3">
            {items.map((b) => (
              <div key={b.id} className="bg-white border rounded p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{b.serviceName || `Listing #${b.listingId}`}</div>
                    <div className="text-sm text-gray-600">
                      {b.customerName || `Customer #${b.customerId}`}
                      {b.customerEmail ? ` • ${b.customerEmail}` : ''}
                    </div>
                    <div className="text-sm text-gray-700">{format(new Date(b.bookingDateTime), 'EEE, dd MMM yyyy - hh:mm a')}</div>
                    {b.notes && (
                      <div className="text-sm text-gray-700 mt-1">Notes: {b.notes}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      #{b.id} • Created {b.createdAt ? format(new Date(b.createdAt), 'dd MMM yyyy, hh:mm a') : '—'}
                      {b.updatedAt && ` • Updated ${format(new Date(b.updatedAt), 'dd MMM yyyy, hh:mm a')}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded border bg-gray-50 text-sm">{b.status}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  {b.status === 'PENDING' && (
                    <>
                      <button className="px-3 py-1 rounded border" onClick={() => act(confirmBookingApi, b.id)}>Accept</button>
                      <button className="px-3 py-1 rounded border text-red-600" onClick={() => act(cancelBookingApi, b.id)}>Cancel</button>
                    </>
                  )}
                  {b.status === 'CONFIRMED' && (
                    <button className="px-3 py-1 rounded border" onClick={() => act(completeBookingApi, b.id)}>Mark Completed</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
