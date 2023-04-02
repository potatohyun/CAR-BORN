import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./../../../lib/api";
import styled from "@emotion/styled";
import MyCarInfoPagination from "../Pagination/MyCarInfoPagination";

const ITEMS_PER_PAGE = 3;

const StyleMyCarInfoTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleMyCarInfoTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
    font-weight: 900;
  }

  border-bottom: 3px solid red;
  margin-bottom: 2rem;

  width: 50%;
`;

const MyCarDataComponent = () => {
  return (
    <StyleMyCarInfoTableDiv>
      <StyleMyCarInfoTitleDiv>
        <p>내 차량 정보</p>
      </StyleMyCarInfoTitleDiv>
      <MyCarInfoPagination itemsPerPage={ITEMS_PER_PAGE} />
    </StyleMyCarInfoTableDiv>
  );
};

export default MyCarDataComponent;
