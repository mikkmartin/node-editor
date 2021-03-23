import { Socket } from './Socket'
import { useNode } from '../NodeProvider'
import { Observer } from 'mobx-react-lite'

export interface ISocket {
  id: string
  value: number | string
}

export const Sockets = () => {
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
