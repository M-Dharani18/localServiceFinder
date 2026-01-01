import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Edit2 } from 'lucide-react'

export default function CustomerProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main St, New York, NY 10001',
    bio: user?.bio || 'I love finding reliable local services for my home maintenance needs.',
    preferences: user?.preferences || {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would update the user profile in your backend
    console.log('Updated profile:', formData)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {formData.name?.charAt(0) || 'C'}
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-1/2 transform translate-x-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Camera className="w-5 h-5 text-gray-700" />
                </button>
              )}
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
              <p className="text-gray-600">{formData.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="truncate">{formData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Jan 2024'}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Account Status</div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Verified</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Preferences */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h4>
                  <div className="space-y-4">
                    {[
                      { id: 'notifications', label: 'Push Notifications', description: 'Receive notifications about bookings and updates' },
                      { id: 'emailUpdates', label: 'Email Updates', description: 'Get weekly service recommendations and updates' },
                      { id: 'smsAlerts', label: 'SMS Alerts', description: 'Receive text alerts for booking confirmations' }
                    ].map((pref) => (
                      <div key={pref.id} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={pref.id}
                          name={pref.id}
                          checked={formData.preferences[pref.id]}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="mt-1 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                        />
                        <div>
                          <label htmlFor={pref.id} className="font-medium text-gray-900">
                            {pref.label}
                          </label>
                          <p className="text-sm text-gray-600">{pref.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:opacity-90 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        Save Changes
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Security</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="text-left">
                  <div className="font-medium text-gray-900">Change Password</div>
                  <div className="text-sm text-gray-600">Update your password regularly</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="text-left">
                  <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-600">Add an extra layer of security</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 text-red-600">
                <div className="text-left">
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm">Permanently remove your account</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}