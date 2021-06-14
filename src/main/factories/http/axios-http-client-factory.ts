import { AxiosHttpClient } from '@/infra/'

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
