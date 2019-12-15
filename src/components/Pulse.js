import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const Pulse = ({ children }) => {
   const [isPulsing, setIsPulsing] = useState(false)
   let timer

   useEffect(() => {
      timer = setTimeout(() => setIsPulsing(false), 1000)
      return () => clearTimeout(timer)
   }, [isPulsing])

   const triggerPulse = () => {
      clearTimeout(timer)
      setIsPulsing(!isPulsing)
   }
   return <PulseWrapper isPulsing={isPulsing}>{children(triggerPulse)}</PulseWrapper>
}

export default Pulse

const pulseKF = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(106, 119, 162, 0.4);
  }
  70% {
      box-shadow: 0 0 0 10px rgba(106, 119, 162, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(106, 119, 162, 0);
  }
`

const PulseWrapper = styled.span`
   & > * {
      animation: ${({ isPulsing }) => (isPulsing ? css`1s ${pulseKF} ease-out` : 'none')} !important;
   }
`
