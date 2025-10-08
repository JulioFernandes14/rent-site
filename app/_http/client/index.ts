import ky from 'ky'
import { router } from 'expo-router'
import { useAuthStore } from '../../auth/auth'

export const api = ky.create({
  prefixUrl: 'http://192.168.0.11:3000',
  timeout: false,
  hooks: {
    beforeRequest: [
      (request) => {
        if (request.url.includes('/auth/login')) {
          return
        }

        const { user } = useAuthStore.getState()

        if (user?.access_token) {
          request.headers.set('Authorization', `Bearer ${user.access_token}`)
        }
      },
    ],
    afterResponse: [
      (request, _, response) => {
        if (
          response.status === 401 &&
          !request.url.includes('/auth/login')
        ) {
          const { logout } = useAuthStore.getState()
          logout()
          router.replace('/')
          return
        }
        return response
      },
    ],
  },
})
