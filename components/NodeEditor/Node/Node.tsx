import { motion } from 'framer-motion'
import { Observer } from 'mobx-react-lite'
import { useStore } from '../EditorProvider'
import { Label } from './Label'
import Sockets from './Sockets'
import { Node as INode } from './nodeTypes'
import { NodeProvider } from './NodeProvider'
import { Background } from './Background'
export type { NodeType } from './nodeTypes'

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
            <motion.g
              onTapStart={ev => handleTapStart(ev, id, selected)}
              onPan={(ev, info) => handlePan(ev, info, true)}
              onPanEnd={handlePanEnd}
              style={{ x, y }}>
              <Background />
              <Label />
              <Sockets />
            </motion.g>
          </NodeProvider>
        )
      }}></Observer>
  )
}
