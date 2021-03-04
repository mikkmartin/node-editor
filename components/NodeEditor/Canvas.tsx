import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useStore } from './EditorProvider'
import { Node } from './Node'

export const Canvas = () => {
  const { nodes } = useStore()

  return (
    <Container width="100vw" height="100vh">
      {nodes.map(props => (
        <Node key={props.id} {...props} />
      ))}
    </Container>
  )
}

const Container = styled(motion.svg)`
  background: gray;
  width: 100vw;
  height: 100vh;
`
