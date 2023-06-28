import { MappedPaginatorInfo, PaginatorInfo } from '@/types'
import camelCaseKeys from 'camelcase-keys'

export const mapPaginatorData = (
  obj: PaginatorInfo<any> | undefined
): MappedPaginatorInfo | null => {
  if (!obj) return null
  return {
    ...obj,
  }
}
