<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <nav class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
        HealthyEats
      </router-link>

      <div class="flex items-center gap-6">
        <router-link to="/" class="dark:text-white hover:text-green-500 transition font-medium">Home</router-link>
        <router-link to="/favorites" class="dark:text-white hover:text-green-500 transition font-medium">Favorites</router-link>
        <router-link to="/weekly" class="dark:text-white hover:text-green-500 transition font-medium">Weekly Plan</router-link>
        
        <button @click="toggleDark" class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xl">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </nav>
</template>