import {
  Programing,
  ProgramingPaginator,
  CreateProgramingInput,
  ProgramingQueryOptions,
} from '@/types/programing'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const programingClient = {
  ...crudFactory<Programing, QueryOptions, CreateProgramingInput>(
    API_ENDPOINTS.PROGRAMMING
  ),

  pagination: ({ search, ...params }: Partial<ProgramingQueryOptions>) => {
    return HttpClient.get<ProgramingPaginator>(API_ENDPOINTS.PROGRAMMING, {
      ...params,
      search,
    })
  },
}
