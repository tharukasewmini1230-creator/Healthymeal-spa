<script setup>
import { useMealStore } from "../store/mealStore"
import RecipeCard from "../components/RecipeCard.vue"

const store = useMealStore()
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 dark:text-white text-center">Your Favorite Meals ❤️</h1>

    <div v-if="store.favorites.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <RecipeCard 
        v-for="meal in store.favorites" 
        :key="meal.id" 
        :recipe="meal"
      />
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-400 text-lg">You haven't added any favorites yet.</p>
      <router-link to="/" class="text-green-500 underline mt-4 inline-block">Go back to recipes</router-link>
    </div>
  </div>
</template>