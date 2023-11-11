import { PaginatorInfo, QueryOptions } from '.'

export type Publicidad = {
  id?: number
  image: string | null
  url: string | null
  activo: boolean
}

export type CreatePublicidadInput = {
  image: string | null
  url: String | null
}

export interface BlockPublicidadInput {
  id: number
  banned: boolean
}

export interface PublicidadQueryOptions extends QueryOptions {
  search: string
}

export type PublicidadPaginator = PaginatorInfo<Publicidad>
