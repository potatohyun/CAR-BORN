/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const searchForm = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchForm() {
  const getSearchResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div css={searchForm}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          width: "100%",
        }}
        onSubmit={getSearchResult}
      >
        <InputBase
          sx={{ ml: 9, flex: 1, textAlign: "center" }}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default SearchForm;
