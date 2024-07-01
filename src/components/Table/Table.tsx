import { FC, useState } from 'react'
import {
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  ButtonGroup,
  useDisclosure
} from '@chakra-ui/react'
import { Table as ChakraTable } from '@chakra-ui/react'
import TableHeadItem from './TableHeadItem'
import TableRows from './TableRows'
import Button from '../Button'
import ModalBox from '../ModalBox'
import { EditTransactionForm } from '../EditTransactionForm'
import { DeleteConfirmation } from '../DeleteConfirmation'

export interface Transaction {
  id: string
  status: string
  clientName: string
  amount: string
}

interface TableProps {
  transactionsList: Transaction[]
  tableHeadData: string[]
}

const Table: FC<TableProps> = ({ transactionsList, tableHeadData }) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()

  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('')

  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null)

  const handleEditClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId)
    setModalType('edit')
    onEditOpen()
  }

  const handleDeleteClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId)
    setModalType('delete')
    onDeleteOpen()
  }

  return (
    <TableContainer mb={4}>
      <ChakraTable variant="simple" size="lg">
        <Thead>
          <Tr>
            {tableHeadData.map((item) => (
              <TableHeadItem item={item} key={item} />
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {transactionsList.map((transaction) => (
            <Tr key={transaction.id}>
              <TableRows data={transaction} />
              <Td pr={1}>
                <ButtonGroup gap={2} w="100%">
                  <Button
                    title="Edit"
                    onClick={() => handleEditClick(transaction.id)}
                    colorScheme="blue"
                  />
                  <Button
                    title="Delete"
                    onClick={() => handleDeleteClick(transaction.id)}
                  />
                  {modalType === 'edit' &&
                    selectedTransactionId === transaction.id && (
                      <ModalBox
                        isOpen={isEditOpen}
                        onClose={onEditClose}
                        title="Edit transaction"
                        modalBody={
                          <EditTransactionForm
                            transactionId={selectedTransactionId}
                            handleCancelClick={onEditClose}
                          />
                        }
                      />
                    )}
                  {modalType === 'delete' &&
                    selectedTransactionId === transaction.id && (
                      <ModalBox
                        isOpen={isDeleteOpen}
                        onClose={onDeleteClose}
                        title="Delete transaction"
                        modalBody={
                          <DeleteConfirmation
                            id={selectedTransactionId}
                            handleCloseClick={onDeleteClose}
                          />
                        }
                      />
                    )}
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}

export default Table
