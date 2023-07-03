import { Environment } from '.'

export type EnvironmentPagination = {
  environments: Environment[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
