import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Alert, AlertResponse } from '@/types/alerts'
import { mapPaginatorData } from '@/utils/data-mappers'
import { QueryOptionsType } from '../types'
import { alertClient } from './client/alert'
import { API_ENDPOINTS } from './client/api-endpoints'
import { toast } from 'react-toastify'

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

export type AlerResponse = {
  alert: Alert
  message: string
}
export const useAlertQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery<AlerResponse, Error>(
    [API_ENDPOINTS.ALERTS, id],
    () => alertClient.byId({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    alert: data?.alert,
    loading: isLoading,
    error,
  }
}

export const useAlertDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(alertClient.delete, {
    onSuccess() {
      toast.success('Alert deleted successfully')
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useAlertEditMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(alertClient.update, {
    onSuccess() {
      toast.success('Alert updated successfully')
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ALERTS)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
