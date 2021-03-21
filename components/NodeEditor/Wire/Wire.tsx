import { Observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../EditorProvider'

export interface IWire {
  id: string
  source: string
  target: string
}

type WireProps = {
  id: string
}

export const Wire: FC<WireProps> = ({ id }) => {
  const { getWireProps } = useStore()
  return (
    <Observer
      render={() => {
        const { source, target } = getWireProps(id)
        return (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            style={{ stroke: 'rgba(255, 255, 255, 0.5)', strokeWidth: 2 }}
          />
        )
      }}
    />
  )
}
