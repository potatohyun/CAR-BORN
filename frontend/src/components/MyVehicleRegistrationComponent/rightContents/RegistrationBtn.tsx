/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import {
  Props,
  RegistrationInfo,
} from "./../../../routes/userUseFnc/MyVehicleRegistration";
import swal from "sweetalert";

interface APIType {
  API: string;
}

type RegistrationBtnType = Props<
  React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>
> &
  APIType;

const registerBtnStyle = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5vh;
  .regBtn {
    border: 0;
    width: 65%;
    height: 5.5vh;
    background-color: #e00000;
    color: white;
    font-weight: 900;
    cursor: pointer;
  }
  .backBtn {
    border: 0;
    width: 30%;
    height: 5.5vh;
    font-weight: 900;
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

function RegistrationBtn({
  registrationInfo,
  setRegistrationInfo,
  API,
}: RegistrationBtnType) {
  // mutation 함수
  const ObjString: any = localStorage.getItem("login-token");
  const fileUpLoadAPI = (data: FormData) => {
    return fetch(API, {
      method: "POST",
      body: data,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(ObjString).value}`,
      },
    });
  };

  const navigate = useNavigate();
  const { mutate } = useMutation(fileUpLoadAPI, {
    onSuccess: () => {
      navigate("/user/mypage/mycarinfo");
    },
  });

  // 등록하기 버튼 누름
  const onFileUpload = () => {
    if (
      registrationInfo?.files?.length &&
      registrationInfo?.vrc?.length &&
      registrationInfo?.carModel &&
      registrationInfo?.carYear &&
      registrationInfo?.vehicleIdentificationNumber &&
      registrationInfo?.distanceDriven &&
      registrationInfo?.carNumber &&
      registrationInfo?.manufacturingCompany
    ) {
      const formData = new FormData();

      (registrationInfo?.files || []).forEach((file) => {
        // 파일 데이터 저장
        formData.append("carImg", file);
      });
      (registrationInfo?.vrc || []).forEach((file) => {
        // 파일 데이터 저장
        formData.append("carVrc", file);
      });

      formData.append("modelNm", registrationInfo?.carModel); // 직렬화하여 객체 저장
      formData.append("modelYear", registrationInfo?.carYear); // 직렬화하여 객체 저장
      formData.append("vin", registrationInfo?.vehicleIdentificationNumber); // 직렬화하여 객체 저장
      formData.append("mileage", registrationInfo?.distanceDriven); // 직렬화하여 객체 저장
      formData.append("regNm", registrationInfo?.carNumber); // 직렬화하여 객체 저장
      formData.append("maker", registrationInfo?.manufacturingCompany); // 직렬화하여 객체 저장

      mutate(formData); // post 요청 실행
    } else {
      swal({
        title: "내용이 부족합니다.",
        text: "조금 더 채워주세요.",
        icon: "error",
        buttons: [false],
      });
    }
  };

  const back = () => {
    navigate("/");
  };

  return (
    <div css={registerBtnStyle}>
      {/* 등록하기 버튼 */}
      <button className="backBtn" onClick={back}>
        뒤로가기
      </button>
      <button className="regBtn" onClick={onFileUpload}>
        등록하기
      </button>
    </div>
  );
}

export default RegistrationBtn;
