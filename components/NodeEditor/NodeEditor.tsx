import { Canvas } from './Canvas'
import { EditorProvider } from './EditorProvider'
import { getNodeProps } from './Node/nodeTypes'

export const NodeEditor = ({ initialNodes }) => {
  return (
    <EditorProvider
      initialNodes={initialNodes.map(getNodeProps)}>
      <Canvas />
    </EditorProvider>
  )
}
