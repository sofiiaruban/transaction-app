export const tableHeadData = [
  'ID',
  'Status',
  'Type',
  'Client Name',
  'Amount',
  'Action'
]

export const dummyTransactions = [
  {
    TransactionId: '1',
    Status: 'Pending',
    Type: 'Withdrawal',
    ClientName: 'Dale Cotton',
    Amount: '$28.43'
  },
  {
    TransactionId: '2',
    Status: 'Completed',
    Type: 'Refill',
    ClientName: 'Paul Carter',
    Amount: '$45.16'
  },
  {
    TransactionId: '3',
    Status: 'Cancelled',
    Type: 'Refill',
    ClientName: 'Caldwell Reid',
    Amount: '$63.00'
  }
]

export const transactionStatuses = ['Pending', 'Completed', 'Cancelled']

export const transactionTypes = ['Refill', 'Withdrawal']
