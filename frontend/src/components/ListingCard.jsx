export default function ListingCard({ listing, action, secondaryAction }) {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-4 flex gap-4">
      {listing.imageUrl && (
        <img src={listing.imageUrl} alt={listing.serviceName} className="w-24 h-24 object-cover rounded" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold truncate">{listing.serviceName}</h3>
            <p className="text-sm text-gray-600 truncate">{listing.description}</p>
            {listing.providerName && (
              <p className="text-xs text-gray-500 mt-1">By {listing.providerName}</p>
            )}
          </div>
          {typeof listing.price !== 'undefined' && (
            <div className="text-right">
              <div className="text-base font-medium">₹{Number(listing.price).toFixed(2)}</div>
              {listing.isAvailable !== undefined && (
                <div className={`text-xs ${listing.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {listing.isAvailable ? 'Available' : 'Unavailable'}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <span className="mr-2">{listing.category}</span>
          <span>• {listing.location}</span>
          {typeof listing.distance !== 'undefined' && listing.distance !== null && (
            <span className="ml-2 text-gray-500">• {Number(listing.distance).toFixed(1)} km</span>
          )}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {listing.providerId ? <span className="mr-2">Provider ID: {listing.providerId}</span> : null}
          {typeof listing.latitude === 'number' && typeof listing.longitude === 'number' && (
            <span>Coords: {listing.latitude.toFixed(4)}, {listing.longitude.toFixed(4)}</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {action}
          {secondaryAction}
        </div>
      </div>
    </div>
  )
}
