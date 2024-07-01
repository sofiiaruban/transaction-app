import { Input } from '@chakra-ui/react'
import ModalButtonGroup from './ModalButtonGroup'
import { FC } from 'react'

interface ImportFileProp {
  handleCancelClick: () => void
}

const ImportFile: FC<ImportFileProp> = ({ handleCancelClick }) => {
  return (
    <form
      action="http://localhost:3000/transactions"
      method="POST"
      encType="multipart/form-data"
    >
      <Input size="lg" type="file" pt={2} name="file" mb={8} />
      <ModalButtonGroup
        handleSubmitClick={() => {}}
        handleCancelClick={handleCancelClick}
      />
    </form>
  )
}

export default ImportFile
