import { RemoteLoadAccount } from '../../../../data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteLoadAccount = (id: string): RemoteLoadAccount => new RemoteLoadAccount(makeApiUrl(`/account/${id}`), makeAxiosHttpClient())
