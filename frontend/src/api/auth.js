import api from './axios'

export const loginApi = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const registerApi = async (payload) => {
  // payload should include: name, email, password, role, and any other backend-required fields
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const meApi = async () => {
  const { data } = await api.get('/auth/me')
  return data
}
