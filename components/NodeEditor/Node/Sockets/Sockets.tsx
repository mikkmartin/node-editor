import { Socket } from './Socket'
import { useNode } from '../NodeProvider'
import { Observer } from 'mobx-react-lite'
import { useStore } from 'components/NodeEditor/EditorProvider'

export interface ISocket {
  id: string
  value: number | string
}

export const Sockets = () => {
  const store = useStore()
  const { inputs, outputs, width, type } = useNode()
  return (
    <>
      {inputs.map((input, i) => (
        <Observer
          key={input.id}
          render={() => {
            const socket = inputs.find(({ id }) => id === input.id)
            if (!socket) return null
            return (
              <Socket
                id={socket.id}
                value={socket.value}
                type="input"
                connecting={Boolean(store.drawWire)}
                source={store.drawWire?.source || null}
                nodeType={type}
                nth={i}
                width={width}
              />
            )
          }}
        />
      ))}
      {outputs.map((output, i) => (
        <Observer
          key={output.id}
          render={() => {
            const socket = outputs.find(({ id }) => id === output.id)
            if (!socket) return null
            return (
              <Socket
                key={output.id}
                id={output.id}
                type="output"
                nodeType={type}
                nth={i}
                width={width}
                value={output.value}
              />
            )
          }}
        />
      ))}
    </>
  )
}
