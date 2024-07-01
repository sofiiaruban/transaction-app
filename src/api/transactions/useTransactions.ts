import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'

const getTransactionFn = async () => {
  const response = await apiClient.get('')
  return response.data
}

export function useTransactions() {
  return useQuery({
    queryKey: transactionQueryKeys.all,
    queryFn: getTransactionFn
  })
}
