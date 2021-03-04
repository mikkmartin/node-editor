import { motion } from 'framer-motion'
import { Observer } from 'mobx-react'
import { useStore } from '../EditorProvider'
import styled from 'styled-components'

export interface INode {
  id: string
  type: 'number' | 'add'
  x: number
  y: number
  inputs: any[]
  selected?: boolean
}

export const Node = ({ id, type, x, y, inputs }: INode) => {
  const { drag, toggle, nodes } = useStore()

  const handleTap = () => {
    toggle(id)
  }

  return (
    <Observer
      render={() => {
        const node = nodes.find(n => n.id === id) as INode
        const { selected } = node
        return (
          <Container
            onTap={handleTap}
            style={{ x: selected ? x + drag.x : x, y: selected ? y + drag.y : y }}>
            <rect width="100" height="50" style={{ fill: selected ? 'orange' : 'white' }} />
            <text x="5" y="15">{type}</text>
          </Container>
        )
      }}></Observer>
  )
}

const Container = styled(motion.g)`
`
