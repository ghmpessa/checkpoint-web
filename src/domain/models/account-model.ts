export type AccountModel = {
  accessToken: string
  name: string
  userId: string
}

export type ProfileModel = {
  id?: string
  username?: string
  name?: string
  email?: string
  avatarPath?: string | null
  createdAt?: string
  updatedAt?: string
}
