import { RemoteLoadGroup } from '@/data/usecases/load-group/remote-load-group'
import { makeAuthorizeHttpClientDecorator } from '../../decorators'
import { makeApiUrl } from '../../http'

export const makeRemoteLoadGroup = (id: string): RemoteLoadGroup => new RemoteLoadGroup(makeApiUrl(`/group/${id}`), makeAuthorizeHttpClientDecorator())
