import {
  Notice,
  ReceivedData,
  StoreNoticeInput,
  StoreNoticePaginator,
  StoreNoticeQueryOptions,
} from '@/types'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { crudFactory } from './crud-factory'

export const storeNoticeClient = {
  ...crudFactory<Notice, any, StoreNoticeInput>(API_ENDPOINTS.STORE_NOTICES),
  get({ id }: { id: string }) {
    return HttpClient.get<ReceivedData>(`${API_ENDPOINTS.STORE_NOTICES}/${id}`)
  },
  paginated({
    notice,
    environmentId,
    ...params
  }: Partial<StoreNoticeQueryOptions>) {
    return HttpClient.get<StoreNoticePaginator>(API_ENDPOINTS.STORE_NOTICES, {
      searchJoin: 'and',
      environmentId,
      ...params,
      search: HttpClient.formatSearchParams({ notice }),
    })
  },
}
