import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '@/api/AuthAPI'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
        } catch (error) {
            console.log(error)
        }
    })

    function signOut(){
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({ name: 'sign-in' })
    }

    /*
    // You can use the const async function sintaxis.
    const signOut = async () => {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({ name: 'sign-in' })
    }
    */

    const getUserName = computed(() => user.value?.name ? user.value?.name : '')

    return {
        user,
        signOut,
        getUserName
    }
})