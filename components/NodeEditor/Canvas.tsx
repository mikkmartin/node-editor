import { motion, PanInfo } from 'framer-motion'
import styled from 'styled-components'
import { useStore } from './EditorProvider'
import { Node } from './Node'
import { Debugger } from './Debugger'

export const Canvas = () => {
  const { nodes, drag } = useStore()

  const handlePanStart = (_, info: PanInfo) => {
    drag.dragging = true
    drag.x = info.offset.x
    drag.y = info.offset.y
  }

  const handlePan = (_, info: PanInfo) => {
    drag.x = info.offset.x
    drag.y = info.offset.y
  }

  const handlePanEnd = () => {
    drag.dragging = false
    drag.x = 0
    drag.y = 0
  }

  return (
    <Container
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      width="100vw"
      height="100vh">
      {nodes.map(props => (
        <Node key={props.id} {...props} />
      ))}
      <Debugger />
    </Container>
  )
}

const Container = styled(motion.svg)`
  background: gray;
  width: 100vw;
  height: 100vh;
`
