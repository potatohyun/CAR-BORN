/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const container = css`
  width: 20vw;
  height: auto;
  display: flex;
  justify-content: center;
`;

const content = css`
  border: 1px solid #bbbbbb;
  background-color: #000000;
  color: white;
  width: 70%;
  border-radius: 10px;
  height: 4vh;
  margin-top: 3vh;
  margin-bottom: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #d23131;
  }
`;

function SpeedDialTable({
  data,
  page,
  setPage,
  length,
  SIZE,
}: {
  data: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  length: number;
  SIZE: number;
}) {
  const navigation = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const goToRegistrationPage = (id: string) => {
    navigation(`/user/car/sale/${id}`);
  };

  return (
    <div
      css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <span css={{ fontSize: "1.3rem", fontWeight: "900" }}>차량 선택</span>
      <div css={container}>
        {data?.map((car: any) => {
          return (
            <div
              key={car.id}
              css={content}
              onClick={() => goToRegistrationPage(car.id)}
            >
              {`${car.maker} / ${car.modelNm}`}
            </div>
          );
        })}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={length ? Math.ceil(length / SIZE) : 1}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
export default SpeedDialTable;
