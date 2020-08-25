<template>
  <div>
    <NavTop />
    <div class="router-view__container">
      <router-view>
        <template #default="{ Component }">
          <transition-group
            :name="transition"
            :duration="500"
            tag="div"
            type="transition"
            :appear="true"
          >
            <keep-alive v-if="route.meta.keepAlive" key="home-router-alive">
              <component :is="Component"
            /></keep-alive>
            <component :is="Component" v-else key="home-router-key" />
          </transition-group>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import NavTop from '@/components/NavTop.vue'
import { routeTransitionStore } from '@/store/route-transition'
import { useRouter, useRoute } from 'vue-router'
import { computed, defineComponent, watch } from 'vue'
import { TRANSITION_NAMES } from '@/core/constants'
export default defineComponent({
  name: 'Home',
  components: {
    NavTop,
  },
  setup() {
    const router = useRouter()
    const routerTransitionState = routeTransitionStore.getState()
    const transition = computed(() => routerTransitionState.transitionName)
    watch(
      router.currentRoute,
      (to, from) => {
        console.log({ to, from })
        let transitionName: typeof TRANSITION_NAMES[number]
        if (!from) {
          transitionName = 'top'
        } else if (to.meta.index < from.meta.index) {
          transitionName = 'left'
        } else {
          transitionName = 'right'
        }
        routeTransitionStore.setState({ transitionName })
      },
      { immediate: true },
    )
    const route = useRoute()
    console.log(route.meta.keepAlive)
    return {
      route,
      transition,
      routerTransitionState,
    }
  },
})
</script>

<style lang="postcss">
@import 'transitions.css';
</style>
