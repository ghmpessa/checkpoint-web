import React from 'react'

import { SearchGroups } from '../../../../presentation/pages'
import { makeRemoteCreateGroup } from '../../usecases'
import { makeRemoteLoadGroups } from '../../usecases/load-groups/remote-load-groups-factory'

export const makeCommunity: React.FC = () => {
  return (
    <SearchGroups
      createGroup={makeRemoteCreateGroup()}
      loadGroups={makeRemoteLoadGroups()}
    />
  )
}
