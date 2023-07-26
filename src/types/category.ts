import { PaginatorInfo, QueryOptions } from '.'

export type Category = {
  id?: number
  slug: string
  image: string | null
  content: string | null
  name: string
  createdAt: Date
  updatedAt: Date
  createdBy: number
  is_approved?: boolean
}

export type CreateCategoryInput = {
  slug: string
  image?: string | null
  content: string | null
  name: string
  is_approved?: boolean
}
export interface CategoryQueryOptions extends QueryOptions {
  search: string
}

export type CategoryPaginator = PaginatorInfo<Category>
