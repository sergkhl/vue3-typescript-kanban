import { FunctionalComponent, ComponentInternalInstance } from 'vue'

const FadeTransition: FunctionalComponent<ComponentInternalInstance> = (
  context,
) => {
  console.info('context', context)
  return (
    <transition-group name="fade">{context.slots.default}</transition-group>
  )
}

export default FadeTransition
