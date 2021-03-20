import { createContext, FC, useContext } from 'react'
import { INode } from './Node'

//@ts-ignore
const Context = createContext<INode>()

export const EditorProvider: FC<{ node: INode }> = ({ children, node }) => {
  return <Context.Provider value={node}>{children}</Context.Provider>
}

export const useNode = () => useContext(Context)
