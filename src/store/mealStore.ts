import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '../types/Recipe'

export const useMealStore = defineStore('meal', () => {
  // Load data from localStorage on initialization
  const savedFavs = localStorage.getItem('favorites')
  const savedPlan = localStorage.getItem('weeklyPlan')

  const favorites = ref<Recipe[]>(savedFavs ? JSON.parse(savedFavs) : [])
  const weeklyPlan = ref<Record<string, Recipe | null>>(
    savedPlan ? JSON.parse(savedPlan) : {
      Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null, Sunday: null
    }
  )

  const saveToLocal = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
    localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan.value))
  }

  const addFavorite = (recipe: Recipe) => {
    if (!favorites.value.find(r => r.id === recipe.id)) {
      favorites.value.push(recipe)
      saveToLocal()
    }
  }

  const removeFavorite = (id: number) => {
    favorites.value = favorites.value.filter(r => r.id !== id)
    saveToLocal()
  }

  const addToWeeklyPlan = (day: string, recipe: Recipe) => {
    if (day in weeklyPlan.value) {
      weeklyPlan.value[day] = recipe
      saveToLocal()
    }
  }

  const removeFromWeekly = (day: string) => {
    weeklyPlan.value[day] = null
    saveToLocal()
  }

  return { favorites, weeklyPlan, addFavorite, removeFavorite, addToWeeklyPlan, removeFromWeekly }
})