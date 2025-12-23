import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getProviderListingsApi } from '@/api/listings'
import {
  createTimeSlotApi,
  getProviderTimeSlotsApi,
  markSlotAvailableApi,
  markSlotUnavailableApi,
  deleteTimeSlotApi,
} from '@/api/timeslots'
import { format } from 'date-fns'

export default function ProviderTimeSlots() {
  const { user } = useAuth()
  const providerId = user?.id

  const [listings, setListings] = useState([])
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({ listingId: '', date: '', start: '', end: '' })
  const [creating, setCreating] = useState(false)

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const [provListings, provSlots] = await Promise.all([
        getProviderListingsApi(providerId),
        getProviderTimeSlotsApi(providerId),
      ])
      setListings(provListings || [])
      setSlots(provSlots || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load time slots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [providerId])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onCreate = async (e) => {
    e.preventDefault()
    if (!form.listingId || !form.date || !form.start || !form.end) return
    setCreating(true)
    try {
      const startIso = new Date(`${form.date}T${form.start}:00`).toISOString()
      const endIso = new Date(`${form.date}T${form.end}:00`).toISOString()
      await createTimeSlotApi({
        providerId,
        listingId: Number(form.listingId),
        startTime: startIso,
        endTime: endIso,
      })
      setForm({ listingId: '', date: '', start: '', end: '' })
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || e?.response?.data?.error || 'Failed to create slot')
    } finally {
      setCreating(false)
    }
  }

  const toggleAvail = async (slot) => {
    try {
      if (slot.isAvailable) await markSlotUnavailableApi(slot.id)
      else await markSlotAvailableApi(slot.id)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to update slot')
    }
  }

  const onDelete = async (slot) => {
    if (!confirm('Delete this time slot?')) return
    try {
      await deleteTimeSlotApi(slot.id)
      await load()
    } catch (e) {
      alert(e?.response?.data || 'Failed to delete slot')
    }
  }

  const listingsById = useMemo(() => Object.fromEntries((listings || []).map(l => [l.id, l])), [listings])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Availability</h1>

        {/* Create slot */}
        <form onSubmit={onCreate} className="bg-white border rounded shadow p-4 mb-6 grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Listing</label>
              <select name="listingId" value={form.listingId} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select</option>
                {listings.map(l => (
                  <option key={l.id} value={l.id}>{l.serviceName || `Listing #${l.id}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" name="date" value={form.date} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start</label>
              <input type="time" name="start" value={form.start} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End</label>
              <input type="time" name="end" value={form.end} onChange={onChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={creating} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">{creating ? 'Creating...' : 'Create Slot'}</button>
          </div>
        </form>

        {/* List slots */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : slots.length === 0 ? (
          <div className="text-gray-600">No time slots yet. Create your first availability above.</div>
        ) : (
          <div className="space-y-3">
            {slots
              .slice()
              .sort((a,b) => new Date(a.startTime) - new Date(b.startTime))
              .map((s) => (
              <div key={s.id} className="bg-white border rounded p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{listingsById[s.listingId]?.serviceName || s.serviceName || `Listing #${s.listingId}`}</div>
                  <div className="text-sm text-gray-700">{format(new Date(s.startTime), 'EEE, dd MMM yyyy - hh:mm a')} to {format(new Date(s.endTime), 'hh:mm a')}</div>
                  <div className="text-xs text-gray-600">Slot #{s.id}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded border bg-gray-50 text-sm`}>{s.isAvailable ? 'Available' : 'Unavailable'}</span>
                  <button className="px-3 py-1 rounded border" onClick={() => toggleAvail(s)}>{s.isAvailable ? 'Mark Unavailable' : 'Mark Available'}</button>
                  <button className="px-3 py-1 rounded border text-red-600" onClick={() => onDelete(s)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
