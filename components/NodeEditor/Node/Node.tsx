import { motion } from 'framer-motion'
import { Observer } from 'mobx-react-lite'
import { useStore } from '../EditorProvider'
import { Label } from './Label'
import Sockets from './Sockets'
import styled from 'styled-components'
import { Node as PureNode } from './nodeTypes'
import { NodeProvider } from './NodeProvider'
import { Background } from './Background'
export type { NodeType } from './nodeTypes'

export interface INode extends PureNode {
  selected: boolean
}

export const Node = ({ id }: INode) => {
  const { drag, getNode, select, deselect, deselectAll, handlePan, handlePanEnd } = useStore()

  const handleTapStart = (ev, id, selected) => {
    ev.stopPropagation()
    const isShiftOrCommand = ev.metaKey || ev.shiftKey
    if (!selected && !isShiftOrCommand) {
      deselectAll()
      select(id)
    }
    if (isShiftOrCommand) {
      if (selected) deselect(id)
      else select(id)
    }
  }

  return (
    <Observer
      render={() => {
        const node = getNode(id)
        let { selected, x, y } = node
        if (selected && !drag.box) {
          x += drag.x
          y += drag.y
        }
        return (
          <NodeProvider id={id}>
            <Container
              onTapStart={ev => handleTapStart(ev, id, selected)}
              onPan={(ev, info) => handlePan(ev, info, true)}
              onPanEnd={handlePanEnd}
              style={{ x, y }}>
              <Background />
              <Label />
              <Sockets />
            </Container>
          </NodeProvider>
        )
      }}></Observer>
  )
}

const Container = styled(motion.g)`
  fill: #4c4c4c;
`
