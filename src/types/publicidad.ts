import { PaginatorInfo, QueryOptions } from '.'

export type Publicidad = {
  id?: number
  image: string | null
  url: string | null
  banned: boolean
  company: string
  createdAt: string
}

export type CreatePublicidadInput = {
  image: string
  url: String
  company: string
}

export interface BlockPublicidadInput {
  id: number
  banned: boolean
}

export interface PublicidadQueryOptions extends QueryOptions {
  search: string
}

export type PublicidadPaginator = PaginatorInfo<Publicidad>
