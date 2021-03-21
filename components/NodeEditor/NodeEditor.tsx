import { Canvas } from './Canvas'
import { EditorProvider } from './EditorProvider'
import { getNodeProps } from './Node/nodeTypes'

export const NodeEditor = ({ elements }) => {
  const { nodes, wires } = getInitialElements(elements)
  return (
    <EditorProvider nodes={nodes} wires={wires}>
      <Canvas />
    </EditorProvider>
  )
}

const getInitialElements = (elements): { nodes: any; wires: any } => ({
  nodes: elements.filter(el => isNode(el)).map(getNodeProps),
  wires: elements.filter(el => isWire(el)).map(getNodeProps),
})

const isNode = el => el.type !== undefined
const isWire = el => el.source !== undefined
