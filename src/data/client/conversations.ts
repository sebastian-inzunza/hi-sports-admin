import {
  CreateMessageInput,
  CreateMessageSeenInput,
  DataChat,
  MessagePaginator,
  MessageQueryOptions,
} from '@/types'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const conversationsClient = {
  ...crudFactory<DataChat, QueryOptions, CreateMessageInput>(
    API_ENDPOINTS.CONVERSIONS
  ),
  allConversation: (params: Partial<MessageQueryOptions>) =>
    HttpClient.get<any>(API_ENDPOINTS.CONVERSIONS, params),

  getMessage({ id, ...prams }: Partial<MessageQueryOptions>) {
    return HttpClient.get<any>(`${API_ENDPOINTS.MESSAGE}/${id}`, {
      searchJoin: 'and',
      ...prams,
    })
  },
  getConversion({ id }: { id: string }) {
    return HttpClient.get<DataChat>(`${API_ENDPOINTS.CONVERSIONS}/${id}`)
  },
  messageSeen({ userId, messageId }: CreateMessageSeenInput) {
    return HttpClient.post(`${API_ENDPOINTS.MESSAGE_SEEN}`, {
      userId,
      messageId,
    })
  },

  messageCreate(input: CreateMessageInput) {
    return HttpClient.post(`${API_ENDPOINTS.CREATE_MESSAGE}`, {
      ...input,
    })
  },

  createConversation({ recipientId }: { recipientId: string }) {
    return HttpClient.post(`${API_ENDPOINTS.CREATE_CONVERSION}`, {
      recipientId,
    })
  },
}
