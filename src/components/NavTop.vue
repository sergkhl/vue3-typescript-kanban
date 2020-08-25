<template>
  <div class="top-nav">
    <div class="top-nav-top">
      <div class="nav-top-left">
        <Icon name="" :has-info="true" />
      </div>
      <div class="nav-top-middle">
        <div class="nav-top-search">
          <Icon name="" />
          <input class="search-input" />
        </div>
      </div>
      <div class="nav-top-right">
        <Icon name="" />
      </div>
    </div>
    <div>
      <NavTopItem
        v-for="(item, index) in navList"
        :key="index"
        :active="defaultActive === index"
        @click="handleSelectNav(index, item)"
      >
        {{ item.name }}
      </NavTopItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'
import NavTopItem from '@/components/NavTopItem.vue'
interface INavListItem {
  name: string
  path: string
}

export default defineComponent({
  name: 'NavTop',
  components: {
    NavTopItem,
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
