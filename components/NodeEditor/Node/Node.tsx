import { motion } from 'framer-motion'
import { Observer } from 'mobx-react'
import { useStore } from '../EditorProvider'
import { Label } from './Label'
import styled from 'styled-components'

export interface INode {
  id: string
  type: 'number' | 'add'
  x: number
  y: number
  width: number
  height: number
  outputs: any[]
  inputs: any[]
  selected?: boolean
}

export const Node = ({ id, type, inputs }: INode) => {
  const { drag, select, deselect, deselectAll, nodes, handlePan, handlePanEnd } = useStore()

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
        const node = nodes.find(n => n.id === id) as INode
        const { selected } = node
        const x = selected ? node.x + drag.x : node.x
        const y = selected ? node.y + drag.y : node.y
        return (
          <Container
            onTapStart={ev => handleTapStart(ev, id, selected)}
            onPan={(ev, info) => handlePan(ev, info, true)}
            onPanEnd={handlePanEnd}
            style={{ x, y }}>
            <Background {...node} />
            <Label {...node} />
          </Container>
        )
      }}></Observer>
  )
}

const Background = ({ selected = false, width, height }) => {
  return (
    <rect
      filter="url(#shadow)"
      width={width}
      height={height}
      stroke={selected ? 'var(--highlight)' : 'none'}
      rx={8}
    />
  )
}

const Container = styled(motion.g)`
  fill: #4c4c4c;
`
