import React from 'react'

import { SearchGroups } from '../../../../presentation/pages'
import { makeRemoteCreateGroup } from '../../usecases'

export const makeCommunity: React.FC = () => {
  return (
    <SearchGroups
      createGroup={makeRemoteCreateGroup()}
    />
  )
}
