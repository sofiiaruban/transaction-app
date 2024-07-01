import { useQuery } from '@tanstack/react-query'
import { ApiEndpoint, apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'

type Props = {
  page: number
  limit: number
  type?: string
  status?: string
}

export function usePaginatedFilteredTransactions({
  page,
  limit,
  type,
  status
}: Props) {
  const getPaginatedFilteredTransactionsFn = async (pageNum = page) => {
    let endpoint = `${ApiEndpoint.PAGINATION_FILTRATED}?page=${pageNum}&limit=${limit}`

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
    queryKey: transactionQueryKeys.paginationFiltration(page),
    queryFn: () => getPaginatedFilteredTransactionsFn(page)
  })
}
