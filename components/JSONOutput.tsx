import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  data?: { [key: string]: any }
}

export const JSONOutput: FC<Props> = ({ data }) => {
  return <Container>{JSON.stringify(data, null, 2)}</Container>
}

const Container = styled.pre`
  padding: 1rem;
  width: 30vw;
  color: gray;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    content: 'Outputs';
    background: #1890f1;
    color: white;
    font-size: 10px;
    padding: 2px 4px;
  }
`
