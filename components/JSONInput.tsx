import { useEffect, useState, FC } from 'react'
import styled from 'styled-components'

type Props = {
  val?: { [key: string]: any }
}
export const JSONInput: FC<Props> = ({ val = { someVal: 12 } }) => {
  const [text, setText] = useState(JSON.stringify(val, null, 2))
  const [json, setJson] = useState(val)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const _json = JSON.parse(text)
      console.log(_json)
      setJson(_json)
      setError('')
    } catch (e) {
      setError(e)
    }
  }, [text])

  return (
    <Container error={error}>
      <pre>Inputs</pre>
      <textarea value={text} onChange={ev => setText(ev.target.value)} />
    </Container>
  )
}

const Container = styled.div<{ error: any }>`
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
    outline-width: 1px;
    outline-style: solid;
    outline-offset: -1px;
    outline-color: ${p => (Boolean(p.error) ? 'red' : 'transparent')};
    &:hover {
      color: rgba(180, 180, 180, 1);
    }
    &:focus {
      outline-color: ${p => (Boolean(p.error) ? 'red' : '#66b62e')};
      color: white;
    }
  }
`
