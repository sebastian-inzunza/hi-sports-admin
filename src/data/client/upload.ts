/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'

export const uploadClient = {
  upload: async (variables: any) => {
    const formData = new FormData()
    variables.forEach((attachment: any) => {
      formData.append('file', attachment)
    })
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return HttpClient.post(API_ENDPOINTS.UPLOAD, formData, options)
  },
}
