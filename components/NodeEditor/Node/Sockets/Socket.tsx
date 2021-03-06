import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { NodeType } from '../Node'

export interface SocketProps {
  width: number
  nth: number
  value: any
  type: 'input' | 'output'
  nodeType: NodeType
}

export const Socket = ({ value, nth, type, width, nodeType }: SocketProps) => {
  const [editing, setEditing] = useState(false)
  const y = 23 + nth * 14
  const isInput = type === 'input'
  const x = isInput ? 0 : width - 15
  const hideInput = nodeType === 'number' && !isInput

  const inputX = isInput ? 14 : -30

  const handleEdit = () => {
    setEditing(true)
  }

  return (
    <Container style={{ x, y }}>
      <motion.rect fill="rgba(0,0,0,0)" width="14" height="14" />
      <circle cx={isInput ? 6 : 9} cy="6" r="2" fill="gray" />
      <motion.circle
        strokeWidth="2"
        stroke="transparent"
        style={{ fill: 'transparent' }}
        cx="6"
        cy="6"
        r="5"
        fill="none"
      />
      {!hideInput && (
        <Input
          value={value}
          x={inputX}
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

const Input = ({ value, disabled, x, textAlign }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTap = ev => {
    ev.preventDefault()
    ev.stopPropagation()
    setEditing(true)
  }

  useEffect(() => {
    if (inputRef.current && editing) {
      console.log(inputRef.current)
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
      x={x}
      y="-1">
      <input
        style={{ textAlign }}
        ref={inputRef}
        type="text"
        disabled={disabled || !editing}
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
