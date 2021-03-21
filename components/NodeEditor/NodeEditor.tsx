import { Canvas } from './Canvas'
import { EditorProvider } from './EditorProvider'
import { getNodeProps } from './Node/nodeTypes'
import { initiateWire } from './Wire/mapWire'

export const NodeEditor = ({ elements }) => {
  return (
    <EditorProvider {...getInitialElements(elements)}>
      <Canvas />
    </EditorProvider>
  )
}

const getInitialElements = (elements): { nodes: any; wires: any } => {
  const nodes = elements.filter(el => isNode(el)).map(getNodeProps)
  const wires = elements
    .filter(el => isWire(el))
    .reduce((total, wire) => initiateWire(total, wire, nodes), [])
  return {
    nodes,
    wires,
  }
}

const isNode = el => el.type !== undefined
const isWire = el => el.source !== undefined
