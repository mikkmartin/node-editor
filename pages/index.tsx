import NodeEditor from 'components/NodeEditor'

export default function Home() {
  const elements = [
    { type: 'number', id: '1', inputs: [5] },
    { type: 'number' },
    { type: 'add', id: '3', inputs: [10, 5, 2] },
    { type: 'number' },
    { type: 'add' },
    { source: '1', target: '3' },
  ]
  return (
    <>
      <h3>My page</h3>
      <NodeEditor elements={elements} />
    </>
  )
}
