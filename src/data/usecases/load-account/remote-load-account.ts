import { HttpClient, HttpStatusCode } from '../../protocols'
import { ServerError, UnexpectedError } from '../../../domain/errors'
import { ProfileModel } from '../../../domain/models'
import { LoadAccount } from '../../../domain/usecases'

export class RemoteLoadAccount implements LoadAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<ProfileModel>
  ) { }

  async load (): Promise<ProfileModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (httpResponse.status) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
