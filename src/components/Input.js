import React from 'react'
import styled from 'styled-components'

const Input = ({ name, children, placeholder, ...rest }) => (
   <Label htmlFor={name}>
      <ActualInput name={name} id={name} placeholder={placeholder || 'Type here'} {...rest} />
      <span>{children}</span>
   </Label>
)

export default Input

const Label = styled.label`
   span {
      display: block;
      font-size: 14px;
      opacity: 0.5;
      color: inherit;
      font-family: inherit;
      margin-bottom: 10px;
   }
`

const ActualInput = styled.input`
   display: block;
   font-size: 16px;
   border: none;
   color: inherit;
   opacity: 1;
   font-family: inherit;
`
