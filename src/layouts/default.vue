<template>
  <div>
    <NavTop />
    <!-- <div @touchstart="handleTouchStart" @touchend="handleTouchEnd"> -->
    <router-view>
      <template #default="{ Component }">
        <transition-group
          :name="routerTransitionState.transitionName"
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
    <!-- </div> -->
  </div>
</template>

<script>
import NavTop from '@/components/NavTop'
import { routeTransitionStore } from '@/store/route-transition'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Home',
  components: {
    NavTop,
  },
  setup() {
    const router = useRouter()
    const routerTransitionState = routeTransitionStore.getState()
    router.beforeEach((to, from, next) => {
      let transitionName = ''
      if (to.meta.index < from.meta.index) {
        transitionName = 'left'
      } else if (to.meta.index > from.meta.index) {
        transitionName = 'right'
      }
      routeTransitionStore.setState({ transitionName })
      next()
    })
    const route = useRoute()
    console.log(route.meta.keepAlive)
    let touchStartX = 0
    let touchEndX = 0
    const handleTouchStart = (e) => {
      console.log(e)
      touchStartX = e.changedTouches[0].clientX
    }
    const handleTouchEnd = (e) => {
      console.log(e)
      touchEndX = e.changedTouches[0].clientX
      if (touchStartX > touchEndX && touchStartX - touchEndX > 50) {
        console.log(route)
        console.log(route.getRoutes())
        console.log(route.currentRoute)
      }
    }
    return {
      route,
      routerTransitionState,
      handleTouchStart,
      handleTouchEnd,
    }
  },
}
</script>
