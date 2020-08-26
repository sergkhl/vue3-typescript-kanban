import { reactive, watch, ref, Ref, UnwrapRef } from 'vue'
import { set, get } from 'idb-keyval'
import _isEqual from 'lodash/isEqual'
import _merge from 'lodash/merge'
import _debounce from 'lodash/debounce'
import { DeepPartial } from '@/core/utils/type-helpers'

const baseUrl = 'http://127.0.0.1:3000'
async function req(
  path = '',
  { body, method }: RequestInit = { method: 'GET' },
) {
  const response = await fetch(baseUrl + '/' + path, {
    method,
    body,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  return response.json()
}

const defaultOptionsSetState = { logging: true, merge: false }
export abstract class Store<T extends Object> {
  protected state: UnwrapRef<T>
  protected logging: boolean
  logger: Console

  constructor(readonly storeName: string) {
    const data = this.data()
    this.logger = console
    this.logging = true
    this.state = reactive(data) as UnwrapRef<T>
  }

  protected abstract data(): T

  public getState(): UnwrapRef<T> {
    return this.state
  }

  public setState(
    val: DeepPartial<UnwrapRef<T>>,
    options?: Partial<typeof defaultOptionsSetState>,
  ) {
    const { logging, merge } = { ...defaultOptionsSetState, ...options }
    const props: any = {}
    if (merge) {
      val = _merge({}, this.state, val)
    }
    for (const [key, value] of Object.entries(val)) {
      if (!_isEqual(value, this.state[key as keyof UnwrapRef<T>])) {
        props[key] = value
      }
    }
    if (Object.keys(props).length) {
      Object.assign(this.state, props)
      logging && this.logger.info(props)
    }
  }

  public setLogging(val: boolean) {
    this.logging = val
  }

  set<K extends keyof UnwrapRef<T>, V extends UnwrapRef<T>[K]>(
    prop: K,
    value: V,
  ) {
    this.logger.info('set', { [prop]: value })
    this.state[prop] = value
  }

  get<K extends keyof UnwrapRef<T>>(prop: K): UnwrapRef<T>[K] {
    return this.state[prop]
  }
}

export abstract class PersistentStore<T extends Object> extends Store<T> {
  private isInitialized = ref(false)
  private restoreStatePromise = ref<Promise<void> | null>(null)
  private saveStatePromise = ref<Promise<void> | null>(null)

  constructor(readonly storeName: string) {
    super(storeName)
  }

  async restoreState() {
    const stateFromIndexedDB: string = await get(this.storeName)
    let parsedLocalState: any
    if (stateFromIndexedDB) {
      parsedLocalState = JSON.parse(stateFromIndexedDB)
      console.info(
        'RESTORED FROM LOCAL DB',
        Object.keys(parsedLocalState).join(' | '),
      )
      this.setState(parsedLocalState, { logging: false, merge: true })
    }
    req(this.storeName).then((remoteState) => {
      if (!_isEqual(remoteState, parsedLocalState)) {
        this.setState(remoteState, { logging: false, merge: true })
        // TODO check timestamp
        console.log('RESTORED FROM REMOTE', remoteState)
      }
    })
  }

  async saveState(val: any) {
    const value = JSON.stringify(val)
    console.info('persistent state saved', value)
    await Promise.all([
      set(this.storeName, value),
      req(this.storeName, { method: 'POST', body: value }),
    ])
  }

  async init() {
    if (!this.isInitialized.value) {
      if (!this.restoreStatePromise.value) {
        this.restoreStatePromise.value = this.restoreState()
      }
      await this.restoreStatePromise.value

      const saveStateDebounced = _debounce(
        (val: any) => this.saveState(val),
        500,
      )
      watch(
        () => this.state,
        (newState) => {
          saveStateDebounced(newState)
        },
        { deep: true },
      )

      this.restoreStatePromise.value = null
      this.isInitialized.value = true
    }
  }

  getIsInitialized(): Ref<boolean> {
    return this.isInitialized
  }
}
