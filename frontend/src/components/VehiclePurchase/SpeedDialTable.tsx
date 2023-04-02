/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const container = css`
  width: 20vw;
  height: auto;
  border: 1px solid black;
`;

const content = css`
  width: 100%;
  height: 30%;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

function SpeedDialTable({ data }: any) {
  const navigation = useNavigate();

  const goToRegistrationPage = (id: string) => {
    navigation(`/user/car/sale/${id}`);
  };

  return (
    <>
      <span>내 차량</span>
      <div css={container}>
        {data?.map((car: any) => {
          return (
            <div
              key={car.id}
              css={content}
              onClick={() => goToRegistrationPage(car.id)}
            >
              {car.modelNm}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default SpeedDialTable;
