<template>
  <div>
    <Kanban
      :state-machine-config="stateMachineConfig"
      :stages="statuses"
      :blocks="kanbanState.blocks"
      @update-block="updateBlock"
    >
      <template v-for="stage in statuses" #[stage]>
        <div :key="stage">
          <h2>
            {{ stage }}
            <a>+</a>
          </h2>
        </div>
      </template>
      <template v-for="item in kanbanState.blocks" #[item.id]>
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
import faker from 'faker'
import _debounce from 'lodash/debounce'
import Kanban from '@/components/Kanban.vue'
import { onBeforeMount, reactive, ref } from 'vue'
import { CARD_STATUSES } from '@/core/constants'
import { IBlock } from '@/core/types'
import { kanbanStore } from '@/store/kanban'
import { StateNodeDefinition } from 'xstate'

export default {
  name: 'Board',
  components: {
    Kanban,
  },
  setup() {
    const kanbanState = kanbanStore.getState()

    // as StateNodeDefinition<typeof stateMachineConfig, any, any>
    // https://xstate.js.org/docs/packages/xstate-fsm/#super-quick-start
    const stateMachineConfig = reactive({
      id: 'kanban',
      initial: 'on-hold',
      states: {
        'on-hold': {
          on: {
            PICK_UP: 'in-progress',
          },
        },
        'in-progress': {
          on: {
            RELINQUISH_TASK: 'on-hold',
            PUSH_TO_QA: 'needs-review',
          },
        },
        'needs-review': {
          on: {
            REQUEST_CHANGE: 'in-progress',
            PASS_QA: 'approved',
          },
        },
        approved: {
          type: 'final',
        },
      },
    })

    const updateBlock = (
      id: string | number,
      status: typeof CARD_STATUSES[number],
    ) => {
      const block = kanbanState.blocks.find((b) => b.id === Number(id))
      block && (block.status = status)
    }

    const addBlock = (stage: typeof CARD_STATUSES[number]) => {
      kanbanState.blocks.push({
        id: kanbanState.blocks.length,
        status: stage,
        title: faker.company.bs(),
      })
    }

    onBeforeMount(async () => {
      await kanbanStore.init()

      if (!kanbanState.blocks.length) {
        console.log('fill with new blocks')
        for (let i = 0; i <= 10; i += 1) {
          kanbanState.blocks.push({
            id: i,
            status: CARD_STATUSES[Math.floor(Math.random() * 4)],
            title: faker.company.bs(),
          })
        }
      }
    })

    return {
      statuses: CARD_STATUSES,
      updateBlock,
      addBlock,
      stateMachineConfig,
      kanbanState,
    }
  },
}
</script>

<style lang="postcss">
@import 'kanban.css';
</style>
