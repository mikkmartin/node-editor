import { Canvas } from './Canvas'
import { EditorProvider } from './EditorProvider'

export const NodeEditor = ({ initialNodes }) => {
  let runningY = 20

  return (
    <EditorProvider
      initialNodes={initialNodes.map(props => {
        runningY += 60
        return {
          id: Math.random() + '',
          x: 20,
          width: 100,
          height: 50,
          y: runningY,
          type: 'number',
          ...props,
        }
      })}>
      <Canvas />
    </EditorProvider>
  )
}
