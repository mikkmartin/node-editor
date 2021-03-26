import NodeEditor, { EditorInstance } from 'components/NodeEditor'
import styled from 'styled-components'
import { calculateOutputs } from 'utils/calculateOutputs'
import { JSONInput } from 'components/JSONInput'
import { JSONOutput } from 'components/JSONOutput'
import { useRef } from 'react'

export default function Home() {
  const instance = useRef<EditorInstance>()
  const handleUpdate = (nodes, wires) => {
    //console.log({ nodes, wires })
    calculateOutputs(nodes, wires)
    const outPutNodes = nodes
      .filter(node => node.type === 'output')
      .map(({ type, outputs }) => ({ name: type, value: outputs[0].value }))
    //console.log(outPutNodes)
  }

  const handleJsonUpdate = (...args) => {
    //console.log(args)
  }

  const handleDoubleClick = ev => {
    if (!instance.current) return
    const { clientX, clientY } = ev
    const { x: offsetX, y: offsetY } = ev.target.getBoundingClientRect()
    const x = Math.round(clientX - offsetX)
    const y = Math.round(clientY - offsetY)

    instance.current.addNode({ type: 'number', x, y })
  }

  return (
    <Container>
      <JSONInput onUpdate={handleJsonUpdate} initialInputs={inputs} />
      <NodeEditor
        onLoad={editor => (instance.current = editor)}
        onUpdate={handleUpdate}
        elements={initialElements}
        onDoubleClick={handleDoubleClick}
      />
      <JSONOutput />
    </Container>
  )
}

const inputs = { someVal: 20 }
const inputNodes = Object.entries(inputs).map(([name, input], id) => ({
  type: 'input',
  id,
  inputs: [input],
}))

const initialElements = [
  { type: 'number', id: '1', inputs: [5] },
  { type: 'number', id: '2' },
  ...inputNodes,
  { type: 'add', x: 100, y: 20, id: '3', inputs: [0, 0, 2] },
  { type: 'add', x: 200, y: 20, id: '4' },
  { type: 'number', x: 300, y: 20, id: '5' },
  { type: 'output', x: 380, y: 20, id: '6', inputs: [1] },
  { type: 'output', x: 380, y: 62, id: '7' },
  { source: '1', target: '3' },
  { source: '2', target: '3' },
  { source: '3', target: '4' },
  { source: '4', target: '5' },
  { source: '5', target: '7' },
]

const Container = styled.div`
  display: flex;
  background: #222;
  color: white;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`
