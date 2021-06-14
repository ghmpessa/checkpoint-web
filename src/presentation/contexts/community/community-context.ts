import { createContext } from 'react'

type Props = {
  open?: boolean
  setOpen?: (open: boolean) => void
}

export default createContext<Props>(null)
