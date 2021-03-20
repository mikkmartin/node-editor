import { createContext, FC, useContext } from 'react'
import { useStore } from '../EditorProvider'
import { INode } from './Node'

interface Props extends INode {
  setInput: (action: { socketId: string; value: any }) => void
}

//@ts-ignore
const Context = createContext<Props>()

export const NodeProvider: FC<{ id: string }> = ({ children, id }) => {
  const { nodes, setNode, setInput } = useStore()
  const node = nodes.find(node => node.id === id)
  if (!node) throw new Error('Node not found.')

  return (
    <Context.Provider
      value={{
        ...node,
        setInput: ({ socketId, value }) =>
          setNode({
            ...node,
            inputs: node.inputs.map(input => (input.id === socketId ? { ...input, value } : input)),
          }),
      }}>
      {children}
    </Context.Provider>
  )
}

export const useNode = () => useContext(Context)
