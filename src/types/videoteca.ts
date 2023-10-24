import { PaginatorInfo, QueryOptions } from '.'

export type Videoteca = {
  id?: number
  image: string | null
  url: String | null
}

export type CreateViodetaInput = {
  image: string | null
  url: String | null
}

export interface VideotecaQueryOptions extends QueryOptions {
  search: string
}

export type VideotecaPaginator = PaginatorInfo<Videoteca>
