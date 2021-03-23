import { Observer } from 'mobx-react-lite'
import { useStore } from './EditorProvider'

export const Debugger = () => {
  const store = useStore()

  return (
    <Observer>
      {() => {
        return (
          <foreignObject x="80%" y="20" width="160" height="200">
            <pre style={{ color: 'white' }}>
              {JSON.stringify({ wires: store.wires.length }, null, 2)}
            </pre>
          </foreignObject>
        )
      }}
    </Observer>
  )
}
