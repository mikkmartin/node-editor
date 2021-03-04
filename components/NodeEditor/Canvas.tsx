import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Canvas = ({ children }) => {
  return (
    <Container width="100vw" height="100vh">
      {children}
    </Container>
  )
}

const Container = styled(motion.svg)`
  background: yellow;
  width: 100vw;
  height: 100vh;
`