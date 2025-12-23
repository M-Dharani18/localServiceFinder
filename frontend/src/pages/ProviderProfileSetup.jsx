import { useState } from 'react'
import api from '@/api/axios'

// This page is shown to providers after first login to complete their profile
// Adjust fields to match your backend payload for provider profile and categories
export default function ProviderProfileSetup() {
  const [form, setForm] = useState({
    businessName: '',
    phone: '',
    city: '',
    area: '',
    categories: [], // e.g., ['PLUMBING', 'TUTORING']
    description: '',
  })
  const [categories] = useState([
    'PLUMBING',
    'TUTORING',
    'CLEANING',
    'ELECTRICAL',
    'CARPENTRY',
  ])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onToggleCategory = (value) => {
    setForm((f) => {
      const exists = f.categories.includes(value)
      return {
        ...f,
        categories: exists ? f.categories.filter((c) => c !== value) : [...f.categories, value],
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)
    try {
      // Adjust endpoint & payload to your backend
      await api.post('/provider/profile', form)
      setMessage('Profile saved successfully')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Provider Profile Setup</h1>
        {message && <div className="mb-4 p-2 rounded border border-green-200 bg-green-50 text-green-700">{message}</div>}
        {error && <div className="mb-4 p-2 rounded border border-red-200 bg-red-50 text-red-700">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded border shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input name="businessName" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.businessName} onChange={onChange} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="phone" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.phone} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input name="city" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.city} onChange={onChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Area</label>
              <input name="area" className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.area} onChange={onChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <label key={c} className="inline-flex items-center gap-2 px-3 py-2 rounded border bg-gray-50">
                  <input type="checkbox" checked={form.categories.includes(c)} onChange={() => onToggleCategory(c)} />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">About your service</label>
            <textarea name="description" rows={4} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={form.description} onChange={onChange} />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
