import { useState } from 'react';
import { PageChangeHandler } from '../types'; // Adjust path if needed

interface UsePaginationOutput {
  currentPage: number;
  pageChange: PageChangeHandler;
}

export function usePagination(): UsePaginationOutput {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // MUI pagination onChange handler has event as first arg, value as second
  const pageChange: PageChangeHandler = (_, value) => {
    setCurrentPage(value);
  };

  return {
    currentPage,
    pageChange
  };
}
