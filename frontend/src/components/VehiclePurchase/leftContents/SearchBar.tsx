/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import RadioBtn from "./RadioBtn";
import { setKeyword, StateType } from "../../../modules/carListModule";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import swal from "sweetalert";

export const searchContainer = css`
  margin: 5% 7% 0 7%;

  .span {
    font-weight: 900;
    font-size: 1.1rem;
  }

  .hr {
    width: 13%;
    margin-left: 0.4%;
    background: #e00000;
    height: 2.5px;
    margin-bottom: 5%;
    margin-top: 2%;
  }
`;

function SearchBar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { keywordType } = useSelector(
    ({ carListReducer }: { carListReducer: StateType }) => carListReducer
  );

  const setKeywordValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const keyword = e.target.value.split(" ").join("");
    dispatch(setKeyword(keyword));
  };

  const getSearchData = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("서브밋");
    if (keywordType) {
      queryClient.fetchQuery("infinity-scroll");
    } else {
      swal({
        text: "검색 조건을 선택해주세요.",
        icon: "error",
        buttons: [false],
      });
    }
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.value = "";
  };

  return (
    <div css={searchContainer}>
      <span className="span">검색</span>
      <hr className="hr" />
      <RadioBtn />

      <Paper
        component="form"
        sx={{
          display: "flex",
          p: "2px 4px",
          width: "96%",
          border: "1px solid #D0D0D0",
          boxShadow: "none",
        }}
        onSubmit={getSearchData}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, textAlign: "center" }}
          inputProps={{ "aria-label": "search google maps" }}
          onBlur={setKeywordValue}
          placeholder="Search for..."
          onFocus={onFocus}
        />
        <IconButton
          onClick={getSearchData}
          type="button"
          sx={{ p: "5px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
export default SearchBar;
