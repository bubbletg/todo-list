<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ $store.state.count }}</h1>
  <h2>{{ count }}</h2>
</template>
