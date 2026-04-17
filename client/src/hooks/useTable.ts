import { useState } from 'react';
import { OrderDirection } from '../graphql/__generated__/graphql';
import type { UseTableParams } from '../types/types';

/**
 * Custom hook to manage table state including sorting, pagination, and rows per page.
 *
 * @param params - The initial parameters for the table state
 * @param params.orderBy - The field to sort by
 * @param params.orderDirection - The direction of the sort (ASC or DESC)
 * @param params.page - The current page number (defaults to 0)
 * @param params.rowsPerPage - The number of rows to display per page
 *
 * @returns An object containing:
 * @returns {T | undefined} filters - The current filters applied to the table (if any)
 * @returns {string} orderBy - The current field being sorted by
 * @returns {OrderDirection} orderDirection - The current sort direction
 * @returns {number} page - The current page number
 * @returns {number} rowsPerPage - The current number of rows per page
 * @returns {Function} handleFiltersApply - Function to apply filters and reset sorting and pagination
 * @returns {Function} handleFiltersClear - Function to clear filters and reset sorting and pagination
 * @returns {Function} handleSort - Function to update the sort field and direction
 * @returns {Function} handlePageChange - Function to update the current page
 * @returns {Function} handleRowsPerPageChange - Function to update rows per page and reset to page 0
 */
export const useTable = <T>(params: UseTableParams) => {
  const [filters, setFilters] = useState<T>();
  const [orderBy, setOrderBy] = useState<string>(params.orderBy);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(params.orderDirection);
  const [page, setPage] = useState<number>(params.page ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(params.rowsPerPage);

  const handleFiltersApply = (filters: T | undefined) => {
    setFilters(filters);
    setOrderBy(params.orderBy);
    setOrderDirection(params.orderDirection);
    setPage(0);
  };

  const handleFiltersClear = () => {
    setFilters(undefined);
    setOrderBy(params.orderBy);
    setOrderDirection(params.orderDirection);
    setPage(0);
  };

  const handleSort = (orderBy: string, orderDirection: OrderDirection) => {
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  }

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(Number(event.target.value));
  };

  return {
    filters,
    orderBy,
    orderDirection,
    page,
    rowsPerPage,
    handleFiltersApply,
    handleFiltersClear,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  };
};
