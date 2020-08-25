<template>
  <div>
    <RouterLink class="group" to="/">
      <h1 class="text-6xl font-bold flex items-center">
        <Icon
          name="dashboard"
          class="h-20 w-20 text-orange-400 transition-colors duration-300 group-hover:text-orange-600 group-hover:animate-spin"
        />
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 group-hover:animate-pulse"
        >
          KANBAN
        </span>
      </h1>
    </RouterLink>
    <!-- <div>
      <NavTopItem
        v-for="(item, index) in navList"
        :key="index"
        :active="defaultActive === index"
        @click="handleSelectNav(index, item)"
      >
        {{ item.name }}
      </NavTopItem>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'
// import NavTopItem from '@/components/NavTopItem.vue'
interface INavListItem {
  name: string
  path: string
}

export default defineComponent({
  name: 'NavTop',
  components: {
    // NavTopItem,
    Icon,
  },
  setup() {
    const defaultActive = ref(1)
    const navList = ref<INavListItem[]>([
      {
        name: 'item',
        path: '/boards/_slug',
      },
    ])
    const router = useRouter()
    const handleSelectNav = (index: number, item: INavListItem) => {
      defaultActive.value = index
      router.push({
        path: item.path,
      })
    }
    return {
      defaultActive,
      navList,
      handleSelectNav,
    }
  },
})
</script>
