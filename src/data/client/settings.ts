import { CreateSettings, Settings } from '@/types/settings'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'
import { HttpClient } from './http-client'

export const settingsClient = {
  ...crudFactory<Settings, QueryOptions, CreateSettings>(
    API_ENDPOINTS.SETTINGS
  ),
  getSettings: () => {
    return HttpClient.get<Settings>(API_ENDPOINTS.SETTINGS)
  },
}
