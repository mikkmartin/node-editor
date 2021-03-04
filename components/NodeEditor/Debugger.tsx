import { useObserver } from 'mobx-react'
import { useStore } from './EditorProvider'

export const Debugger = () => {
  const store = useStore()

  return useObserver(() => {
    return (
      <foreignObject x="80%" y="20" width="160" height="100">
        <pre>{JSON.stringify(store.drag, null, 2)}</pre>
      </foreignObject>
    )
  })
}
