import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../apiClient'
import { useDisclosure } from '@chakra-ui/react'
import { transactionQueryKeys } from './transactionQueryKeys'

type Props = {
  id: string
}

type UpdateStatusPayload = {
  Status: string
}

const useEditTransaction = ({ id }: Props) => {
  const queryClient = useQueryClient()
  const editTransactionFn = async (updatedTransaction: UpdateStatusPayload) => {
    const response = await apiClient.patch(`/${id}`, updatedTransaction)
    return response
  }
  const { onClose: onEditClose } = useDisclosure()

  return useMutation({
    mutationFn: editTransactionFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: transactionQueryKeys.all })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all })
      onEditClose()
    }
  })
}

export default useEditTransaction
