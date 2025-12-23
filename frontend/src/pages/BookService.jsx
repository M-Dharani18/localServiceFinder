import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { getAvailableSlotsByListingApi, getAvailableSlotsByProviderApi } from '@/api/timeslots'
import { createBookingApi } from '@/api/bookings'
import { useAuth } from '@/context/AuthContext'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from 'date-fns'

export default function BookService() {
  const { id } = useParams() // listingId
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth() // must be CUSTOMER per route guard
  const providerFromState = location?.state?.providerId

  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)

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
      let data = await getAvailableSlotsByListingApi(id)
      // Fallback: if no listing-specific slots, try provider-wide availability
      if ((!data || data.length === 0) && providerFromState) {
        const provData = await getAvailableSlotsByProviderApi(providerFromState)
        // If provider-wide slots exist, use them (optionally filter by listing if desired)
        data = provData || []
      }
      setSlots(data || [])
      // Initialize selected date to first available day if none chosen
      if (!selectedDate && data && data.length) {
        const first = data[0]
        const d = format(new Date(first.startTime), 'yyyy-MM-dd')
        setSelectedDate(d)
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id, providerFromState])
  // Real-time availability refresh
  useEffect(() => {
    const t = setInterval(() => {
      // refresh both sources and pick non-empty
      Promise.all([
        getAvailableSlotsByListingApi(id).catch(() => []),
        providerFromState ? getAvailableSlotsByProviderApi(providerFromState).catch(() => []) : Promise.resolve([]),
      ]).then(([byListing, byProvider]) => {
        const chosen = (byListing && byListing.length > 0) ? byListing : byProvider
        if (Array.isArray(chosen)) setSlots(chosen)
      }).catch(() => {})
    }, 20000)
    return () => clearInterval(t)
  }, [id, providerFromState])

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

  // Calendar grid for currentMonth
  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
    const days = []
    let day = start
    while (day <= end) {
      days.push(day)
      day = addDays(day, 1)
    }
    return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => days.slice(i * 7, i * 7 + 7))
  }, [currentMonth])

  const timesForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return (slots || []).filter((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === selectedDate)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
  }, [slots, selectedDate])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Book Service</h1>
            {slots.length > 0 && (
              <p className="text-sm text-gray-600">
                {slots[0].serviceName || `Listing #${slots[0].listingId}`} • {slots[0].providerName || `Provider #${slots[0].providerId}`}
              </p>
            )}
          </div>
          <Link className="text-blue-600" to="/services">Back to Services</Link>
        </div>
        <div className="bg-white border rounded shadow p-4 mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Share any details for the provider..." />
        </div>
        {/* Calendar */}
        <div className="bg-white border rounded shadow p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <button className="px-2 py-1 rounded border" onClick={() => setCurrentMonth(addDays(startOfMonth(currentMonth), -1))}>{'<'}</button>
            <div className="font-medium">{format(currentMonth, 'MMMM yyyy')}</div>
            <button className="px-2 py-1 rounded border" onClick={() => setCurrentMonth(addDays(endOfMonth(currentMonth), 1))}>{'>'}</button>
          </div>
          <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
            {['S','M','T','W','T','F','S'].map((d) => (<div key={d} className="text-center py-1">{d}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="contents">
                {week.map((d) => {
                  const ds = format(d, 'yyyy-MM-dd')
                  const isSelected = selectedDate && isSameDay(d, parseISO(`${selectedDate}T00:00:00`))
                  const availableOnDay = (slots || []).some((s) => format(new Date(s.startTime), 'yyyy-MM-dd') === ds)
                  return (
                    <button
                      key={ds}
                      onClick={() => setSelectedDate(ds)}
                      className={`aspect-square rounded flex items-center justify-center text-sm border ${isSelected ? 'bg-blue-600 text-white' : 'bg-white'} ${!isSameMonth(d, currentMonth) ? 'text-gray-400' : ''} ${availableOnDay ? 'border-blue-300' : 'border-gray-200'}`}
                    >
                      {format(d, 'd')}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : slots.length === 0 ? (
          <div className="text-gray-600">No available time slots. Please try later.</div>
        ) : (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Available times</h3>
              <div className="flex flex-wrap gap-2">
                {timesForSelectedDate.length === 0 ? (
                  <div className="text-gray-500 text-sm">No times for the selected day.</div>
                ) : (
                  timesForSelectedDate.map((s) => (
                    <button
                      key={s.id}
                      title={`Slot #${s.id}`}
                      className={`px-3 py-1 rounded border hover:bg-gray-50 ${selectedSlot?.id === s.id ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {format(new Date(s.startTime), 'hh:mm a')}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div>
              <button
                disabled={!selectedSlot}
                onClick={() => selectedSlot && onBook(selectedSlot)}
                className="w-full sm:w-auto px-4 py-2 rounded bg-black text-white disabled:opacity-50"
              >
                Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
