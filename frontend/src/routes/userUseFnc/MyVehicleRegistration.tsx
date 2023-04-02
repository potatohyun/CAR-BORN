/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState } from "react";
import Thumnail from "../../components/MyVehicleRegistrationComponent/leftContents/Thumnail";
import FormArea from "../../components/MyVehicleRegistrationComponent/rightContents/FormArea";
import Nav2 from "./../../components/Nav2";

const outer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const content = css`
  display: flex;
  align-items: center;
`;

export interface RegistrationInfo {
  manufacturingCompany: string;
  carNumber: string;
  carYear: string;
  distanceDriven: string;
  fileList: any[];
  fileNames: any[];
  files: File[];
}

export interface Props<T> {
  registrationInfo?: Partial<RegistrationInfo>;
  setRegistrationInfo: T;
}

function MyVehicleRegistration() {
  const [registrationInfo, setRegistrationInfo] = useState<
    Partial<RegistrationInfo>
  >({
    manufacturingCompany: "",
    carNumber: "",
    carYear: "",
    distanceDriven: "",
    fileList: [],
    fileNames: [],
    files: [],
  });

  return (
    <>
      <Nav2 />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 컨텐츠 */}
          <Thumnail registrationInfo={registrationInfo} />
          {/* 오른쪽 컨텐츠*/}
          <FormArea
            setRegistrationInfo={setRegistrationInfo}
            registrationInfo={registrationInfo}
          />
        </div>
      </div>
    </>
  );
}

export default MyVehicleRegistration;
