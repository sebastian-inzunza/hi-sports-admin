import type { PaginatorInfo } from '@/types'
import { HttpClient } from './http-client'

export function crudFactory<Type, QueryParams, InputType>(endpoint: string) {
  return {
    all(params: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params)
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params)
    },
    get() {
      return HttpClient.get<Type>(`${endpoint}`)
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data)
    },
    update({ id, ...input }: Partial<InputType> & { id: string }) {
      return HttpClient.put<Type>(`${endpoint}/${id}`, input)
    },
    delete({ id }: { id: string }) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`)
    },
  }
}
