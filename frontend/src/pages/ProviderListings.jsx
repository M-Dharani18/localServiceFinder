import { useEffect, useMemo, useState } from 'react'
import {
  createListingApi,
  updateListingApi,
  deleteListingApi,
  toggleAvailabilityApi,
  getProviderListingsApi,
} from '@/api/listings'
import { useAuth } from '@/context/AuthContext'
import ListingCard from '@/components/ListingCard'

const emptyForm = {
  serviceName: '',
  description: '',
  price: '',
  location: '',
  category: '',
  imageUrl: '',
  isAvailable: true,
}

export default function ProviderListings() {
  const { user } = useAuth()
  const providerId = user?.id
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const canSubmit = useMemo(() => form.serviceName && form.price && form.location && form.category, [form])

  const load = async () => {
    if (!providerId) return
    setLoading(true)
    setError('')
    try {
      const data = await getProviderListingsApi(providerId)
      setListings(data || [])
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!providerId) return
    setSaving(true)
    setError('')
    try {
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : 0,
        isAvailable: form.isAvailable ?? true,
      }
      if (editingId) {
        await updateListingApi(editingId, payload)
      } else {
        await createListingApi(providerId, payload)
      }
      setForm(emptyForm)
      setEditingId(null)
      await load()
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to save listing')
    } finally {
      setSaving(false)
    }
  }

  const onEdit = (l) => {
    setEditingId(l.id)
    setForm({
      serviceName: l.serviceName || '',
      description: l.description || '',
      price: l.price ?? '',
      location: l.location || '',
      category: l.category || '',
      imageUrl: l.imageUrl || '',
      isAvailable: !!l.isAvailable,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this listing?')) return
    try {
      await deleteListingApi(id)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed')
    }
  }

  const onToggle = async (l) => {
    try {
      await toggleAvailabilityApi(l.id, !l.isAvailable)
      await load()
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to toggle availability')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Service Listings</h1>

        {/* Create / Edit form */}
        <form onSubmit={onSubmit} className="bg-white border rounded shadow p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Name</label>
              <input name="serviceName" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.serviceName} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input name="category" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.category} onChange={onChange} placeholder="e.g., PLUMBING" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input name="location" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.location} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input name="price" type="number" step="0.01" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.price} onChange={onChange} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.description} onChange={onChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
            <input name="imageUrl" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.imageUrl} onChange={onChange} />
          </div>
          <div className="flex justify-end gap-2">
            {editingId && (
              <button type="button" className="px-4 py-2 rounded border" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel</button>
            )}
            <button type="submit" disabled={!canSubmit || saving} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
              {saving ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Listing' : 'Create Listing')}
            </button>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Your Listings</h2>
          {loading ? (
            <div>Loading...</div>
          ) : listings.length === 0 ? (
            <div className="text-gray-600">No listings yet.</div>
          ) : (
            <div className="space-y-3">
              {listings.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  action={
                    <button onClick={() => onToggle(l)} className="px-3 py-1 rounded border">
                      {l.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                  }
                  secondaryAction={
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(l)} className="px-3 py-1 rounded border">Edit</button>
                      <button onClick={() => onDelete(l.id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
                    </div>
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
