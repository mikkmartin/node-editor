import { Socket } from './Socket'
import { NodeType } from '../Node'
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
          render={() => {
            const socket = inputs.find(_input => _input.id === input.id)
            if (!socket) return null
            return (
              <Socket
                key={socket.id}
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
      <Observer
        render={() => {
          return (
            <>
              {compute(inputs, outputs, type).map((output, i) => (
                <Socket
                  key={output.id}
                  id={output.id}
                  type="output"
                  nodeType={type}
                  nth={i}
                  width={width}
                  value={output.value}
                />
              ))}
            </>
          )
        }}
      />
    </>
  )
}

const compute = (inputs: ISocket[], outputs: ISocket[], type: NodeType) => {
  switch (type) {
    case 'add':
      return [add(inputs)]
    default:
      return inputs
  }
}

const add = (inputs: ISocket[]): ISocket =>
  inputs.reduce((a, { value }) => ({
    ...a,
    value: typeof a.value === 'number' ? +a.value + +value : a.value.toString() + value,
  }))
