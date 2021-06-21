import React from 'react'
import { UserProfile } from '@/presentation/pages'
import { makeRemoteLoadAccount } from '../../usecases'
import { useParams } from 'react-router-dom'

export const makeUserProfile: React.FC = () => {
  type Props = {
    id: string
  }
  const { id } = useParams<Props>()
  return (
    <UserProfile
      loadAccount={makeRemoteLoadAccount(id)}
    />
  )
}
