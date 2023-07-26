import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { API_ENDPOINTS } from './client/api-endpoints'
import { settingsClient } from './client/settings'
import { useSettings } from '@/contexts/settings.context'

export const useUpdateSettingsMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { updateSettings } = useSettings()

  return useMutation(settingsClient.update, {
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      updateSettings(data)
      toast.success(t('common:successfully-updated'))
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS)
    },
  })
}

export const useCreateSettingsMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { updateSettings } = useSettings()

  return useMutation(settingsClient.create, {
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      // updateSettings(data?.options)
      console.log('==== data ====')
      console.log(data)
      console.log('==== data ====')
      toast.success(t('common:successfully-created'))
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS)
    },
  })
}

export const useSettingsQuery = () => {
  const { data, error, isLoading } = useQuery<any, Error>(
    API_ENDPOINTS.SETTINGS,
    settingsClient.getSettings,
    {
      onError: (error) => {
        console.log(error)
      },
    }
  )

  return {
    settings: data ?? {},
    error,
    loading: isLoading,
  }
}
