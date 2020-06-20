import styled from 'styled-components'

const IconInfoWrapper = styled.div`
   align-items: ${({ bigInfo }) => (bigInfo ? 'flex-start' : 'center')};
   display: flex;
   margin-bottom: ${({ noMargin }) => (noMargin ? '0' : '2px')};
   border-radius: 10px;
   cursor: ${({ nonHoverable }) => (nonHoverable ? 'unset' : 'pointer')};
   padding: 10px;
   background-color: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)')};
   transition: 300ms background-color ease-out;
   img {
      margin-top: ${({ bigInfo }) => (bigInfo ? '3px' : '0')};
      margin-right: 10px;
   }
   &:hover {
      background-color: ${({ nonHoverable }) => (nonHoverable ? 'none' : 'rgba(0, 0, 0, 0.1)')};
   }
   position: relative;
`

export default IconInfoWrapper
