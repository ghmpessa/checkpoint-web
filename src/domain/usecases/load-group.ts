import { GroupModel } from '../models'

export interface LoadGroup {
  load: () => Promise<GroupModel>
}
