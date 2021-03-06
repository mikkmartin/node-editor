import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useStore } from './EditorProvider'
import { Node } from './Node'
import { DragWire, ConnectedWire } from './Wire'
import { FilterDefs } from './FilterDefs'
import { Selector } from './Selector'
import { observer } from 'mobx-react-lite'
import { AnimatePresence } from 'framer-motion'

type Props = {
  onClick?: (ev) => void
  onDoubleClick?: (ev) => void
}
export const Canvas = observer<Props>(({ onClick, onDoubleClick }) => {
  const {
    handlePan,
    handlePanEnd,
    handlePanStart,
    handleTap,
    handleTapCancel,
    nodes,
    wires,
  } = useStore()

  return (
    <Container
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      onTap={handleTap}
      onTapCancel={handleTapCancel}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      width="100vw"
      height="100vh">
      <AnimatePresence initial={false}>
        {nodes.map(props => (
          <Node key={props.id} {...props} />
        ))}
      </AnimatePresence>
      {wires.map(props => (
        <ConnectedWire key={props.id} {...props} />
      ))}
      <DragWire />
      <FilterDefs />
      <Selector />
    </Container>
  )
})

const Container = styled(motion.svg)`
  --highlight: orange;
  display: block;
  background: #353535;
  width: 100%;
  min-height: 300px;
  user-select: none;
`
