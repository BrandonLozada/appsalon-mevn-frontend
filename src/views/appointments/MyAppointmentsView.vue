<script setup>
    import { useUserStore } from '@/stores/user'

    const user = useUserStore()
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white">Mis citas</h2>
    <p class="text-white text-lg">A continuación podrás administrar tus próximas citas</p>

</template>