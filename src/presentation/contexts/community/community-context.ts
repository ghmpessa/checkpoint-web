import { GroupModel } from '@/domain/models'
import { createContext } from 'react'

type Props = {
  open?: boolean
  setOpen?: (open: boolean) => void
  search?: string
  setSearch?: (search: string) => void
  groups?: GroupModel[]
  setGroups?: (groups: GroupModel[]) => void
  error?: string
  setError?: (error: string) => void
}

export default createContext<Props>(null)
