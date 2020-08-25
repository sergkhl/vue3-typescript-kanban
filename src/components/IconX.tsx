import { ICONS } from '@/core/constants'
const defaultIconSize = '24'

const IconX = ({
  props,
  listeners,
  scopedSlots,
  slots,
  data,
  children,
  ...other
}: any) => {
  let iconName: keyof typeof ICONS = 'empty'
  console.log(other, slots, children, scopedSlots)
  if (slots.default) {
    iconName = slots.default[0].text!.trim()
  }

  let { size } = props
  size = size || defaultIconSize
  return (
    <svg
      class="fill-current"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <path d={ICONS[iconName]} />
    </svg>
  )
}

export default IconX
