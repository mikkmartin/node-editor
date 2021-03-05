import { Socket } from './Socket'

export const Sockets = ({ inputs, outputs, width }) => {
  return (
    <>
      {inputs.map((input, i) => (
        <Socket key={input.id} type="input" nth={i} value={input.value} width={width} />
      ))}
      {outputs.map((output, i) => (
        <Socket key={output.id} type="output" nth={i} value={output.value} width={width} />
      ))}
    </>
  )
}
