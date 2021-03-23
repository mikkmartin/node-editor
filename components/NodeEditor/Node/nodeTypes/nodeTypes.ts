import { nanoid } from 'nanoid'
import { ISocket } from '../Sockets'
import { add } from './add'
import { number } from './number'

export type NodeType = 'number' | 'add' | 'substract' | 'multiply' | 'divide'

export interface NodeInitialProps {
  id?: string
  type: NodeType
  x?: number
  y?: number
  inputs?: any[]
}

export interface NodeProps {
  width: number
  compute?: (inputs: ISocket[], outputs: ISocket[]) => ISocket[]
  inputs: ISocket[]
  outputs: ISocket[]
}

export interface Node extends NodeProps {
  type: NodeType
  id: string
  x: number
  y: number
  height: number
}

let runningY = 20
export const getNodeProps = (initialProps: NodeInitialProps): Node => {
  const defaults = {
    type: initialProps.type,
    id: initialProps.id || nanoid(),
    x: initialProps.x || 20,
    y: initialProps.y || runningY,
  }

  let props
  switch (initialProps.type) {
    case 'add':
      props = add(initialProps)
      break
    case 'number':
      props = number(initialProps)
      break
    default:
      console.warn(`Node type of '${initialProps.type}' not recognized.`)
  }

  const height = calcNodeHeight(props.inputs, props.outputs)
  if (!initialProps.y) runningY += height + 2

  return { ...defaults, ...props, height }
}

export const generateSockets = (defaults, initialValues?: ISocket[]) =>
  defaults.map((defaultValue, i) => ({
    id: nanoid(),
    value: initialValues && initialValues?.length > i ? initialValues[i] : defaultValue,
  }))

export const calcNodeHeight = (inputs: ISocket[], outputs: ISocket[]): number => {
  return 26 + Math.max(inputs.length, outputs.length) * 14
}
