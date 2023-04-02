import React from "react";
import styled from "@emotion/styled";
import { SearchInputType } from "../../../routes/auth/SearchID";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 22vw;
`;

type SearchIDNameProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInputType>>;
  searchInput: SearchInputType;
};

const SearchIDName = ({ setSearchInput, searchInput }: SearchIDNameProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput({
      ...searchInput,
      name: value,
    });
  };

  return (
    <StyleLoginInputDiv>
      <br />
      <StyleNameLabel htmlFor="SearchName">이름(회사명)</StyleNameLabel>
      <StyledInput
        type="text"
        id="SearchName"
        name="SearchName"
        autoComplete="off"
        placeholder="Name"
        onChange={handleChange}
      />
    </StyleLoginInputDiv>
  );
};

export default SearchIDName;
