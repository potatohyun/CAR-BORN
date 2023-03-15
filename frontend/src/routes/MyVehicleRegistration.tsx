/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AdditionalSubmissionFiles from "../components/MyVehicleRegistrationComponent/AdditionalSubmissionFiles";
import CarNumber from "../components/MyVehicleRegistrationComponent/CarNumber";
import CarYear from "../components/MyVehicleRegistrationComponent/CarYear";
import DistanceDriven from "../components/MyVehicleRegistrationComponent/DistanceDriven";
import ManufacturingCompany from "../components/MyVehicleRegistrationComponent/ManufacturingCompany";
import RegistrationBtn from "../components/MyVehicleRegistrationComponent/RegistrationBtn";

import { useState } from "react";

const outer = css`
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const content = css`
  display: flex;
  align-items: center;
`;

const leftContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 400px;
  margin-right: 10vw;
`;

const rightContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 400px;
`;

export interface RegistrationInfo {
  manufacturingCompany: string;
  carNumber: string;
  carYear: string;
  distanceDriven: string;
  additionalSubmissionFiles: string | ArrayBuffer | null;
}

function MyVehicleRegistration() {
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
    manufacturingCompany: "",
    carNumber: "",
    carYear: "",
    distanceDriven: "",
    additionalSubmissionFiles: "",
  });

  return (
    <div css={outer}>
      <div css={content}>
        <div css={leftContent}>
          {/* <img
            src={
              registrationInfo.additionalSubmissionFiles
                ? registrationInfo.additionalSubmissionFiles
                : undefined
            }
            alt="올린 이미지"
          /> */}
        </div>
        <div css={rightContent}>
          <h2 style={{ textAlign: "center" }}>차량 등록</h2>
          <hr />

          {/* 제조사 / 차량모델 */}
          <ManufacturingCompany />
          {/* 차량번호 */}
          <CarNumber />
          {/* 연식 */}
          <CarYear />
          {/* 주행거리 */}
          <DistanceDriven />
          {/* 추가 제출 파일 */}
          <AdditionalSubmissionFiles
            setRegistrationInfo={setRegistrationInfo}
          />
          {/* 등록하기 버튼 */}
          <RegistrationBtn />
        </div>
      </div>
    </div>
  );
}

export default MyVehicleRegistration;
