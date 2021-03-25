import { useNode } from './NodeProvider'

export const Background = () => {
  const { width, height, selected, color } = useNode()
  return (
    <rect
      filter="url(#shadow)"
      width={width}
      height={height}
      fill={color}
      stroke={selected ? 'var(--highlight)' : 'none'}
      rx={8}
    />
  )
}
