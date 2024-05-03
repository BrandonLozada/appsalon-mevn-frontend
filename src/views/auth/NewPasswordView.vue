<script setup>
    import { onMounted, inject, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { FormKit, reset } from '@formkit/vue'
    import AuthAPI from '@/api/AuthAPI.js'

    const toast = inject('toast')
    const route = useRoute()
    const router = useRouter()
    const { token } = route.params
    const validToken = ref(false)

    onMounted( async () => {
        try {
            const { data } = await AuthAPI.verifyPasswordResetToken(token)
            validToken.value = true
        } catch (error) {
            toast.open({
                message: error.response.data.message,
                type: 'error'
            })
        }
    })

    const handleSubmit = async ({ password }) => {
        try {
            const { data } = await AuthAPI.updatePassword(token, { password })
            toast.open({
                message: data.message,
                type: 'success'
            })
            reset('newPasswordForm')
            setTimeout(() => {
                router.push({name: 'sign-in'})
            }, 3000)
        } catch (error) {
            toast.open({
                message: error.response.data.message,
                type: 'success'
            })
        }
    }
</script>


<template>
    <div v-if="validToken">
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nueva contraseña</h1>
        <p class="text-2xl text-white text-center my-5">Coloca tu nueva contraseña</p>

        <FormKit
            id="newPasswordForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
            autocomplete="off"
        >
            <FormKit
                type="password"
                label="Contraseña"
                name="password"
                placeholder="Ingresa tu contraseña"
                help="Mínimo de 8 caracteres de tamaño"
                validation="required|length:8"
                :validation-messages="{
                  required: 'La contraseña es obligatoria',
                  length: 'La contraseña debe contener al menos 8 caraceters de tamaño'
                }"
            />

            <FormKit
                type="password"
                label="Confirma contraseña"
                name="password_confirm"
                placeholder="Vuelve a ingresar tu contraseña"
                help="Confirma tu contraseña"
                validation="required|confirm"
                :validation-messages="{
                    required: 'La contraseña es obligatoria',
                    confirm: 'Las contraseñas no coinciden'
                }"
            />

            <FormKit type="submit">Guardar contraseña</FormKit>
        </FormKit>
    </div>

    <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>

</template>