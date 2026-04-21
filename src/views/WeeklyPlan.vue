<script setup lang="ts">
import { useMealStore } from "../store/mealStore"
const store = useMealStore()
const days = Object.keys(store.weeklyPlan)
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8 text-white">
    <h1 class="text-3xl font-black text-center mb-10 text-green-500 uppercase">My Weekly Meal Schedule</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      <div v-for="day in days" :key="day" class="bg-gray-800 p-6 rounded-[2rem] border border-gray-700 hover:border-green-500 transition shadow-xl">
        <h3 class="text-green-500 font-black mb-4 tracking-tighter">{{ day }}</h3>
        
        <div v-if="store.weeklyPlan[day]" class="space-y-4 animate-fade-in">
          <img :src="store.weeklyPlan[day]?.image" class="w-full h-32 object-cover rounded-2xl border-2 border-gray-700" />
          <p class="font-bold text-sm text-gray-200">{{ store.weeklyPlan[day]?.name }}</p>
          <button @click="store.removeFromWeekly(day)" class="w-full py-2 text-red-400 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 rounded-xl transition">
            Remove Meal
          </button>
        </div>
        
        <div v-else class="h-40 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl">
          <p class="text-gray-500 text-xs italic">No meal added</p>
        </div>
      </div>
    </div>
  </div>
</template>