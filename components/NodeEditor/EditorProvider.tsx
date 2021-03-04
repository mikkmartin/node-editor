import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import { NodeType } from './Node'

interface IStore {
  nodes: NodeType[]
}

//@ts-ignore
const Context = createContext<IStore>()

export const EditorProvider = ({ children, initialNodes }) => {
  const store = useLocalObservable(() => ({
    nodes: initialNodes,
  }))
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const useStore = () => useContext(Context)
