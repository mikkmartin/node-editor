import styled from 'styled-components'

export const JSONOutput = ({ json = { output: -1 } }) => {
  return <Container>{JSON.stringify(json, null, 2)}</Container>
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
    background: #1890F1;
    color: white;
    font-size: 10px;
    padding: 2px 4px;
  }
`
