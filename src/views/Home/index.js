import React from 'react'
import styled from 'styled-components'

import Builder from './components/Builder'

export default () => (
   <React.Fragment>
      <div className="container">
         <div className="section padded">
            <Header>Netlify Config Builder</Header>
            <SubHeader>Stop messing around with YML</SubHeader>
         </div>
      </div>
      <Builder />
   </React.Fragment>
)

const Header = styled.h1`
   font-size: 32px;
`

const SubHeader = styled.h2`
   font-size: 16px;
`
