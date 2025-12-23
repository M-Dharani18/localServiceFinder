export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded
  } catch (e) {
    return null
  }
}

export function getRoleFromToken(token) {
  const payload = decodeJwt(token)
  // Adjust claim keys as per backend (e.g., 'role', 'authorities', 'scope')
  if (!payload) return null
  if (payload.role) return payload.role
  if (Array.isArray(payload.authorities) && payload.authorities.length > 0) {
    return payload.authorities[0]
  }
  if (typeof payload.scope === 'string') {
    const parts = payload.scope.split(' ')
    return parts[0]
  }
  return null
}
