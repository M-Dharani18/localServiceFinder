// import { useState } from 'react'
// import { Bell, Check, X, Settings, Filter, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react'

// export default function Notifications() {
//   const [activeFilter, setActiveFilter] = useState('all')
//   const [notifications, setNotifications] = useState([
//     { id: 1, type: 'booking', title: 'Booking Confirmed', description: 'Your plumbing service with John Plumbing has been confirmed for tomorrow at 10 AM', time: '10 minutes ago', read: false, important: true },
//     { id: 2, type: 'reminder', title: 'Service Reminder', description: 'Your AC maintenance is scheduled for next week. Please confirm your availability.', time: '2 hours ago', read: true, important: false },
//     { id: 3, type: 'promotion', title: 'Special Offer', description: 'Get 20% off on your next cleaning service. Limited time offer!', time: '1 day ago', read: true, important: false },
//     { id: 4, type: 'system', title: 'Profile Update Required', description: 'Please complete your profile to get better service recommendations', time: '2 days ago', read: false, important: true },
//     { id: 5, type: 'review', title: 'Rate Your Service', description: 'How was your recent electrical repair service? Share your feedback!', time: '3 days ago', read: true, important: false },
//     { id: 6, type: 'booking', title: 'New Booking Available', description: 'A new slot is available for your preferred house cleaning service', time: '1 week ago', read: true, important: false },
//   ])

//   const filters = [
//     { id: 'all', label: 'All', count: notifications.length },
//     { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
//     { id: 'important', label: 'Important', count: notifications.filter(n => n.important).length },
//     { id: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
//   ]

//   const markAsRead = (id) => {
//     setNotifications(prev => prev.map(notif => 
//       notif.id === id ? { ...notif, read: true } : notif
//     ))
//   }

//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
//   }

//   const deleteNotification = (id) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== id))
//   }

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'booking': return <CheckCircle className="w-5 h-5 text-green-600" />
//       case 'reminder': return <Clock className="w-5 h-5 text-blue-600" />
//       case 'promotion': return <Bell className="w-5 h-5 text-purple-600" />
//       case 'system': return <AlertCircle className="w-5 h-5 text-amber-600" />
//       case 'review': return <Info className="w-5 h-5 text-cyan-600" />
//       default: return <Bell className="w-5 h-5 text-gray-600" />
//     }
//   }

//   const filteredNotifications = notifications.filter(notif => {
//     if (activeFilter === 'all') return true
//     if (activeFilter === 'unread') return !notif.read
//     if (activeFilter === 'important') return notif.important
//     return notif.type === activeFilter
//   })

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
//             <p className="text-gray-600">Stay updated with your service activities</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={markAllAsRead}
//               className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
//             >
//               Mark all as read
//             </button>
//             <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
//               <Settings className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>

//         {/* Filter tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {filters.map(filter => (
//             <button
//               key={filter.id}
//               onClick={() => setActiveFilter(filter.id)}
//               className={`
//                 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
//                 ${activeFilter === filter.id 
//                   ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }
//               `}
//             >
//               {filter.label}
//               <span className={`
//                 text-xs px-2 py-0.5 rounded-full
//                 ${activeFilter === filter.id 
//                   ? 'bg-white/20' 
//                   : 'bg-gray-200 text-gray-700'
//                 }
//               `}>
//                 {filter.count}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Notifications list */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         {filteredNotifications.length === 0 ? (
//           <div className="p-12 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//               <Bell className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
//             <p className="text-gray-600">You're all caught up!</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-200">
//             {filteredNotifications.map(notification => (
//               <div 
//                 key={notification.id}
//                 className={`
//                   p-6 hover:bg-gray-50 transition-colors
//                   ${!notification.read ? 'bg-cyan-50/50' : ''}
//                 `}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 mt-1">
//                     {getNotificationIcon(notification.type)}
//                   </div>
                  
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-4">
//                       <div>
//                         <h3 className="font-bold text-gray-900 mb-1">{notification.title}</h3>
//                         <p className="text-gray-600">{notification.description}</p>
//                       </div>
//                       {notification.important && (
//                         <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
//                           Important
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center justify-between mt-4">
//                       <span className="text-sm text-gray-500">{notification.time}</span>
                      
