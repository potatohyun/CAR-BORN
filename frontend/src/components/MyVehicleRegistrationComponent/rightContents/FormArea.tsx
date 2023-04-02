/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";
import AdditionalSubmissionFiles from "./AdditionalSubmissionFiles";
import CarNumber from "./CarNumber";
import CarYear from "./CarYear";
import DistanceDriven from "./DistanceDriven";
import ManufacturingCompany from "./ManufacturingCompany";
import RegistrationBtn from "./RegistrationBtn";

const rightContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 90vh;
`;

const API = `http://192.168.100.176:8080/uploadFiles`;

function FormArea({
  registrationInfo,
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const newRegistrationInfo = {
    manufacturingCompany: registrationInfo?.manufacturingCompany,
    carNumber: registrationInfo?.carNumber,
    carYear: registrationInfo?.carYear,
    distanceDriven: registrationInfo?.distanceDriven,
  };

  return (
    <div css={rightContent}>
      <h2 style={{ textAlign: "center" }}>차량 등록</h2>
      <hr />

      {/* 제조사 / 차량모델 */}
      <ManufacturingCompany setRegistrationInfo={setRegistrationInfo} />
      {/* 차량번호 */}
      <CarNumber setRegistrationInfo={setRegistrationInfo} />
      {/* 연식 */}
      <CarYear setRegistrationInfo={setRegistrationInfo} />
      {/* 주행거리 */}
      <DistanceDriven setRegistrationInfo={setRegistrationInfo} />
      {/* 추가 제출 파일 */}
      <AdditionalSubmissionFiles
        registrationInfo={registrationInfo}
        setRegistrationInfo={setRegistrationInfo}
      />
      {/* 등록하기 버튼 */}
      <RegistrationBtn
        registrationInfo={registrationInfo}
        setRegistrationInfo={setRegistrationInfo}
        newRegistrationInfo={newRegistrationInfo}
        API={API}
      />
    </div>
  );
}
export default FormArea;
