import { Observer } from 'mobx-react-lite'
import { useStore } from '../EditorProvider'
import { Wire } from './Wire'

export const DragWire = () => {
  const store = useStore()

  return (
    <Observer
      render={() => {
        if (!store.drawWire) return null
        return <Wire {...store.drawWire} active />
      }}
    />
  )
}
