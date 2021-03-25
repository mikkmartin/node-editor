import { NodeType } from './Node'
import { WireType } from './Wire'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useStore } from './EditorProvider'
import { Node } from './Node'
import { DragWire, ConnectedWire } from './Wire'
import { Debugger } from './Debugger'
import { FilterDefs } from './FilterDefs'
import { Selector } from './Selector'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

type Props = {
  onUpdate: (nodes: NodeType[], wires: WireType[]) => void
}
export const Canvas = observer<Props>(({ onUpdate }) => {
  const {
    handlePan,
    handlePanEnd,
    handlePanStart,
    handleTap,
    handleTapCancel,
    nodes,
    wires,
  } = useStore()

  useEffect(() => {
    onUpdate(nodes, wires)
  }, [nodes.length, wires.length])

  return (
    <Container
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      onTap={handleTap}
      onTapCancel={handleTapCancel}
      width="100vw"
      height="100vh">
      {nodes.map(props => (
        <Node key={props.id} {...props} />
      ))}
      {wires.map(props => (
        <ConnectedWire key={props.id} {...props} />
      ))}
      <DragWire />
      <Debugger />
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
  text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 10px;
    fill: white;
    text-align: center;
  }
`
