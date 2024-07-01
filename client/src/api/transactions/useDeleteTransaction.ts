import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'
import { useDisclosure } from '@chakra-ui/react'

type Props = {
  id: string
}

const useDeleteTransaction = ({ id }: Props) => {
  const queryClient = useQueryClient()
  const deleteUserFn = async (transactionId = id) => {
    const response = await apiClient.delete(`/${transactionId}`)
    return response
  }
  const { onClose: onDeleteClose } = useDisclosure()

  return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: transactionQueryKeys.all })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all })
      onDeleteClose()
    }
  })
}
export default useDeleteTransaction
