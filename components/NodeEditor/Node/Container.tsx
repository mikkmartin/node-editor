import { FC } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../EditorProvider'
import { useNode } from './NodeProvider'
import { observer } from 'mobx-react-lite'
import { bouncy, snappy } from 'utils/transitions'

export const Container: FC = observer(({ children }) => {
  const { deselectAll, drag, select, deselect, handlePan, handlePanEnd } = useStore()
  let { id, selected, x, y } = useNode()

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

  if (selected && !drag.box) {
    x += drag.x
    y += drag.y
  }

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { ...bouncy, velocity: 20 },
      }}
      transition={{ ...snappy, opacity: { duration: 0.1 } }}
      exit={{ scale: 0.7, opacity: 0 }}
      onTapStart={ev => handleTapStart(ev, id, selected)}
      onPan={(ev, info) => handlePan(ev, info, true)}
      onPanEnd={handlePanEnd}
      style={{ x, y }}>
      {children}
    </motion.g>
  )
})
