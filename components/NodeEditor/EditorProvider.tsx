import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { NodeType } from './Node'
import { WireType } from './Wire'
import { PanInfo, TapInfo } from 'framer-motion'
import { Box2D, getBox } from './Selector'

type Point2D = { x: number; y: number }
export type SetInput = (action: { nodeId: string; socketId: string; value: any }) => void
interface IStore {
  nodes: NodeType[]
  wires: WireType[]
  drag: {
    x: number
    y: number
    panning: boolean
    dragging: boolean
    box: null | Box2D
  }
  getWireProps: (id: string) => { source: Point2D; target: Point2D; active: boolean }
  updateDependancies: (id: string, value: any) => void
  removeWire: (id: string) => void
  getNode: (id: string) => NodeType
  setInput: SetInput
  handlePanStart: (ev, info: PanInfo) => void
  handlePan: (ev, info: PanInfo, isNode?: boolean) => void
  handlePanEnd: (ev, info: PanInfo) => void
  handleTap: (ev, info: TapInfo) => void
  handleTapCancel: (ev, info: TapInfo) => void
  select: (id: string) => void
  deselect: (id: string) => void
  updatePositions: () => void
  deselectAll: () => void
  setBox: (box: null | Box2D) => void
}

//@ts-ignore
const Context = createContext<IStore>()

export const EditorProvider = ({ children, nodes, wires }) => {
  const store = useLocalObservable(
    (): IStore => ({
      nodes,
      wires,
      drag: {
        x: 0,
        y: 0,
        dragging: false,
        panning: false,
        box: null,
      },
      getWireProps(id) {
        const wire = store.wires.find(w => w.id === id)
        if (!wire) throw new Error('Wire not dound.')
        const source = store.nodes.find(n => n.outputs.map(({ id }) => id).includes(wire.source))
        const target = store.nodes.find(n => n.inputs.map(({ id }) => id).includes(wire.target))
        if (!source || !target) throw new Error('Source/Target not found.')

        const sourceY = source.y + source.outputs.map(({ id }) => id).indexOf(wire.source) * 14 + 29
        const sourceX = source.x + source.width - 6

        const targetX = target.x + 6
        const targetY = target.y + target.inputs.map(({ id }) => id).indexOf(wire.target) * 14 + 29

        return {
          source: {
            x: source.selected && !store.drag.box ? sourceX + store.drag.x : sourceX,
            y: source.selected && !store.drag.box ? sourceY + store.drag.y : sourceY,
          },
          target: {
            x: target.selected && !store.drag.box ? targetX + store.drag.x : targetX,
            y: target.selected && !store.drag.box ? targetY + store.drag.y : targetY,
          },
          active: source.selected || target.selected,
        }
      },
      getNode(id) {
        const node = store.nodes.find(n => n.id === id)
        if (node) return node
        else throw new Error('Node not found.')
      },
      setInput({ nodeId, socketId, value }) {
        const node = store.nodes.find(node => node.id === nodeId)
        const socket = node?.inputs.find(input => input.id === socketId)
        if (node && socket) {
          socket.value = value
          //TODO don't update inputs for existing node
          store.updateDependancies(node.id, value)
          const connectedWire = store.wires.find(wire => wire.target === socket.id)
          if (connectedWire) store.removeWire(connectedWire.id)
        }
      },
      updateDependancies(id, value) {
        const node = store.nodes.find(node => node.id === id)
        if (!node) throw new Error('Node not found.')

        const outputWires: WireType[] = node.outputs.reduce((all, output) => {
          const connected = store.wires.find(({ source }) => source === output.id)
          if (connected) return [...all, connected]
          else return wires
        }, [])

        if (outputWires?.length) {
          const connectedNodes = outputWires.map(wire =>
            store.nodes.find(
              _node =>
                _node.inputs
                  .map(input => input.id)
                  .filter(id => {
                    const found = wire.target === id
                    if (found) {
                      const connectedNode = _node
                      //const index = connectedNode.inputs.map(input => input.id).indexOf(wire.target)
                      //connectedNode.inputs[index].value = value
                      const input = connectedNode.inputs.find(input => input.id === wire.target)
                      if (input) input.value = value
                      //if (originalNode) _node.inputs[index].value = originalNode.value
                      return true
                    }
                  }).length > 0
            )
          )
        }
      },
      removeWire(id) {
        store.wires = store.wires.filter(w => w.id !== id)
      },
      handlePanStart(ev, info) {
        if (!ev.shiftKey) store.deselectAll()
        store.drag.panning = true
        store.drag.dragging = true
        store.drag.x = info.offset.x
        store.drag.y = info.offset.y
      },
      handlePan(ev, info, isNode) {
        store.drag.x = info.offset.x
        store.drag.y = info.offset.y
        if (!isNode) {
          store.drag.box = getBox(ev, info, store.drag.box)
          if (store.drag.box !== null) {
            const intersectingNodes = store.nodes.filter(node =>
              isIntersecting(store.drag.box as Box2D, node)
            )
            store.nodes.map(n => (n.selected = intersectingNodes.includes(n)))
          }
        }
      },
      handlePanEnd() {
        if (!store.drag.box) store.updatePositions()
        store.drag.dragging = false
        store.drag.x = 0
        store.drag.y = 0
        store.drag.box = null
      },
      handleTap() {
        if (!store.drag.panning) store.deselectAll()
        store.drag.panning = false
      },
      handleTapCancel() {
        store.drag.panning = false
      },
      select(id) {
        store.nodes.find(n => {
          if (n.id === id) n.selected = true
          return n.id === id
        })
      },
      updatePositions() {
        store.nodes.forEach(n => {
          if (n.selected) {
            n.x = n.x + store.drag.x
            n.y = n.y + store.drag.y
          }
        })
      },
      deselect(id) {
        store.nodes.find(n => {
          if (n.id === id) n.selected = false
          return n.id === id
        })
      },
      deselectAll() {
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

const isIntersecting = (a: Box2D, b: Box2D) => {
  if (a.x >= b.x + b.width || b.x >= a.x + a.width) return false
  if (a.y >= b.y + b.height || b.y >= a.y + a.height) return false
  return true
}
