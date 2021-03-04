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
  --highlight: orange;
  display: block;
  background: #353535;
  width: 100%;
  min-height: 300px;
  text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 10px;
    fill: white;
    text-align: center;
    user-select: none;
  }
`
