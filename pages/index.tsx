import NodeEditor, { Node } from 'components/NodeEditor'

export default function Home() {
  return (
    <>
      <h3>My page</h3>
      <NodeEditor>
        <Node />
        <Node />
      </NodeEditor>
    </>
  )
}
