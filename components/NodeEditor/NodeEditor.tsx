import { FC, useMemo } from 'react'
import { Canvas } from './Canvas'
import { EditorProvider, EditorInstance } from './EditorProvider'
import { getNodeProps } from './Node/nodeTypes'
import { initiateWire } from './Wire/mapWire'

interface INodeEditor {
  elements: any
  onUpdate: (nodes, wires) => void
  onClick?: (ev) => void
  onDoubleClick?: (ev) => void
  onLoad?: (instance: EditorInstance) => void
}

export const NodeEditor: FC<INodeEditor> = ({ elements, onLoad, onUpdate, ...rest }) => {
  return useMemo(
    () => (
      <EditorProvider {...getInitialElements(elements)} onLoad={onLoad} onUpdate={onUpdate}>
        <Canvas {...rest} />
      </EditorProvider>
    ),
    []
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
