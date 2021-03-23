import { FC } from 'react'
import { Point2D } from '../EditorProvider'

export interface IWire {
  start: Point2D
  end: Point2D
  active: boolean
}

export const Wire: FC<IWire> = ({ start, end, active }) => (
  <path
    d={`M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${start.y} ${(start.x + end.x) / 2} ${
      end.y
    } ${end.x} ${end.y}`}
    strokeLinecap="round"
    style={{
      pointerEvents: 'none',
      stroke: active ? 'var(--highlight)' : 'rgba(255, 255, 255, 0.4)',
      fill: 'none',
      strokeWidth: 2,
    }}
  />
)