//                       <div className="flex items-center gap-2">
//                         {!notification.read && (
//                           <button
//                             onClick={() => markAsRead(notification.id)}
//                             className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1"
//                           >
//                             <Check className="w-4 h-4" />
//                             Mark as read
//                           </button>
//                         )}
//                         <button
//                           onClick={() => deleteNotification(notification.id)}
//                           className="text-sm text-gray-500 hover:text-red-600 p-1"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Notification preferences */}
//       <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
//             <p className="text-gray-600">Choose what notifications you want to receive</p>
//           </div>
//           <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium">
//             Update Preferences
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             { label: 'Booking Updates', description: 'Get notified when bookings are confirmed, modified, or cancelled', enabled: true },
//             { label: 'Promotions & Offers', description: 'Receive special offers and discounts on services', enabled: true },
//             { label: 'Service Reminders', description: 'Reminders for upcoming service appointments', enabled: true },
//             { label: 'Provider Messages', description: 'Notifications when providers send you messages', enabled: false },
//             { label: 'Review Requests', description: 'Reminders to review completed services', enabled: true },
//             { label: 'Newsletter', description: 'Weekly newsletter with service recommendations', enabled: false },
//           ].map((pref, index) => (
//             <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200">
//               <div className="flex-shrink-0">
//                 <div className="relative inline-block w-10 h-6">
//                   <input
//                     type="checkbox"
//                     id={`pref-${index}`}
//                     defaultChecked={pref.enabled}
//                     className="sr-only"
//                   />
//                   <label
//                     htmlFor={`pref-${index}`}
//                     className={`
//                       block w-10 h-6 rounded-full cursor-pointer transition-colors
//                       ${pref.enabled ? 'bg-cyan-500' : 'bg-gray-300'}
//                     `}
//                   >
//                     <span className={`
//                       absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform
//                       ${pref.enabled ? 'transform translate-x-4' : ''}
//                     `} />
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor={`pref-${index}`} className="font-medium text-gray-900 cursor-pointer">
//                   {pref.label}
//                 </label>
//                 <p className="text-sm text-gray-600 mt-1">{pref.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }




import { useState } from 'react'
import { Bell, Check, X, Settings, Filter, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react'

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'booking', title: 'Booking Confirmed', description: 'Your plumbing service with John Plumbing has been confirmed for tomorrow at 10 AM', time: '10 minutes ago', read: false, important: true },
    { id: 2, type: 'reminder', title: 'Service Reminder', description: 'Your AC maintenance is scheduled for next week. Please confirm your availability.', time: '2 hours ago', read: true, important: false },
    { id: 3, type: 'promotion', title: 'Special Offer', description: 'Get 20% off on your next cleaning service. Limited time offer!', time: '1 day ago', read: true, important: false },
    { id: 4, type: 'system', title: 'Profile Update Required', description: 'Please complete your profile to get better service recommendations', time: '2 days ago', read: false, important: true },
    { id: 5, type: 'review', title: 'Rate Your Service', description: 'How was your recent electrical repair service? Share your feedback!', time: '3 days ago', read: true, important: false },
    { id: 6, type: 'booking', title: 'New Booking Available', description: 'A new slot is available for your preferred house cleaning service', time: '1 week ago', read: true, important: false },
  ])

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'important', label: 'Important', count: notifications.filter(n => n.important).length },
    { id: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
  ]

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'reminder': return <Clock className="w-5 h-5 text-purple-600" />
      case 'promotion': return <Bell className="w-5 h-5 text-fuchsia-600" />
      case 'system': return <AlertCircle className="w-5 h-5 text-amber-600" />
      case 'review': return <Info className="w-5 h-5 text-cyan-600" />
      default: return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return !notif.read
    if (activeFilter === 'important') return notif.important
    return notif.type === activeFilter
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Notifications</h1>
            <p className="text-gray-600">Stay updated with your service activities</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-lg border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors"
            >
              Mark all as read
            </button>
            <button className="p-2 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${activeFilter === filter.id 
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-400 hover:bg-gray-50'
                }
              `}
            >
              {filter.label}
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${activeFilter === filter.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 text-gray-700'
                }
              `}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-fuchsia-100 flex items-center justify-center">
              <Bell className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`
                  p-6 hover:bg-gray-50/50 transition-colors
                  ${!notification.read ? 'bg-gradient-to-r from-purple-50/50 to-fuchsia-50/50' : ''}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-gray-600">{notification.description}</p>
                      </div>
                      {notification.important && (
                        <span className="px-2 py-1 bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 rounded text-xs font-medium border border-rose-200">
                          Important
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{notification.time}</span>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-sm text-gray-500 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification preferences */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
            <p className="text-gray-600">Choose what notifications you want to receive</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold hover:shadow-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all duration-200">
            Update Preferences
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Booking Updates', description: 'Get notified when bookings are confirmed, modified, or cancelled', enabled: true },
            { label: 'Promotions & Offers', description: 'Receive special offers and discounts on services', enabled: true },
            { label: 'Service Reminders', description: 'Reminders for upcoming service appointments', enabled: true },
            { label: 'Provider Messages', description: 'Notifications when providers send you messages', enabled: false },
            { label: 'Review Requests', description: 'Reminders to review completed services', enabled: true },
            { label: 'Newsletter', description: 'Weekly newsletter with service recommendations', enabled: false },
          ].map((pref, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
              <div className="flex-shrink-0">
                <div className="relative inline-block w-10 h-6">
                  <input
                    type="checkbox"
                    id={`pref-${index}`}
                    defaultChecked={pref.enabled}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`pref-${index}`}
                    className={`
                      block w-10 h-6 rounded-full cursor-pointer transition-colors
                      ${pref.enabled ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500' : 'bg-gray-300'}
                    `}
                  >
                    <span className={`
                      absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow
                      ${pref.enabled ? 'transform translate-x-4' : ''}
                    `} />
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor={`pref-${index}`} className="font-medium text-gray-900 cursor-pointer">
                  {pref.label}
                </label>
                <p className="text-sm text-gray-600 mt-1">{pref.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}