export const transactionQueryKeys = {
  all: ['transactions'],
  pagination: (page: number) => [
    ...transactionQueryKeys.all,
    'pagination',
    page
  ],
  transaction: (id: string) => [...transactionQueryKeys.all, 'transaction', id],
  paginationFiltration: (page: number) => [
    ...transactionQueryKeys.all,
    'paginationFiltration',
    page
  ],
  filtration: ['filtration'],
  download: (type?: string, status?: string) => [
    ...transactionQueryKeys.all,
    'download',
    type,
    status
  ]
}
