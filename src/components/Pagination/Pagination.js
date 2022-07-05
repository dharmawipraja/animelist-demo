import React from 'react'
import MUIPagination from '@mui/material/Pagination';
import Box from '@mui/system/Box';

function Pagination({ pageInfo, page, onPageChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <MUIPagination
        count={pageInfo?.total}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={onPageChange}
        boundaryCount={2}
      />
    </Box>
  )
}

export default Pagination;
