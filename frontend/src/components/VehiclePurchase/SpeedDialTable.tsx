/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

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

function SpeedDialTable({ data }: any) {
  const navigation = useNavigate();

  const goToRegistrationPage = (id: string) => {
    navigation(`/user/car/sale/${id}`);
  };

  return (
    <>
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
    </>
  );
}
export default SpeedDialTable;
