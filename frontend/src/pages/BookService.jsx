import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getAvailableSlotsByListingApi } from '@/api/timeslots'
import { createBookingApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

export default function BookService() {
  const { id } = useParams() // listingId
  const navigate = useNavigate()
  const { user } = useAuth() // must be CUSTOMER per route guard

  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')

  const grouped = useMemo(() => {
    const map = new Map()
    for (const s of slots) {
      const day = format(new Date(s.startTime), 'yyyy-MM-dd')
      if (!map.has(day)) map.set(day, [])
      map.get(day).push(s)
    }
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1))
  }, [slots])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAvailableSlotsByListingApi(id)
      setSlots(data || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  const onBook = async (slot) => {
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
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Book Service</h1>
          <Link className="text-blue-600" to="/services">Back to Services</Link>
        </div>
        <div className="bg-white border rounded shadow p-4 mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Share any details for the provider..." />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : slots.length === 0 ? (
          <div className="text-gray-600">No available time slots. Please try later.</div>
        ) : (
          <div className="space-y-5">
            {grouped.map(([day, items]) => (
              <div key={day}>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{format(new Date(day), 'EEE, dd MMM yyyy')}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.sort((a,b) => new Date(a.startTime) - new Date(b.startTime)).map((s) => (
                    <button key={s.id} className="px-3 py-1 rounded border hover:bg-gray-50" onClick={() => onBook(s)}>
                      {format(new Date(s.startTime), 'hh:mm a')} - {format(new Date(s.endTime), 'hh:mm a')}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
