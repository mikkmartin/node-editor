import { Label } from './Label'
import Sockets from './Sockets'
import { NodeProvider } from './NodeProvider'
import { Background } from './Background'
import { Container } from './Container'
export type { NodeType } from './nodeTypes'

export const Node = ({ id }) => {
  return (
    <NodeProvider id={id}>
      <Container>
        <Background />
        <Label />
        <Sockets />
      </Container>
    </NodeProvider>
  )
}
