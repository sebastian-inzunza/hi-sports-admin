import { PaginatorInfo, QueryOptions } from '.'

export type Presentador = {
  id?: number
  image: string | null
  name: String
  source: String | null
  createdAt: Date
  updatedAt: Date
  createdBy: number
}

export type CreatePresentadorInput = {
  image: string
  source: String | null
  name: string
}

export interface PresentadorQueryOptions extends QueryOptions {
  search: string
}

export type PresentadorPaginator = PaginatorInfo<Presentador>
