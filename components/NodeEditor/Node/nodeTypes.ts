import { nanoid } from 'nanoid'
import { ISocket } from './Sockets'

export type NodeType = 'number' | 'add' | 'substract' | 'multiply' | 'divide'

export interface NodeProps {
  type: NodeType
  x?: number
  y?: number
  inputs?: any[]
}
export interface Node extends NodeProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  inputs: ISocket[]
  outputs: ISocket[]
}

let runningY = 20
export const getNodeProps = (initialProps: NodeProps): Node => {
  const { type, inputs } = initialProps
  const sockets = getInputs(type, inputs)
  const height = calcNodeHeight(sockets)
  const x = initialProps.x || 20
  const defaults = { x, y: runningY, height, ...sockets }

  let node
  switch (initialProps.type) {
    case 'add':
      node = { ...addNode(initialProps), ...defaults }
      break
    case 'number':
      node = { ...numberNode(initialProps), ...defaults }
      break
    default:
      node = { ...numberNode(initialProps), ...defaults }
  }
  runningY += height + 2
  return node
}

const addNode = props => {
  return {
    ...props,
    id: nanoid(),
    x: 20,
    width: 89,
  }
}

const numberNode = props => {
  return {
    ...props,
    id: nanoid(),
    x: 20,
    width: 68,
  }
}

interface Sockets {
  inputs: ISocket[]
  outputs: ISocket[]
}
const getInputs = (type: NodeType, initialInputs?: any[]): Sockets => {
  switch (type) {
    case 'add':
      return {
        inputs: mapInputs([0, 0, 0], initialInputs),
        outputs: mapInputs([0]),
      }
    default:
      return {
        inputs: [{ id: nanoid(), value: 0 }],
        outputs: [{ id: nanoid(), value: 0 }],
      }
  }
}

const mapInputs = (defaults, initialValues?: any[]) =>
  defaults.map((defaultValue, i) => ({
    id: nanoid(),
    value: initialValues && initialValues?.length > i ? initialValues[i] : defaultValue,
  }))

const calcNodeHeight = ({ inputs, outputs }: Sockets): number => {
  return 26 + Math.max(inputs.length, outputs.length) * 14
}
