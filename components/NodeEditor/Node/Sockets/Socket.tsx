import { motion, PanInfo } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { NodeType } from '../Node'
import { useNode } from '../NodeProvider'

export interface SocketProps {
  id: string
  width: number
  nth: number
  type: 'input' | 'output'
  nodeType: NodeType
  value: any
  source?: string | null
  connecting?: boolean
}

export const Socket = ({
  nth,
  type,
  width,
  nodeType,
  id,
  value,
  connecting = false,
  source,
}: SocketProps) => {
  const { handleWireStart, handleWireMove, handleWireEnd, setWireTarget, ...node } = useNode()
  const y = 22 + nth * 14
  const isInput = type === 'input'
  const x = isInput ? 0 : width - 15
  const hideInput = nodeType === 'number' && !isInput
  const circleX = isInput ? 6 : 9
  const circleY = 7

  const inputX = isInput ? 14 : -30

  const handleChange = ev => {
    if (!ev.target.value) return
    node.setInput({ id, value: parseInt(ev.target.value) })
  }

  const handlePanStart = () => {
    handleWireStart(id, node.x + x + circleX, node.y + y + circleY)
  }

  const handlePanDrag = (_, info: PanInfo) => {
    handleWireMove(node.x + x + info.offset.x + circleX, node.y + y + info.offset.y + circleY)
  }

  const handleHoverStart = () => {
    if (connecting && type === 'input' && source) setWireTarget(id)
  }

  const handleHoverEnd = () => {
    setWireTarget(null)
  }

  return (
    <Container style={{ x, y }} onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
      <motion.g
        whileHover="hover"
        onTapStart={ev => ev.stopPropagation()}
        onPanStart={handlePanStart}
        onPan={handlePanDrag}
        onPanEnd={() => handleWireEnd()}>
        <rect fill="rgba(0,0,0,0.0)" width="14" height="14" />
        <circle cx={circleX} cy={circleY} r="2" fill="gray" />
        <motion.circle
          variants={{ hover: { stroke: 'rgba(255,255,255,0.35)', transition: { duration: 0 } } }}
          transition={{ duration: 0.2 }}
          cx={circleX}
          cy={circleY}
          r="4.5"
          strokeWidth="2"
          fill="none"
          stroke="rgba(255,255,255,0)"
        />
      </motion.g>
      {!hideInput && (
        <Input
          x={inputX}
          value={value}
          onChange={handleChange}
          textAlign={isInput ? 'left' : 'right'}
          disabled={!isInput}
        />
      )}
    </Container>
  )
}

const Container = styled(motion.g)`
  text {
    opacity: 0.5;
    pointer-events: none;
  }
`

const Input = ({ disabled, x, textAlign, onChange, value }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTap = ev => {
    ev.preventDefault()
    ev.stopPropagation()
    setEditing(true)
  }

  useEffect(() => {
    if (inputRef.current && editing) {
      //console.log(inputRef.current)
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  return (
    <InputContainer
      onTap={handleTap}
      disabled={disabled}
      transition={{ duration: 0 }}
      variants={{
        default: { opacity: 0.1 },
        hover: { opacity: 1 },
      }}
      x={x}>
      <input
        style={{ textAlign }}
        ref={inputRef}
        type="text"
        disabled={disabled || !editing}
        onChange={onChange}
        value={value}
      />
    </InputContainer>
  )
}

const InputContainer = styled(motion.foreignObject)<any>`
  width: 30px;
  height: 14px;
  background: transparent;
  border-radius: 4px;
  input {
    position: absolute;
    top: -3px;
    letter-spacing: -0.5px;
    height: 18px;
    width: 30px;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    background: transparent;
    font-size: 9px;
    outline: none;
    margin: 0;
    font-family: inherit;
    padding-left: 3px;
    cursor: auto;
    pointer-events: none;
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
    ${p =>
      !p.disabled &&
      css`
        pointer-events: auto;
        z-index: 1;
        cursor: default;
        &:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}
    &:focus {
      opacity: 1;
      background: rgba(255, 255, 255, 1);
      color: black;
      cursor: unset;
    }
  }
`
