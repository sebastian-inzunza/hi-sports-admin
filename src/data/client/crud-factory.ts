import { PaginatorInfo } from '@/types/index'
import { HttpClient } from './http-client'

export function crudFactory<Type, QueryParams, InputType>(endpoint: string) {
  return {
    all(params: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params)
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params)
    },
    get({ slug }: { slug: string }) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`)
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data)
    },
    update({ ...input }: Partial<InputType> & { id: number }) {
      console.log('INPUT', input)
      return HttpClient.put<Type>(`${endpoint}/${input.id}`, input)
    },
    delete({ id }: { id: string }) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`)
    },
  }
}
