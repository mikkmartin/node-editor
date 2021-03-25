import NodeEditor from 'components/NodeEditor'
import styled from 'styled-components'
import { calculateOutputs } from 'utils/calculateOutputs'

export default function Home() {
  const elements = [
    { type: 'number', id: '1', inputs: [5] },
    { type: 'number', id: '2' },
    { type: 'add', x: 160, y: 20, id: '3', inputs: [0, 0, 2] },
    { type: 'add', x: 270, y: 20, id: '4' },
    { type: 'number', x: 380, y: 20, id: '5' },
    { source: '1', target: '3' },
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
  ]

  const handleUpdate = (nodes, wires) => {
    calculateOutputs(nodes, wires)
    /*
    setCalculation(query => {
      return {
        query,
        nodes: nodes.length,
        wires: wires.length,
      }
    })
    */
  }

  return (
    <Container>
      <textarea defaultValue={JSON.stringify({}, null, 2)} />
      <NodeEditor onUpdate={handleUpdate} elements={elements} />
      <pre>{JSON.stringify({}, null, 2)}</pre>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  background: #222;
  color: white;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  textarea {
    width: 30vw;
    background: none;
    border: none;
    color: inherit;
    resize: none;
    font-size: 12px;
  }
  pre {
    width: 30vw;
  }
`
