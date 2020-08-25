import { PersistentStore } from './base'

const STORE_NAME = 'ROUTE_TRANSITION'

const TRANSITION_NAMES = ['', 'left', 'right'] as const

export const initialValues = {
  transitionName: '' as typeof TRANSITION_NAMES[number],
}

export type IRouteTransitionStore = typeof initialValues

class RouteTransitionStore extends PersistentStore<IRouteTransitionStore> {
  protected data(): IRouteTransitionStore {
    return initialValues
  }
}

export const routeTransitionStore = new RouteTransitionStore(STORE_NAME)
