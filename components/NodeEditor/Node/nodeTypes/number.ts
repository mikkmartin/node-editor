import { ISocket } from '../Sockets'
import { NodeProps, NodeInitialProps, generateSockets } from './nodeTypes'

export const compute = (inputs: ISocket[], outputs: ISocket[]): ISocket[] => [
  { id: outputs[0].id, value: inputs[0].value },
]

export const number = (initialProps: NodeInitialProps): NodeProps => {
  const inputs = generateSockets([0], initialProps.inputs)
  const outputs = generateSockets([0])

  return {
    inputs,
    outputs,
    compute,
    width: 68,
  }
}
