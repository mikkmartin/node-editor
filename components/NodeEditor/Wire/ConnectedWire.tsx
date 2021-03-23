import { Observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../EditorProvider'
import { Wire } from './Wire'

export interface IWire {
  id: string
  source: string
  target: string
}

type WireProps = {
  id: string
}

export const ConnectedWire: FC<WireProps> = ({ id }) => {
  const { getWireProps } = useStore()
  return (
    <Observer
      render={() => {
        const { source, target, active } = getWireProps(id)
        return (
          <>
            <Wire start={source} end={target} active={active} />
            {active
              ? [source, target].map((el, i) => (
                  <circle key={i} cx={el.x} cy={el.y} r={2} fill="white" />
                ))
              : null}
          </>
        )
      }}
    />
  )
}
