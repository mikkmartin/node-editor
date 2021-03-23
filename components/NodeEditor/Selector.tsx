import { motion, PanInfo } from 'framer-motion'
import { Observer } from 'mobx-react-lite'
import { useStore } from './EditorProvider'

export interface Box2D {
  x: number
  y: number
  width: number
  height: number
}

export const Selector = () => {
  const { drag } = useStore()

  return (
    <Observer
      render={() => {
        if (!drag.box) return null
        const { x, y, width, height } = drag.box
        return (
          <motion.rect
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
              pointerEvents: 'none',
              stroke: 'white',
              strokeWidth: 1,
              fill: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        )
      }}
    />
  )
}

let startPos = { x: 0, y: 0 }
let offset = { top: 0, left: 0 }
export const getBox = (ev, info: PanInfo, box): Box2D => {
  if (!Boolean(box)) {
    const { top, left } = ev.target.getBoundingClientRect()
    offset = { top, left }
    startPos = { x: info.point.x - left, y: info.point.y - top }
  }
  const { x, y } = info.point
  const { top, left } = offset

  return {
    x: Math.min(x - left, startPos.x),
    y: Math.min(y - top, startPos.y),
    width: Math.abs(x - (startPos.x + left)),
    height: Math.abs(y - (startPos.y + top)),
  }
}
