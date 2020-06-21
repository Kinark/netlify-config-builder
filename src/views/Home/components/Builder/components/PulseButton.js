import React from 'react'

import Pulse from '~/components/Pulse'
import Button from '~/components/Button'

const PulseButton = ({ onClick, children }) => (
   <Pulse>
      {(pulse) => (
         <Button
            onClick={() => {
               pulse()
               onClick()
            }}
         >
            {children}
         </Button>
      )}
   </Pulse>
)

export default PulseButton
