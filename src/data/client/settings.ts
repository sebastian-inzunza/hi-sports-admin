import { QueryOptions } from '@/types/index'
import { CreateSettings, Settings } from '@/types/settings'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { HttpClient } from './http-client'

export const settingsClient = {
  ...crudFactory<Settings, QueryOptions, CreateSettings>(
    API_ENDPOINTS.SETTINGS
  ),
  getSettings: async () => {
    const response = await HttpClient.get<Settings[]>(API_ENDPOINTS.SETTINGS)
    return response[0]
  },
}
