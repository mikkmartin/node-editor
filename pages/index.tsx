import NodeEditor from 'components/NodeEditor'

export default function Home() {
  const initialNodes = [
    { type: 'number', selected: true, inputs: [{ value: 10 }] },
    { type: 'number' },
    { type: 'add' },
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
