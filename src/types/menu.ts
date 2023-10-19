import { PaginatorInfo, QueryOptions } from '.'

export type Menu = {
  id?: number
  source: String | null
  titulo: String | null
  createdAt: Date
  updatedAt: Date
  createdBy: number
}

export type CreateMenuInput = {
  titulo: string | null
  source: String | null
}

export interface MenuQueryOptions extends QueryOptions {
  search: string
}

export type MenuPaginator = PaginatorInfo<Menu>
