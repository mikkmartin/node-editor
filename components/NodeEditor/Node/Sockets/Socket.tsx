import { motion, PanInfo } from 'framer-motion'
import styled from 'styled-components'

interface SocketProps {
  width: number
  nth: number
  value: any
  type: 'input' | 'output'
}

export const Socket = ({ value, nth, type, width }: SocketProps) => {
  const y = 20 + nth * 15
  const isInput = type === 'input'
  const x = isInput ? 0 : width - 15
  
  const textX = x + 15
  const textY = y + 11

  const cx = isInput ? 7 : width - 7
  const cy = 28 + nth * 16

  return (
    <Container>
      <motion.rect x={x} y={y} fill="rgba(0,0,0,0)" width="16" height="16" />
      <circle cx={cx} cy={cy} r="2" fill="gray" />
      <motion.circle
        strokeWidth="2"
        stroke="transparent"
        style={{ fill: 'transparent' }}
        cx={cx}
        cy={cy}
        r="5"
        fill="none"
      />
      {isInput && (
        <text x={textX} y={textY} opacity={0.5}>
          {value}
        </text>
      )}
    </Container>
  )
}

const Container = styled(motion.g)`
  text {
    opacity: 0.5;
    pointer-events: none;
  }
`
