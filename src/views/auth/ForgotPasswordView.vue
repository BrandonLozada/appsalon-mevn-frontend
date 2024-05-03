<script setup>
    import { inject } from 'vue';
    import { FormKit, reset } from '@formkit/vue'
    import AuthAPI from '@/api/AuthAPI'

    const toast = inject('toast')

    const handleSubmit = async ({ email }) => {
        try {
            const { data } = await AuthAPI.forgotPassword({ email })
            toast.open({
                message: data.message,
                type: 'success'
            })
            reset('forgotPasswordForm')
        } catch (error) {
            toast.open({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvidé mi contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Recurepa el acceso a tu cuenta</p>

    <FormKit
        id="forgotPasswordForm"
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

        <FormKit type="submit">Enviar</FormKit>
    </FormKit>

</template>