import { useQuery } from '@tanstack/react-query'
import { ApiEndpoint, apiClient } from '../apiClient'
import { transactionQueryKeys } from './transactionQueryKeys'

type Props = {
  type?: string
  status?: string
}

export const downloadTransactionFn = async ({ type, status }: Props) => {
  let endpoint = `${ApiEndpoint.DOWNLOAD}?`

  if (type) {
    endpoint += `type=${type}&`
  }

  if (status) {
    endpoint += `status=${status}`
  }

  const response = await apiClient.get(endpoint)

  return response.data
}

export function useDownloadTransaction({ type, status }: Props) {
  return useQuery({
    queryKey: transactionQueryKeys.download(type, status),
    queryFn: () => downloadTransactionFn({ type, status })
  })
}
