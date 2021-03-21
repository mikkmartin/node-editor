import NodeEditor from 'components/NodeEditor'

export default function Home() {
  const elements = [
    { type: 'number', id: '1', inputs: [5] },
    { type: 'number', id: '2' },
    { type: 'add', id: '3', inputs: [0, 0, 2] },
    { type: 'number' },
    { type: 'add' },
    { source: '1', target: '3' },
    { source: '2', target: '3' },
  ]
  return (
    <>
      <h3>My page</h3>
      <NodeEditor elements={elements} />
    </>
  )
}
