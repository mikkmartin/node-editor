import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const JSONInput = () => {
  const initial = { someVal: 12 }
  const [text, setText] = useState(JSON.stringify(initial, null, 2))
  const [json, setJson] = useState(initial)

  useEffect(() => {
    console.log(text)
  }, [text])

  return (
    <Container>
      <pre>Inputs</pre>
      <textarea value={JSON.stringify(json, null, 2)} onChange={ev => setText(ev.target.value)} />
    </Container>
  )
}

const Container = styled.div`
  width: 30vw;
  position: relative;
  pre {
    position: absolute;
    top: 0;
    right: 0;
    background: #66b62e;
    color: white;
    padding: 2px 4px;
    font-size: 10px;
  }
  textarea {
    padding: 1rem;
    background: none;
    color: inherit;
    resize: none;
    font-size: 12px;
    color: gray;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    &:hover {
      color: rgba(180, 180, 180, 1);
    }
    &:focus {
      color: white;
    }
  }
`
