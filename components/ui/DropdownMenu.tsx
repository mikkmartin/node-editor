import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

export const DropdownMenu = ({ children, open, onClose, pos }) => {
  return (
    <StyledPopover
      id="hello"
      anchorPosition={{ top: pos.top, left: pos.left }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={open}
      onBackdropClick={onClose}
      anchorReference="anchorPosition"
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}>
      {children}
    </StyledPopover>
  )
}

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    border: 1px solid rgba(255, 255, 255, 0.05);
    //box-shadow: none;
    font-family: inherit;
    color: white;
    font-size: 10px;
    min-width: 100px;
    background: #43454b;
    padding: 4px 0;
    p {
      padding: 2px 8px;
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
`
