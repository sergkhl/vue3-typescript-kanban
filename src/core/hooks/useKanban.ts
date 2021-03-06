import { Ref, ref, onMounted, onBeforeMount, computed } from 'vue'
import { Machine, AnyStateNodeDefinition } from 'xstate'
import dragula, { DragulaOptions } from 'dragula'
import { CARD_STATUSES } from '@/core/constants'

interface IListElement extends Element {
  dataset?: {
    status: typeof CARD_STATUSES[number]
  }
}

interface IBlockElement extends Element {
  dataset?: {
    blockId: string
  }
}

export function useKanban(
  props: {
    blocks: any[]
    config: DragulaOptions
    stateMachineConfig: AnyStateNodeDefinition
  },
  emit: Function,
  idProp: string,
  statusProp: string,
  rootRef: Ref<Element>,
  listRefs: Ref<Element[]>,
) {
  const localBlocks = computed(() => props.blocks)
  const drake = ref<dragula.Drake>()
  const machine = ref()
  let config: DragulaOptions = { ...props.config }

  const getBlocks = (status: string) => {
    return localBlocks.value.filter((block) => block[statusProp] === status)
  }

  const findPossibleTransitions = (
    sourceState: typeof CARD_STATUSES[number],
  ) => {
    return machine.value.config.states[sourceState].on || {}
  }

  const findTransition = (target: IListElement, source: IListElement) => {
    const targetState = target.dataset?.status
    const sourceState = source.dataset?.status
    const possibleTransitions =
      sourceState && findPossibleTransitions(sourceState)
    return Object.keys(possibleTransitions).find(
      (transition) => possibleTransitions[transition] === targetState,
    )
  }

  const accepts = (
    block?: IBlockElement,
    target?: IListElement,
    source?: IListElement,
  ) => {
    if (!machine.value) {
      return true
    }
    const targetState = target?.dataset?.status
    const sourceState = source?.dataset?.status
    return !!(
      sourceState &&
      Object.values(findPossibleTransitions(sourceState)).includes(targetState)
    )
  }

  const allowedTargets = (el: IBlockElement, source: IListElement) => {
    const block = localBlocks.value.find(
      (b) => b[idProp] === el.dataset?.blockId,
    )
    return drake.value?.containers.filter(
      (c) => props.config?.accepts && props.config.accepts(block, c, source),
    )
  }

  const forbiddenTargets = (el: IBlockElement, source: IListElement) => {
    return drake.value?.containers.filter(
      (c) => !allowedTargets(el, source)?.includes(c),
    )
  }

  onMounted(() => {
    config.accepts = config.accepts || accepts
    config.mirrorContainer = rootRef.value
    drake.value = dragula(listRefs.value, config)
      .on('drag', (el: IBlockElement, source: IListElement) => {
        emit('drag', el, source)
        el.classList.add('is-moving')
        allowedTargets(el, source)?.forEach((c) => c.classList.add('allowed'))
        forbiddenTargets(el, source)?.forEach((c) =>
          c.classList.add('forbidden'),
        )
      })
      .on('dragend', (el) => {
        emit('dragend', el)
        el.classList.remove('is-moving')
        drake.value?.containers.forEach((c) =>
          c.classList.remove('allowed', 'forbidden'),
        )
        window.setTimeout(() => {
          el.classList.add('is-moved')
          window.setTimeout(() => {
            el.classList.remove('is-moved')
          }, 600)
        }, 100)
      })
      .on(
        'drop',
        (
          block: IBlockElement,
          list: IListElement,
          source: IListElement,
          sibling,
        ) => {
          emit('drop', block, list, source, sibling)
          let index = 0
          for (index = 0; index < list.children.length; index += 1) {
            if (list.children[index].classList.contains('is-moving')) break
          }

          let newState = list.dataset?.status

          if (machine.value) {
            const transition = findTransition(list, source)
            if (!transition) return
            newState = machine.value.transition(
              source.dataset?.status,
              transition,
            ).value
          }

          emit('update-block', block.dataset?.blockId, newState, index)
        },
      )
      .on('cancel', (el, container, source) => {
        emit('cancel', el, container, source)
      })
      .on('remove', (el, container, source) => {
        emit('remove', el, container, source)
      })
      .on('shadow', (el, container, source) => {
        emit('shadow', el, container, source)
      })
      .on('over', (el, container, source) => {
        emit('over', el, container, source)
      })
      .on('out', (el, container, source) => {
        emit('out', el, container, source)
      })
      .on('cloned', (clone, original, type) => {
        emit('cloned', clone, original, type)
      })
    emit('init', drake)
  })

  onBeforeMount(() => {
    if (props.stateMachineConfig) {
      machine.value = Machine(props.stateMachineConfig)
    }
  })

  return {
    getBlocks,
    findPossibleTransitions,
    findTransition,
    accepts,
    allowedTargets,
    forbiddenTargets,
    drake,
  }
}
