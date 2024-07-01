import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'

type Props = {
  id: string
}

export function useTransaction({ id }: Props) {
  const getTransactionFn = async (itemId = id) => {
    const response = await apiClient.get(`/${itemId}`)
    return response.data
  }

  return useQuery({
    queryKey: transactionQueryKeys.transaction(id),
    queryFn: () => getTransactionFn(id)
  })
}
