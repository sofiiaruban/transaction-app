import { Flex } from '@chakra-ui/react'
import Button from './Button'
import { FC } from 'react'

interface ModalFooterProps {
  handleSubmitClick: () => void
  handleCancelClick: () => void
  isDeleteConfirmation?: boolean
}

const ModalButtonGroup: FC<ModalFooterProps> = ({
  handleSubmitClick,
  handleCancelClick,
  isDeleteConfirmation
}) => {
  return (
    <Flex justify="end" mb={4} gap={4}>
      <Button
        title="Cancel"
        type="button"
        onClick={handleCancelClick}
        variant="outline"
      />
      <Button
        title={isDeleteConfirmation ? 'Delete' : 'Submit'}
        type="submit"
        colorScheme="teal"
        onClick={handleSubmitClick}
      />
    </Flex>
  )
}

export default ModalButtonGroup
