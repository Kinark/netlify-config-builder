import styled from 'styled-components'

const Button = styled.button`
   border-radius: 5px;
   padding: 7px 15px;
   font-size: 14px;
   font-family: inherit;
   background-color: #6a76a2;
   color: white;
   margin: 5px;
   opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
   pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
   cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
   transition: background-color 300ms ease-out, opacity  300ms ease-out;
   &:hover {
      background-color: ${({ disabled }) => (disabled ? '#6a76a2' : '#5b6690')};;
   }
`

export default Button
