// ProviderLayout.jsx
import { Outlet } from 'react-router-dom'
import ProviderNav from './ProviderNav'

export default function ProviderLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProviderNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}