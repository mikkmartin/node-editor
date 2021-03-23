import { ISocket } from '../Sockets'
import { NodeProps, NodeInitialProps, generateSockets } from './nodeTypes'

export const add = (initialProps: NodeInitialProps): NodeProps => {
  const compute = (inputs: ISocket[], outputs: ISocket[]): ISocket[] => {
    const output: ISocket = inputs.reduce((a, input) => ({
      id: outputs[0].id,
      value:
        typeof a.value === 'number' ? +a.value + +input.value : a.value.toString() + input.value,
    }))
    return [output]
  }

  const inputs = generateSockets([0, 0, 0], initialProps.inputs)
  const outputs = generateSockets([0])

  return {
    inputs,
    outputs,
    compute,
    width: 89,
  }
}
