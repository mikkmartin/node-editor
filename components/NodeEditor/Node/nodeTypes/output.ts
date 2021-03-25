import { ISocket } from '../Sockets'
import { NodeProps, NodeInitialProps, generateSockets } from './nodeTypes'

export const compute = (inputs: ISocket[], outputs: ISocket[]): ISocket[] => {
  const output: ISocket = inputs.reduce((a, input) => ({
    id: outputs[0].id,
    value: typeof a.value === 'number' ? +a.value + +input.value : a.value.toString() + input.value,
  }))
  return [output]
}

export const output = (initialProps: NodeInitialProps): NodeProps => {
  const inputs = generateSockets([0], initialProps.inputs)
  const outputs = generateSockets([0])

  return {
    inputs,
    outputs,
    compute,
    width: 61,
    color: '#1890F1',
    hideOutput: true,
  }
}
