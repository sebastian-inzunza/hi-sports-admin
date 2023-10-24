import { PaginatorInfo, QueryOptions } from '.'

export type Presentador = {
  id?: number
  image: string
  name: String
  url: String
}

export type CreatePresentadorInput = {
  image: string
  url: String
  name: string
}

export interface PresentadorQueryOptions extends QueryOptions {
  search: string
}

export type PresentadorPaginator = PaginatorInfo<Presentador>
