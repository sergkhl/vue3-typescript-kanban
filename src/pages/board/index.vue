<template>
  <div>
    <Kanban :stages="statuses" :blocks="blocks" @update-block="updateBlock">
      <template v-for="stage in statuses" #[stage]>
        <div :key="stage">
          <h2>
            {{ stage }}
            <a>+</a>
          </h2>
        </div>
      </template>
      <template v-for="item in blocks" #[item.id]>
        <div :key="item.id">
          <div><strong>id:</strong> {{ item.id }}</div>
          <div>
            {{ item.title }}
          </div>
        </div>
      </template>
      <template v-for="stage in statuses" #[`footer-${stage}`]>
        <div :key="stage">
          <a href="" @click.prevent="() => addBlock(stage)">+ Add new block</a>
        </div>
      </template>
    </Kanban>
  </div>
</template>

<script lang="ts">
export type IBlock = {
  id: number
  status: string
  title: string
}

import faker from 'faker'
import _debounce from 'lodash/debounce'
import Kanban from '@/components/Kanban.vue'
import { onMounted, ref } from 'vue'
import { CARD_STATUSES } from '@/core/constants'

export default {
  name: 'Board',
  components: {
    Kanban,
  },
  setup() {
    const blocks = ref<IBlock[]>([])

    const updateBlock = _debounce(function (id, status) {
      const block = blocks.value.find((b) => b.id === Number(id))
      block && (block.status = status)
    }, 500)
    const addBlock = _debounce(function (stage) {
      blocks.value.push({
        id: blocks.value.length,
        status: stage,
        title: faker.company.bs(),
      })
    }, 500)

    onMounted(() => {
      for (let i = 0; i <= 10; i += 1) {
        blocks.value.push({
          id: i,
          status: CARD_STATUSES[Math.floor(Math.random() * 4)],
          title: faker.company.bs(),
        })
      }
    })

    return { statuses: CARD_STATUSES, blocks, updateBlock, addBlock }
  },
}
</script>

<style lang="postcss">
@import 'kanban.css';
</style>
