<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  },
})
</script>

<style lang="postcss">
/* purgecss start ignore */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
/* purgecss end ignore */

@import 'tailwindcss/utilities';

body {
  @apply bg-gradient-to-r from-gray-600 via-teal-800 to-gray-600;
}
</style>
