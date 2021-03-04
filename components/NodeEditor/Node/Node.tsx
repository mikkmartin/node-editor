import { motion } from 'framer-motion'

export interface INode {
  id: string
  type: 'number' | 'add'
  x: number
  y: number
  inputs: any[]
}

export const Node = ({ type, x, y, inputs }: INode) => {
  return (
    <motion.g drag style={{ x, y }}>
      <rect fill="white" width="100" height="50" />
      <text>{type}</text>
    </motion.g>
  )
}
