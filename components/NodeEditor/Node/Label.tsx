import styled from 'styled-components'

export const Label = ({ id, width, type }) => {
  return (
    <>
      <defs>
        <clipPath id={`round-corner-${id}`}>
          <rect width={width} height="30" rx="8" ry="8" />
        </clipPath>
      </defs>
      <rect
        fill="rgba(255,255,255,0.07)"
        clipPath={`url(#round-corner-${id})`}
        width={width}
        height="20"
      />
      <Text x={width / 2} y="14" textAnchor="middle" width={width}>
        {type}
      </Text>
    </>
  )
}

const Text = styled.text`
  font-weight: bold;
  text-transform: capitalize;
`
