import { PaginatorInfo, QueryOptions } from '.'

export type VideoBlog = {
  id?: number
  image: string
  url: string
  title: string
  content: string
  slug: string
  autor: string
  plataform: string
}

export type CreateViodeoBlogInput = {
  image: string
  url: string
  title: string
  content: string
  plataform: string
  autor: string
}

export interface VideoBlogQueryOptions extends QueryOptions {
  search: string
}

export type VideoBlogPaginator = PaginatorInfo<VideoBlog>
