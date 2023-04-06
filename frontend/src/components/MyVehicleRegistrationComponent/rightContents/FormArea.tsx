/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";
import AdditionalSubmissionFiles from "./AdditionalSubmissionFiles";
import CarModel from "./CarModel";
import CarNumber from "./CarNumber";
import CarYear from "./CarYear";
import DistanceDriven from "./DistanceDriven";
import ManufacturingCompany from "./ManufacturingCompany";
import RegistrationBtn from "./RegistrationBtn";
import VehicleIdentificationNumber from "./VehicleIdentificationNumber";
import VehicleRegistrationCertificate from "./VehicleRegistrationCertificate";

const rightContent = css`
  width: 30vw;
  height: auto;
  margin-top: 10vh;
`;

const API = `https://carborn.site/api/user/car`;

function FormArea({
  registrationInfo,
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  return (
    <div css={rightContent}>
      <h3 style={{ textAlign: "center" }}>차량 등록</h3>
      <hr style={{ background: "#D23131", border: "0", height: "2px" }} />

      {/* 제조사 */}
      <ManufacturingCompany setRegistrationInfo={setRegistrationInfo} />
      {/* 차량모델 */}
      <CarModel setRegistrationInfo={setRegistrationInfo} />
      {/* 차량번호 */}
      <CarNumber setRegistrationInfo={setRegistrationInfo} />
      {/* 차대번호 */}
      <VehicleIdentificationNumber setRegistrationInfo={setRegistrationInfo} />
      {/* 연식 */}
      <CarYear setRegistrationInfo={setRegistrationInfo} />
      {/* 주행거리 */}
      <DistanceDriven setRegistrationInfo={setRegistrationInfo} />
      {/* 자동차 동록증 */}
      <VehicleRegistrationCertificate
        registrationInfo={registrationInfo}
        setRegistrationInfo={setRegistrationInfo}
      />
      {/* 자동차 파일 */}
      <AdditionalSubmissionFiles
        registrationInfo={registrationInfo}
        setRegistrationInfo={setRegistrationInfo}
      />
      {/* 등록하기 버튼 */}
      <RegistrationBtn
        registrationInfo={registrationInfo}
        setRegistrationInfo={setRegistrationInfo}
        API={API}
      />
    </div>
  );
}
export default FormArea;
