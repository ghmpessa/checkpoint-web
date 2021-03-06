export type AccountModel = {
  name: string
  userId: string
  accessToken: string
}

export type ProfileModel = {
  id?: string
  username?: string
  name?: string
  email?: string
  avatarPath?: string | null
  createdAt?: string
  updatedAt?: string
  twitch?: string
  steam?: string
  level?: number
}

export type ProfileShortModel = {
  id?: string
  username?: string
  name?: string
}
