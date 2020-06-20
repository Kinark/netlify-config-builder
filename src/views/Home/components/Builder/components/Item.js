import React from 'react'
import styled from 'styled-components'

import deleteIcon from '~/images/widgets/cross.svg'

import IconInfoWrapper from '~/components/IconInfoWrapper'
import FieldTitle from '~/components/FieldTitle'
import FieldSubtitle from '~/components/FieldSubtitle'

const Item = ({ onClick, title, subtitle, onDelete, icon, ...rest }) => (
   <StyledIconInfoWrapper onClick={onClick} {...rest}>
      <IconTitle>
         {!!icon && <img src={icon} alt="" />}
         <div>
            <FieldTitle>{title}</FieldTitle>
            <FieldSubtitle>{subtitle}</FieldSubtitle>
         </div>
      </IconTitle>
      <DeleteBtn onClick={onDelete}>
         <img src={deleteIcon} alt="" />
      </DeleteBtn>
   </StyledIconInfoWrapper>
)

export default Item

const IconTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledIconInfoWrapper = styled(IconInfoWrapper)`
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
   border-radius: 50%;
   background-color: rgba(0, 0, 0, 0);
   transition: 300ms background-color ease-out;
   height: 40px;
   width: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
   &:hover {
      background-color: ${({ nonHoverable }) => (nonHoverable ? 'none' : 'rgba(0, 0, 0, 0.1)')};
   }
   img {
      margin: 0;
   }
`
