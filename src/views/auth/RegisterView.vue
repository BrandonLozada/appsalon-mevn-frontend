<script setup>
    import { inject } from 'vue'
    import { reset } from '@formkit/vue'
    import AuthAPI from '@/api/AuthAPI'

    const toast = inject('toast')

    const handleSubmit = async ({ password_confirm, ...formData }) => {
        try {
            const { data } = await AuthAPI.register(formData)
            toast.open({
                message: data.message,
                type: 'success'
            })
            reset('registerForm')
        } catch (error) {
            toast.open({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
        autocomplete="off"
    >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu nombre"
            validation="required|length:3"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />

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

        <FormKit
            type="submit"
        >
            Crear cuenta
        </FormKit>
    </FormKit>
</template>

