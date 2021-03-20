import { createContext, FC, useContext } from 'react'
import { useStore } from '../EditorProvider'
import { INode } from './Node'

interface Props extends INode {
  setInput: (action: {id: string, value: any}) => void
}

//@ts-ignore
const Context = createContext<Props>()

export const NodeProvider: FC<{ id: string }> = ({ children, id }) => {
  const { getNode, setInput } = useStore()
  const node = getNode(id)
  if (!node) throw new Error('Node not found.')

  return (
    <Context.Provider
      value={{
        ...node,
        setInput: ({id, value}) => setInput({nodeId: node.id, socketId: id, value}),
      }}>
      {children}
    </Context.Provider>
  )
}

export const useNode = () => useContext(Context)
