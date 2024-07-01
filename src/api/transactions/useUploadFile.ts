import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'

type UploadFilePayload = {
  file: File
}

const useUploadFile = () => {
  const queryClient = useQueryClient()
  const uploadFileFn = async ({ file }: UploadFilePayload) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  return useMutation({
    mutationFn: uploadFileFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: transactionQueryKeys.all })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all })
    }
  })
}

export default useUploadFile
