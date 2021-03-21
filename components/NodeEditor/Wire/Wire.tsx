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
        const { source, target, active } = getWireProps(id)
        return (
          <>
            <path
              d={`M ${source.x} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${
                (source.x + target.x) / 2
              } ${target.y} ${target.x} ${target.y}`}
              strokeLinecap="round"
              style={{
                pointerEvents: 'none',
                stroke: active ? 'var(--highlight)' : 'rgba(255, 255, 255, 0.4)',
                fill: 'none',
                strokeWidth: 2,
              }}
            />
            {active
              ? [source, target].map(el => <circle cx={el.x} cy={el.y} r={2} fill="white" />)
              : null}
          </>
        )
      }}
    />
  )
}
