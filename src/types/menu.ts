import { PaginatorInfo, QueryOptions } from '.'

export type Menu = {
  id?: number
  url: String
  title: String
}

export type CreateMenuInput = {
  title: string
  url: String
}

export interface MenuQueryOptions extends QueryOptions {
  search: string
}

export type MenuPaginator = PaginatorInfo<Menu>
