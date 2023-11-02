import { PaginatorInfo, QueryOptions } from '.'

export type Publicidad = {
  id?: number
  image: string | null
  url: string | null
}

export type CreatePublicidadInput = {
  image: string | null
  url: String | null
}

export interface PublicidadQueryOptions extends QueryOptions {
  search: string
}

export type PublicidadPaginator = PaginatorInfo<Publicidad>
