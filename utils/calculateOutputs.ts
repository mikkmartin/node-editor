import { compute as add } from '../components/NodeEditor/Node/nodeTypes/add'
import { compute as number } from '../components/NodeEditor/Node/nodeTypes/number'
import { compute as output } from '../components/NodeEditor/Node/nodeTypes/output'
import { NodeType } from '../components/NodeEditor/Node/nodeTypes'
import { NodeType as INode } from '../components/NodeEditor/Node'
import { WireType as IWire } from '../components/NodeEditor/Wire'

const getCalc = (type: NodeType) => {
  switch (type) {
    case 'add':
      return add
    case 'number':
      return number
    case 'output':
      return output
    default:
      throw Error(`Calculation for type: "${type}" not found.`)
  }
}

const getCalculations = (types: NodeType[]): { type: string; calc: Function }[] => {
  const uniqueTypes = types.reduce<NodeType[]>(
    (uniques, type) => (!uniques.includes(type) ? [...uniques, type] : uniques),
    []
  )
  return uniqueTypes.map(type => ({ type, calc: getCalc(type) }))
}

export const calculateOutputs = (nodes: INode[], wires: IWire[]) => {
  const calculations = getCalculations(nodes.map(node => node.type))
  console.log(calculations, wires)
}
