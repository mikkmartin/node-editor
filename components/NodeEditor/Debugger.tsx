import { Observer } from 'mobx-react-lite'
import { useStore } from './EditorProvider'

export const Debugger = () => {
  const store = useStore()

  return (
    <Observer>
      {() => {
        return (
          <foreignObject x="80%" y="20" width="160" height="100">
            <pre style={{ color: 'white' }}>{JSON.stringify(store.drag, null, 2)}</pre>
          </foreignObject>
        )
      }}
    </Observer>
  )
}
