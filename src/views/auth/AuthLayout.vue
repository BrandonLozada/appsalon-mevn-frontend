<script setup>
    import { useRoute, RouterLink, RouterView } from 'vue-router'
    const route = useRoute()
    const authRoutes = [
        { name: 'register', text: 'Crear una cuenta'},
        { name: 'sign-in', text: 'Iniciar sesión'},
        { name: 'forgot-password', text: 'Olvidé mi contraseña'}
    ]
</script>

<template>
    <div class="mx-auto lg:w-3/5 mt-20">
        <RouterView />

        <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink
                v-for="authRoute in authRoutes"
                class="font-bold text-white"
                :to="{ name: authRoute.name }"
                :class="{ 'hidden' : route.name === authRoute.name }"
            >
                {{ authRoute.text }}
            </RouterLink>
        </nav>
    </div>
</template>

