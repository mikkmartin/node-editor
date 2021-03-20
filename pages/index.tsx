import NodeEditor from 'components/NodeEditor'

export default function Home() {
  const initialNodes = [
    { type: 'number', inputs: [5] },
    { type: 'number' },
    { type: 'add', inputs: [10, 5, 2] },
    { type: 'number' },
    { type: 'add' },
  ]
  return (
    <>
      <h3>My page</h3>
      <NodeEditor initialNodes={initialNodes} />
    </>
  )
}
