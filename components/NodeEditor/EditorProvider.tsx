import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import { NodeType } from './Node'

interface IStore {
  nodes: NodeType[]
  drag: {
    x: number
    y: number
    dragging: boolean
  }
}

//@ts-ignore
const Context = createContext<IStore>()

export const EditorProvider = ({ children, initialNodes }) => {
  const store = useLocalObservable(() => ({
    nodes: initialNodes,
    drag: {
      x: 0,
      y: 0,
      dragging: false,
    },
  }))
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const useStore = () => useContext(Context)
