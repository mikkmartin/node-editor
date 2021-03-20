import { Socket } from './Socket'
import { INode, NodeType } from '../Node'

export interface ISocket {
  id: string
  value: number | string
}

export const Sockets = ({ inputs, outputs, width, type }: INode) => {
  return (
    <>
      {compute(inputs, outputs, type).map((output, i) => (
        <Socket
          key={output.id}
          type="output"
          nodeType={type}
          nth={i}
          value={output.value}
          width={width}
        />
      ))}
      {inputs.map((input, i) => (
        <Socket
          key={input.id}
          type="input"
          nodeType={type}
          nth={i}
          value={input.value}
          width={width}
        />
      ))}
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
