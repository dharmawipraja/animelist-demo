import { useState } from 'react';

export function usePagination() {
  const [currentPage, setCurrentPage ] = useState(1);
  const pageChange = (_, value) => {
    console.log('value', value)
    setCurrentPage(value);
  }

  return {
    currentPage,
    pageChange
  };
};
