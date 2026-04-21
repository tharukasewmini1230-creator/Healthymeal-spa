<template>

<input
v-model="search"
@input="$emit('updateSearch', search)"
placeholder="Search healthy meals..."
class="border p-3 w-full rounded-lg mb-6"
/>

</template>

<script setup>

import { ref } from 'vue'

const search = ref("")

</script>