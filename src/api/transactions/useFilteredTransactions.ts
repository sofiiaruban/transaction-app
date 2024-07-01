import { useQuery } from '@tanstack/react-query'
import { ApiEndpoint, apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'

type Props = {
  type?: string
  status?: string
}

export function useFilteredTransactions({ type, status }: Props) {
  const getPaginatedFilteredTransactionsFn = async () => {
    let endpoint = `${ApiEndpoint.FILTRATED}?`

    if (type) {
      endpoint += `&type=${type}`
    }

    if (status) {
      endpoint += `&status=${status}`
    }

    const response = await apiClient.get(endpoint)

    return response.data
  }

  return useQuery({
    queryKey: transactionQueryKeys.filtration,
    queryFn: getPaginatedFilteredTransactionsFn
  })
}
