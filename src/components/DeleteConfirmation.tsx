import { Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import ModalButtonGroup from './ModalButtonGroup'
import useDeleteTransaction from '../api/transactions/useDeleteTransaction'
//import { useTransactions } from '../api/transactions/useTransactions'

interface DeleteConfirmationProp {
  id: string
  handleCloseClick: () => void
}

export const DeleteConfirmation: FC<DeleteConfirmationProp> = ({
  id,
  handleCloseClick
}) => {
  const { mutate: deleteTransaction } = useDeleteTransaction({ id })
  //const { refetch: refetchTransactions } = useTransactions()

  const handleSubmitClick = () => {
    deleteTransaction(id)
  }

  return (
    <Stack spacing={3}>
      <Text>{`Are you sure you want to delete transaction ID: ${id}?`}</Text>
      <ModalButtonGroup
        handleSubmitClick={handleSubmitClick}
        isDeleteConfirmation
        handleCancelClick={handleCloseClick}
      />
    </Stack>
  )
}
