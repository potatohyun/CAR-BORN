/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const buttons = css`
  margin-bottom: 2%;
`;

function ButtonItems() {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} css={buttons}>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default ButtonItems;
