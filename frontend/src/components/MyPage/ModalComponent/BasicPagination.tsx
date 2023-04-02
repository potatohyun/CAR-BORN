import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// 페이지네이션 컴포넌트 
export const BasicPagination = () => {
  return (
    <Stack spacing={2}>
      <Pagination count={5} size="large" />
    </Stack>
  );
}