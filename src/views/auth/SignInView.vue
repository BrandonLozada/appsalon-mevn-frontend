<script setup>
    import { inject } from 'vue'
    import { useRouter } from 'vue-router'
    import AuthAPI from '@/api/AuthAPI'

    const toast = inject('toast')
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const { data: { token } } = await AuthAPI.signIn(formData)
            localStorage.setItem('AUTH_TOKEN', token)
            router.push({ name: 'my-appointments'})
            } catch (error) {
                toast.open({
                    message: error.response.data.message,
                    type: 'error'
                })
        }
    }

</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Inicia sesión</h1>
    <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

    <FormKit
        id="signInForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
        autocomplete="off"
    >

        <FormKit
            type="email"
            label="Correo"
            name="email"
            placeholder="Correo electrónico"
            validation="required|email"
            :validation-messages="{
                required: 'El correo electrónico es obligatorio',
                email: 'El correo electrónico no es válido'
            }"
        />

        <FormKit
            type="password"
            label="Contraseña"
            name="password"
            placeholder="Contraseña"
            validation="required"
            :validation-messages="{ required: 'La contraseña es obligatoria' }"
        />

        <FormKit
            type="submit"
        >
            Iniciar sesión
        </FormKit>
    </FormKit>
</template>



