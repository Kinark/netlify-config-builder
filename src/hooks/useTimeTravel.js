import { useState } from 'react'

const useTimeTravel = (initialState) => {
   const [past, setPast] = useState([])
   const [present, setPresent] = useState(initialState)
   const [future, setFuture] = useState([])

   const undo = () => {
      if (!past.length) return
      const copyFuture = [...future]
      copyFuture.unshift(present)
      setFuture(copyFuture)
      setPresent(past[0])
      const copyPast = [...past]
      copyPast.shift()
      setPast(copyPast)
   }

   const redo = () => {
      if (!future.length) return
      const copyPast = [...past]
      copyPast.unshift(present)
      setPast(copyPast)
      setPresent(future[0])
      const copyFuture = [...future]
      copyFuture.shift()
      setFuture(copyFuture)
   }

   const setState = (state) => {
      const copyPast = [...past]
      copyPast.unshift(present)
      setPast(copyPast)
      setPresent(state)
      setFuture([])
   }

   return [present, setState, undo, redo, past, future, setPresent]
}

export default useTimeTravel
