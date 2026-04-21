<script setup lang="ts">
import { ref } from 'vue'
import { useMealStore } from "../store/mealStore"
import type { Recipe } from "../types/Recipe"

const props = defineProps<{ meal: Recipe | null }>()
const emit = defineEmits(['close'])
const store = useMealStore()
const selectedDay = ref("Monday")

const handleAddToPlan = () => {
  if (props.meal) {
    store.addToWeeklyPlan(selectedDay.value, props.meal)
    alert(`Successfully added to ${selectedDay.value}!`)
  }
}
</script>

<template>
  <div v-if="meal" class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-[2.5rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="relative">
        <img :src="meal.image" class="w-full h-80 object-cover rounded-t-[2.5rem]" />
        <button @click="$emit('close')" class="absolute top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white w-10 h-10 rounded-full flex items-center justify-center">✕</button>
      </div>
      
      <div class="p-8">
        <h2 class="text-4xl font-black dark:text-white mb-6">{{ meal.name }}</h2>

        <div class="mb-10 p-6 bg-green-50 dark:bg-gray-700/50 rounded-3xl border-2 border-dashed border-green-200 dark:border-green-900">
          <h4 class="font-bold mb-4 dark:text-white flex items-center gap-2"><span>📅</span> Add to Weekly Schedule</h4>
          <div class="flex gap-3">
            <select v-model="selectedDay" class="flex-1 p-3 rounded-xl dark:bg-gray-800 dark:text-white border-none outline-none ring-1 ring-gray-200 dark:ring-gray-600">
              <option v-for="day in Object.keys(store.weeklyPlan)" :key="day" :value="day">{{ day }}</option>
            </select>
            <button @click="handleAddToPlan" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95">
              Confirm Add
            </button>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-10 mb-10">
          <div class="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-3xl">
            <h3 class="font-bold text-xl mb-4 dark:text-white">📝 Ingredients</h3>
            <ul class="space-y-2">
              <li v-for="ing in meal.ingredients" :key="ing" class="text-gray-600 dark:text-gray-400 text-sm italic">
                • {{ ing }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-xl mb-4 dark:text-white">Instructions</h3>
            <div class="space-y-4">
              <p v-for="(step, index) in meal.instructions" :key="index" class="text-gray-600 dark:text-gray-400 text-sm">
                <span class="font-bold text-green-500">{{ index + 1 }}.</span> {{ step }}
              </p>
            </div>
          </div>
        </div>

        <button @click="$emit('close')" class="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-5 rounded-2xl font-black">Close Details</button>
      </div>
    </div>
  </div>
</template>