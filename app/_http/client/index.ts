import ky from 'ky'
import { router } from 'expo-router'
import { useAuthStore } from '../../auth/auth'

export const api = ky.create({
  prefixUrl: 'http://192.168.1.22:3000',
  timeout: false,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.url.includes('/auth/login')) {
          return
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))

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
