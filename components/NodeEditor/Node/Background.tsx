import { useNode } from './NodeProvider'

export const Background = () => {
  const { width, height, selected } = useNode()
  return (
    <rect
      filter="url(#shadow)"
      width={width}
      height={height}
      stroke={selected ? 'var(--highlight)' : 'none'}
      rx={8}
    />
  )
}
