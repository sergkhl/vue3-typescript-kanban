import { PersistentStore } from './base'
import { IBlock } from '@/core/types'

const STORE_NAME = 'KANBAN'

export const initialValues = {
  blocks: [] as IBlock[],
}

export type IKanbanStore = typeof initialValues

class KanbanStore extends PersistentStore<IKanbanStore> {
  protected data(): IKanbanStore {
    return initialValues
  }
}

export const kanbanStore = new KanbanStore(STORE_NAME)
