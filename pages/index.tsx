import NodeEditor, { EditorInstance } from 'components/NodeEditor'
import styled from 'styled-components'
import { calculateOutputs } from 'utils/calculateOutputs'
import { JSONInput } from 'components/JSONInput'
import { JSONOutput } from 'components/JSONOutput'
import { useRef, useState } from 'react'
import { DropdownMenu } from 'components/ui/DropdownMenu'

type NewNodePos = null | {
  top: number
  left: number
  x: number
  y: number
}

export default function Home() {
  const [json, setJson] = useState(inputs)
  const [newNodePos, setNewNodePos] = useState<NewNodePos>(null)
  const instance = useRef<EditorInstance>()

  const handleUpdate = (nodes, wires) => {
    calculateOutputs(nodes, wires)
    /*
    const outPutNodes = nodes
      .filter(node => node.type === 'output')
      .map(({ type, outputs }) => ({ name: type, value: outputs[0].value }))
      */
    //console.log(outPutNodes)
  }

  const handleJsonUpdate = updatedJson => {
    setJson(updatedJson)
  }

  const handleDoubleClick = ev => {
    const { clientX, clientY } = ev
    const { x: offsetX, y: offsetY } = ev.target.getBoundingClientRect()
    const x = Math.round(clientX - offsetX)
    const y = Math.round(clientY - offsetY)
    setNewNodePos({ left: clientX, top: clientY, x, y })
  }

  const addNode = type => {
    if (!instance.current || !newNodePos) return
    const { x, y } = newNodePos
    instance.current.addNode({ type, x, y })
    setNewNodePos(null)
  }

  return (
    <Container>
      <JSONInput onUpdate={handleJsonUpdate} data={json} />
      <NodeEditor
        onLoad={editor => (instance.current = editor)}
        onUpdate={handleUpdate}
        elements={initialElements}
        onDoubleClick={handleDoubleClick}
      />
      <JSONOutput data={json} />
      <DropdownMenu
        open={Boolean(newNodePos)}
        onClose={() => setNewNodePos(null)}
        pos={
          Boolean(newNodePos)
            ? { top: newNodePos?.top, left: newNodePos?.left }
            : { top: 0, left: 0 }
        }>
        {['number', 'add', 'input', 'output'].map(v => (
          <p key={v} onClick={() => addNode(v)}>
            {v}
          </p>
        ))}
      </DropdownMenu>
    </Container>
  )
}

const inputs = { someVal: 20, someOtherValue: 30 }
const inputNodes = Object.entries(inputs).map(([name, input]) => ({
  type: 'input',
  id: name,
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
