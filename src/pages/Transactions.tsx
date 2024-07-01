import { FC, useEffect, useState } from 'react'
import Table from '../components/Table/Table'
import {
  tableHeadData,
  transactionStatuses,
  transactionTypes
} from '../lib/data'
import { Box, Flex } from '@chakra-ui/layout'
import Select from '../components/Select'
import Button from '../components/Button'
import {
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  Heading,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import ModalBox from '../components/ModalBox'
import ImportFile from '../components/ImportFile'
import Pagination from '../components/Pagination/Pagination'
import { downloadTransactionFn } from '../api/transactions/useDownloadTransaction'
import { usePaginatedFilteredTransactions } from '../api/transactions/usePaginatedFilteredTransactions'
import { useFilteredTransactions } from '../api/transactions/useFilteredTransactions'

const ITEMS_PER_PAGE = 5
const Transactions: FC = () => {
  const {
    isOpen: isImportOpen,
    onOpen: onImportOpen,
    onClose: onImportClose
  } = useDisclosure()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  const {
    data: filteredPaginatedTransactions,
    isLoading: isFilteredPaginatedLoading,
    isSuccess: isFilteredPaginatedSuccess,
    refetch: refetchPaginatedTransactions
  } = usePaginatedFilteredTransactions({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    type: selectedType,
    status: selectedStatus
  })

  const {
    data: filteredTransactions,
    isLoading: isFilteredLoading,
    isSuccess: isFilteredSuccess,
    refetch: refetchTransactions
  } = useFilteredTransactions({
    type: selectedType,
    status: selectedStatus
  })

  useEffect(() => {
    if (isFilteredSuccess) {
      setPageCount(Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE))
    }
  }, [filteredTransactions, isFilteredSuccess])

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected
    setCurrentPage(newPage)
  }

  const handleFilterApply = () => {
    refetchPaginatedTransactions()
    refetchTransactions()
    setCurrentPage(1)
  }

  const handleExport = async () => {
    const data = await downloadTransactionFn({
      type: selectedType,
      status: selectedStatus
    })
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'transactions.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Stack px={12}>
      <Box my={2} pl={6}>
        <Heading>Transactions</Heading>
      </Box>
      <Divider mb={2} />
      <Stack>
        <Flex mb={4} gap={4} justify="space-between">
          <Grid ml={6} templateColumns="repeat(4, 1fr)" gap={2}>
            <Select
              optionList={transactionStatuses}
              optionName="status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
            <Select
              optionList={transactionTypes}
              optionName="type"
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <Button
              type="button"
              title="Apply filters"
              onClick={handleFilterApply}
              size="lg"
            />
          </Grid>
          <ButtonGroup gap={2}>
            <Button
              title="Import"
              onClick={onImportOpen}
              size="lg"
              variant="outline"
            />
            <ModalBox
              isOpen={isImportOpen}
              onClose={onImportClose}
              title="Import csv file"
              modalBody={<ImportFile handleCancelClick={onImportClose} />}
            />
            <Button
              title="Export"
              onClick={handleExport}
              size="lg"
              variant="outline"
              colorScheme="blue"
            />
          </ButtonGroup>
        </Flex>
        {isFilteredPaginatedLoading && (
          <CircularProgress isIndeterminate color="teal" />
        )}
        {isFilteredPaginatedSuccess && (
          <Table
            transactionsList={filteredPaginatedTransactions}
            tableHeadData={tableHeadData}
          />
        )}
        {isFilteredLoading && <CircularProgress isIndeterminate color="teal" />}
        {isFilteredSuccess && (
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        )}
      </Stack>
    </Stack>
  )
}

export default Transactions
