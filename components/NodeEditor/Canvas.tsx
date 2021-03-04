import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useStore } from './EditorProvider'
import { Node } from './Node'
import { Debugger } from './Debugger'

export const Canvas = () => {
  const { nodes, handlePan, handlePanEnd, handlePanStart } = useStore()

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
