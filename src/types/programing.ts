import { PaginatorInfo, QueryOptions } from '.'

export type Programing = {
  id?: number
  image: string | null
  date: Array<Date>
  title: string
}

type Date = []

export type CreateProgramingInput = {
  image: string
  date: Array<Date>
  tittle: string
}

export interface ProgramingQueryOptions extends QueryOptions {
  search: string
}

export type ProgramingPaginator = PaginatorInfo<Programing>
