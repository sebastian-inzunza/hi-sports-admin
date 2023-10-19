import { PaginatorInfo, QueryOptions } from '.'

export type Videoteca = {
  id?: number
  image: string | null
  source: String | null
  createdAt: Date
  updatedAt: Date
  createdBy: number
}

export type CreateViodetaInput = {
  image: string | null
  source: String | null
}

export interface VideotecaQueryOptions extends QueryOptions {
  search: string
}

export type VideotecaPaginator = PaginatorInfo<Videoteca>
