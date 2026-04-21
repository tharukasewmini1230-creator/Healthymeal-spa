<template>
  <div class="flex gap-4 mb-4 flex-wrap">
    <select v-model="selectedCuisine" @change="emitFilters" class="border rounded px-2 py-1">
      <option value="">All Cuisines</option>
      <option v-for="c in cuisines" :key="c" :value="c">{{ c }}</option>
    </select>

    <select v-model="selectedDifficulty" @change="emitFilters" class="border rounded px-2 py-1">
      <option value="">All Difficulty</option>
      <option v-for="d in difficulties" :key="d" :value="d">{{ d }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

export default defineComponent({
  props: {
    cuisines: { type: Array as PropType<string[]>, default: () => [] },
    difficulties: { type: Array as PropType<string[]>, default: () => [] }
  },
  emits: ['update:filters'],
  setup(props, { emit }) {
    const selectedCuisine = ref('')
    const selectedDifficulty = ref('')

    const emitFilters = () => {
      emit('update:filters', {
        cuisine: selectedCuisine.value,
        difficulty: selectedDifficulty.value
      })
    }

    return { selectedCuisine, selectedDifficulty, emitFilters }
  }
})
</script>