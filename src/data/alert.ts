/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertResponse } from '@/types/alerts'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery } from 'react-query'
import { QueryOptionsType } from '../types'
import { alertClient } from './client/alert'
import { API_ENDPOINTS } from './client/api-endpoints'

export const useAlertsQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<AlertResponse, Error>(
    [API_ENDPOINTS, options],
    () => alertClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    alerts: data?.data as Alert[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}
