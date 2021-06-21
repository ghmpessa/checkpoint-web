import { ProfileModel } from '../models'

export interface LoadAccount {
  load: () => Promise<ProfileModel>
}
