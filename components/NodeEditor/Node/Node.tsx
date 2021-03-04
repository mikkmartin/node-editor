import { motion } from 'framer-motion'

export const Node = () => {
  return (
    <motion.g drag>
      <rect x="20" y="20" width="100" height="50" />
    </motion.g>
  )
}
