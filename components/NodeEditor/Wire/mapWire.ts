import { NodeType } from '../Node'
import { WireType } from './index'
import { nanoid } from 'nanoid'

type InitialWire = {
  id?: string
  source: string
  target: string
}

let pluggedInputs: string[] = []
export const initiateWire = (
  total: WireType[],
  wire: InitialWire,
  nodes: NodeType[]
): WireType[] => {
  let source: string | undefined
  let target: string | undefined

  nodes.every(node => {
    //TODO enable specific socket ID checking
    if (node.id === wire.source) source = node.outputs[0].id
    if (node.id === wire.target) {
      const allPlugged = node.inputs.every(input => {
        if (pluggedInputs.includes(input.id)) {
          //this one is allready plugged
          return true
        } else {
          //if not plugged, assign to plug
          target = input.id
          pluggedInputs.push(target)
          return false
        }
      })
      if (allPlugged) console.warn('All inputs allready plugged, should expand and plug.')
      //TODO if every input is plugged – expand plugs
    }
    //Exit and return if source and target are found
    return !(source && target)
  })

  if (source && target) {
    return [
      ...total,
      {
        id: wire.id ? wire.id : nanoid(),
        source,
        target,
      },
    ]
  }
  return total
}
