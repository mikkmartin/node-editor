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
  inputs: any[]
  selected?: boolean
}

export const Node = ({ id, type, x, y, inputs }: INode) => {
  const { drag, toggle, nodes } = useStore()

  return (
    <Observer
      render={() => {
        const node = nodes.find(n => n.id === id) as INode
        const { selected } = node
        return (
          <Container
            onTap={() => toggle(id)}
            style={{ x: selected ? x + drag.x : x, y: selected ? y + drag.y : y }}>
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
