import NodeEditor from 'components/NodeEditor'

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
  return (
    <>
      <h3>My page</h3>
      <NodeEditor elements={elements} />
    </>
  )
}
