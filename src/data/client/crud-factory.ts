/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginatorInfo } from '@/types/index'
import { HttpClient } from './http-client'

export function crudFactory<Type, QueryParams, InputType>(endpoint: string) {
  return {
    all(params?: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params)
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params)
    },
    get({ slug }: { slug: string }) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`)
    },
    create(data: InputType, options?: any) {
      return HttpClient.post<Type>(endpoint, data, options)
    },
    update({
      ...input
    }: Partial<InputType> & {
      id: number
    }) {
      return HttpClient.put<Type>(`${endpoint}/${input.id}`, input)
    },
    delete({ id }: { id: string }) {
      console.log('ID', id)
      return HttpClient.delete<boolean>(`${endpoint}/${id}`)
    },
  }
}
