import React from "react";
import styled from "@emotion/styled";
import { SearchInputType } from "../../../routes/auth/SearchID";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -0.8rem;
`;

type SearchIDNameProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInputType>>;
  searchInput: SearchInputType;
};

const SearchIDName = ({ setSearchInput, searchInput }: SearchIDNameProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isValid = /^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(value);
    if (isValid) {
      setSearchInput({
        ...searchInput,
        name: value,
      });
    } else if (value === '') { // Added a check for an empty string
      setSearchInput({
        ...searchInput,
        name: '',
      });
    }
  };

  return (
    <StyleLoginInputDiv>
      <StyleNameLabel htmlFor="SearchName">이름(회사명)</StyleNameLabel>
      <StyledInput
        type="text"
        id="SearchName"
        name="SearchName"
        autoComplete="off"
        placeholder="Name"
        onChange={handleChange}
        value={searchInput.name}
      />
    </StyleLoginInputDiv>
  );
};

export default SearchIDName;
