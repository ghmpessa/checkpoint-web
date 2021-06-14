import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, ServerError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (private readonly url: string, private readonly httpClient: HttpClient<AccountModel>) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch ((await httpResponse).status) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
