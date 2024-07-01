import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface ModalBoxProps {
  title: string
  isOpen: boolean
  onClose: () => void
  modalBody: ReactNode
}

const ModalBox: FC<ModalBoxProps> = ({ isOpen, onClose, title, modalBody }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalBody}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalBox
