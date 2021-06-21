import React from 'react'
import { useParams } from 'react-router-dom'

import { Group } from '../../../../presentation/pages'
import { makeRemoteAddPost, makeRemoteJoinGroup, makeRemoteLoadGroup, makeRemoteLoadMembers, makeRemoteLoadPosts } from '../../usecases'

export const makeGroup: React.FC = () => {
  type Props = {
    id: string
  }

  const { id } = useParams<Props>()

  return (
    <Group
      joinGroup={makeRemoteJoinGroup()}
      loadGroup={makeRemoteLoadGroup(id)}
      loadPosts={makeRemoteLoadPosts()}
      loadMembers={makeRemoteLoadMembers()}
      addPost={makeRemoteAddPost()}
    />
  )
}
