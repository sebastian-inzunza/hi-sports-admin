import { useMutation, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from '@/data/client/api-endpoints'
import { uploadClient } from '@/data/client/upload'
import { toast } from 'react-toastify'

export const useUploadMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(uploadClient.upload, {
    onSuccess() {
      toast.success('File uploaded successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.UPLOAD)
    },
  })
}
