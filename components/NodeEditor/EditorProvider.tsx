import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import { NodeType } from './Node'
import { PanInfo } from 'framer-motion'

interface IStore {
  nodes: NodeType[]
  drag: {
    x: number
    y: number
    dragging: boolean
  }
  handlePanStart: (ev, info: PanInfo) => void
  handlePan: (ev, info: PanInfo) => void
  handlePanEnd: (ev, info: PanInfo) => void
  toggle: (id: string) => void
}

//@ts-ignore
const Context = createContext<IStore>()

export const EditorProvider = ({ children, initialNodes }) => {
  const store = useLocalObservable(
    (): IStore => ({
      nodes: initialNodes,
      drag: {
        x: 0,
        y: 0,
        dragging: false,
      },
      handlePanStart(_, info) {
        store.drag.dragging = true
        store.drag.x = info.offset.x
        store.drag.y = info.offset.y
      },
      handlePan(_, info) {
        store.drag.x = info.offset.x
        store.drag.y = info.offset.y
      },
      handlePanEnd() {
        store.drag.dragging = false
        store.drag.x = 0
        store.drag.y = 0
      },
      toggle(id) {
        store.nodes.find((n, i) => {
          if (n.id === id) n.selected = !n.selected
          return n.id === id
        })
      },
    })
  )
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const useStore = () => useContext(Context)
