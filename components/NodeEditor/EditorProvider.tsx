import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import { NodeType } from './Node'
import { PanInfo, TapInfo } from 'framer-motion'
import { Box2D, getBox } from './Selector'

interface IStore {
  nodes: NodeType[]
  drag: {
    x: number
    y: number
    dragging: boolean
    box: null | Box2D
  }
  handleTap: (ev, info: TapInfo) => void
  handlePanStart: (ev, info: PanInfo) => void
  handlePan: (ev, info: PanInfo) => void
  handlePanEnd: (ev, info: PanInfo) => void
  select: (id: string) => void
  deselect: (id: string) => void
  deselectAll: () => void
  setBox: (box: null | Box2D) => void
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
        box: null,
      },
      handleTap(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!store.drag.dragging) store.deselectAll()
      },
      handlePanStart(_, info) {
        store.drag.dragging = true
        store.drag.x = info.offset.x
        store.drag.y = info.offset.y
      },
      handlePan(ev, info) {
        store.drag.x = info.offset.x
        store.drag.y = info.offset.y
        store.drag.box = getBox(ev, info, store.drag.box)
      },
      handlePanEnd() {
        store.drag.dragging = false
        store.drag.x = 0
        store.drag.y = 0
        store.drag.box = null
      },
      select(id) {
        store.nodes.find(n => {
          if (n.id === id) n.selected = true
          return n.id === id
        })
      },
      deselect(id) {
        store.nodes.find(n => {
          if (n.id === id) n.selected = false
          return n.id === id
        })
      },
      deselectAll() {
        console.log('deselectAll()')
        store.nodes.forEach(n => {
          n.selected = false
        })
      },
      setBox(box: null | Box2D) {
        store.drag.box = box
      },
    })
  )
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const useStore = () => useContext(Context)
