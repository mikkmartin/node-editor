import { memo } from 'react'
import styled from 'styled-components'
import { useNode } from './NodeProvider'

export const Label = memo(() => {
  const { id, width, type, label } = useNode()
  return (
    <>
      <defs>
        <clipPath id={`round-corner-${id}`}>
          <rect width={width} height="30" rx="4" ry="4" />
        </clipPath>
      </defs>
      <rect
        fill="rgba(255,255,255,0.07)"
        clipPath={`url(#round-corner-${id})`}
        width={width}
        height="20"
      />
      <Text height="20" textAnchor="middle" width={width}>
        <span>{label || type}</span>
      </Text>
    </>
  )
})

const Text = styled.foreignObject`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  padding: 0 4px;
  span {
    font-weight: bold;
    text-transform: capitalize;
    text-align: center;
    font-size: 10px;
    line-height: 20px;
    letter-spacing: -0.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
