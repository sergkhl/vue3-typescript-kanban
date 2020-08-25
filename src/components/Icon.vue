<template>
  <svg
    class="fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import { ICONS } from '@/core/constants'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    name: { type: String as PropType<keyof typeof ICONS>, required: true },
  },
  setup(props) {
    const path = computed(() => ICONS[props.name])
    return { path }
  },
})
</script>
