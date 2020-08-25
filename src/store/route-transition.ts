import { PersistentStore } from './base'
import { TRANSITION_NAMES } from '@/core/constants'

const STORE_NAME = 'ROUTE_TRANSITION'

export const initialValues = {
  transitionName: 'fade' as typeof TRANSITION_NAMES[number],
}

export type IRouteTransitionStore = typeof initialValues

class RouteTransitionStore extends PersistentStore<IRouteTransitionStore> {
  protected data(): IRouteTransitionStore {
    return initialValues
  }
}

export const routeTransitionStore = new RouteTransitionStore(STORE_NAME)
