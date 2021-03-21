import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useStore } from './EditorProvider'
import { Node } from './Node'
import { Wire } from './Wire'
import { Debugger } from './Debugger'
import { FilterDefs } from './FilterDefs'
import { Selector } from './Selector'
import { Observer } from 'mobx-react-lite'

export const Canvas = () => {
  const store = useStore()

  return (
    <Observer
      render={() => {
        const {
          nodes,
          wires,
          handlePan,
          handlePanEnd,
          handlePanStart,
          handleTap,
          handleTapCancel,
        } = store
        return (
          <Container
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            onTap={handleTap}
            onTapCancel={handleTapCancel}
            width="100vw"
            height="100vh">
            {nodes.map(props => (
              <Node key={props.id} {...props} />
            ))}
            {wires.map(props => (
              <Wire key={props.id} {...props} />
            ))}
            <Debugger />
            <FilterDefs />
            <Selector />
          </Container>
        )
      }}
    />
  )
}

const Container = styled(motion.svg)`
  --highlight: orange;
  display: block;
  background: #353535;
  width: 100%;
  min-height: 300px;
  text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 10px;
    fill: white;
    text-align: center;
    user-select: none;
  }
`
