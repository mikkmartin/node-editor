import { nanoid } from 'nanoid'

export type NodeType = 'number' | 'add' | 'substract' | 'multiply' | 'divide'
interface Socket {
  id: string
  value: number | string
}
export interface NodeProps {
  type: NodeType
  x?: number
  y?: number
  inputs?: any[]
  outputs?: any[]
}
export interface Node extends NodeProps {
  id: string
  x: number
  y: number
  width: number
  height: number
  inputs: Socket[]
  outputs: Socket[]
}

let runningY = 20
export const getNodeProps = (initialProps: NodeProps): Node => {
  const { type, inputs, outputs } = initialProps
  const sockets = getInputs(type, inputs, outputs)
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
  runningY += height
  return node
}

const addNode = props => {
  return {
    ...props,
    id: nanoid(),
    x: 20,
    width: 100,
  }
}

const numberNode = props => {
  return {
    ...props,
    id: nanoid(),
    x: 20,
    width: 75,
  }
}

interface Sockets {
  inputs: Socket[]
  outputs: Socket[]
}
const getInputs = (type: NodeType, initialInputs?: any[], initialOutputs?: any[]): Sockets => {
  switch (type) {
    case 'add':
      return {
        inputs: mapInputs(initialInputs, [0]),
        outputs: mapInputs(initialOutputs, [0, 0]),
      }
    default:
      return {
        inputs: [{ id: nanoid(), value: 0 }],
        outputs: [{ id: nanoid(), value: 0 }],
      }
  }
}

const mapInputs = (initialValues, defaults) =>
  defaults.map((defaultValue, i) => ({
    id: nanoid(),
    value: initialValues?.length > i ? initialValues[i] : defaultValue,
  }))

const calcNodeHeight = ({ inputs, outputs }: Sockets): number => {
  return 25 + Math.max(inputs.length, outputs.length) * 15
}
