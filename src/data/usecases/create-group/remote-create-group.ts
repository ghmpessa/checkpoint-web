import { CreateGroup, Group } from '../../../domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols'
import { UnexpectedError, InvalidParamError, ServerError } from '../../../domain/errors'
import { GroupModel } from '../../../domain/models'

export class RemoteCreateGroup implements CreateGroup {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GroupModel>
  ) { }

  async create(params: Group): Promise<GroupModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      body: params,
      method: 'post'
    })

    switch ((await httpResponse).status) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden:
      case HttpStatusCode.badRequest: throw new InvalidParamError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
