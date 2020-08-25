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
import { computed, defineComponent, PropType } from 'vue'

const icons = {
  dashboard: 'M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z',
} as const
export default defineComponent({
  props: {
    name: { type: String as PropType<keyof typeof icons>, required: true },
  },
  setup(props) {
    const path = computed(() => icons[props.name])
    return { path }
  },
})
</script>
