import { Settings } from '@/types/settings'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { API_ENDPOINTS } from './client/api-endpoints'
import { settingsClient } from './client/settings'

export const useSettingsQuery = () => {
  const { data, isLoading, error } = useQuery<Settings, Error>(
    [API_ENDPOINTS.SETTINGS],
    () => settingsClient.getSettings(),
    {
      keepPreviousData: true,
    }
  )
  return {
    settings: data as Settings,
    loading: isLoading,
    error,
  }
}

export const useSettingsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(settingsClient.update, {
    onSuccess: () => {
      toast.success('Settings updated successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS)
    },
  })
}
