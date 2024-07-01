import { CircularProgress, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { transactionStatuses } from '../lib/data'
import { useTransaction } from '../api/transactions/useTransaction'
import ModalButtonGroup from './ModalButtonGroup'
import useEditTransaction from '../api/transactions/useEditTransaction'

interface EditTransactionFormProps {
  transactionId: string
  handleCancelClick: () => void
}

export const EditTransactionForm: FC<EditTransactionFormProps> = ({
  transactionId,
  handleCancelClick
}) => {
  const [currentStatus, setCurrentStatus] = useState('Pending')
  const {
    data: transaction,
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess
  } = useTransaction({ id: transactionId })

  useEffect(() => {
    if (isTransactionSuccess && transaction) {
      setCurrentStatus(transaction.status)
    }
  }, [isTransactionSuccess, transaction])

  const { mutate: updateStatus } = useEditTransaction({
    id: transactionId
  })

  const handleRadioChange = (nextStatus: string) => {
    setCurrentStatus(nextStatus)
  }

  const handleSubmitClick = () => {
    updateStatus({ Status: currentStatus })
  }

  return (
    <>
      {isTransactionLoading && (
        <CircularProgress isIndeterminate color="teal" />
      )}
      <form>
        {isTransactionSuccess && (
          <RadioGroup
            onChange={handleRadioChange}
            value={currentStatus || transaction.Status}
          >
            <Stack>
              {transactionStatuses.map((status) => (
                <Radio value={status} key={status}>
                  {status}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        )}
        <ModalButtonGroup
          handleSubmitClick={handleSubmitClick}
          handleCancelClick={handleCancelClick}
        />
      </form>
    </>
  )
}
