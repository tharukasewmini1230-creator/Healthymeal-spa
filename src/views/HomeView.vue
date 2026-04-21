<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Recipe, RecipeResponse } from '../types/Recipe'
import RecipeCard from "../components/RecipeCard.vue"
import RecipeModal from "../components/RecipeModal.vue"

const recipes = ref<Recipe[]>([])
const selectedMeal = ref<Recipe | null>(null)
const search = ref("")
const isLoading = ref(true)
const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']
const selectedCategory = ref('All')

const fetchRecipes = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes')
    const data: RecipeResponse = await response.json()
    recipes.value = data.recipes
  } catch (error) {
    console.error("Fetch error:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRecipes)

const filteredRecipes = computed(() => {
  return recipes.value.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || r.mealType.includes(selectedCategory.value)
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
    <div class="max-w-7xl mx-auto">
      <header class="text-center mb-10">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">Healthy Recipe Hub</h1>
        <p class="text-gray-500 dark:text-gray-400">Premium Data-Driven Application</p>
      </header>

      <div class="max-w-xl mx-auto mb-8">
        <input v-model="search" type="text" placeholder="Search recipes..." class="w-full px-6 py-4 rounded-2xl shadow-lg dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500 transition-all" />
      </div>

      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="selectedCategory === cat ? 'bg-green-500 text-white shadow-lg' : 'bg-white dark:bg-gray-800 dark:text-gray-300'" class="px-5 py-2 rounded-xl font-bold transition-all hover:scale-105">
          {{ cat }}
        </button>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-gray-200 dark:bg-gray-800 h-80 rounded-3xl animate-pulse"></div>
      </div>

      <div v-else-if="filteredRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" @open="selectedMeal = recipe" />
      </div>

      <div v-else class="text-center py-20">
        <p class="text-xl text-gray-400 font-medium text-center w-full">No recipes found for "{{ search }}"</p>
      </div>

      <RecipeModal v-if="selectedMeal" :meal="selectedMeal" @close="selectedMeal = null" />
    </div>
  </div>
</template>