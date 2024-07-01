import { FC } from 'react'
import { Td } from '@chakra-ui/react'
import { Transaction } from './Table'

interface TableRowsProps {
  data: Transaction
}

const TableRows: FC<TableRowsProps> = ({ data }) => {
  return (
    <>
      {Object.values(data).map((value) => (
        <Td key={value}>{value}</Td>
      ))}
    </>
  )
}

export default TableRows
