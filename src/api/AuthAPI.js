//import { useRouter } from 'vue-router'
import api from '@/lib/axios'

// const router = useRouter()

export default {
    register(data) {
        return api.post('auth/register', data)
    },
    verifyAccount(token) {
        return api.get(`auth/verify/${token}`)
    },
    signIn(data) {
        return api.post('auth/sign-in', data)
    },
    auth() {
        const token = localStorage.getItem('AUTH_TOKEN')
        return api.get('auth/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        /*
        // To avoid API Rest request response errors in console.
        if(token) {
            return api.get('auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } {
            router.push({ name: 'sign-in' })
        }
        */
    }
}