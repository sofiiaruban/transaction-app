import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'

interface PaginationProps {
  pageCount: number
  onPageChange: (selectedItem: { selected: number }) => void
}

const Pagination: FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const INITIAL_PAGE = 0

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel="<"
      initialPage={INITIAL_PAGE}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageClassName={styles.page}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.previous}
      previousLinkClassName={styles.previousLink}
      nextLinkClassName={styles.nextLink}
    />
  )
}

export default Pagination
