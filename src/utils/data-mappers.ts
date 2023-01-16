/* eslint-disable @typescript-eslint/no-explicit-any */
import camelCaseKeys from 'camelcase-keys'
import { MappedPaginatorInfo, PaginatorInfo } from '@/types/index'

export const mapPaginatorData = (
  obj: PaginatorInfo<any> | undefined
): MappedPaginatorInfo | null => {
  if (!obj) return null
  const { ...formattedValues } = camelCaseKeys(obj)
  return {
    ...formattedValues,
    hasMorePages: formattedValues.currentPage < formattedValues.totalPages,
  }
}
