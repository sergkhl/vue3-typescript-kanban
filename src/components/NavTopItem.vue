<template>
  <div
    :class="{
      active: props.active,
    }"
  >
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'NavTopItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      props,
    }
  },
}
</script>
