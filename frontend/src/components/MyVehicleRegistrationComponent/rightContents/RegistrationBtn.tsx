import axios from "axios";
import { useMutation } from "react-query";
import {
  Props,
  RegistrationInfo,
} from "./../../../routes/userUseFnc/MyVehicleRegistration";

interface APIType {
  API: string;
}
interface NewRegistrationInfoType {
  newRegistrationInfo: Partial<RegistrationInfo>;
}

type RegistrationBtnType = Props<
  React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>
> &
  APIType &
  NewRegistrationInfoType;

function RegistrationBtn({
  registrationInfo,
  setRegistrationInfo,
  newRegistrationInfo,
  API,
}: RegistrationBtnType) {
  // mutation 함수
  const fileUpLoadAPI = (data: FormData) => {
    return axios({
      method: "post",
      url: API,
      data: data,
    });
  };

  const { mutate } = useMutation(fileUpLoadAPI);

  // 등록하기 버튼 누름
  const onFileUpload = () => {
    const formData = new FormData();

    (registrationInfo?.files || []).forEach((file) => {
      // 파일 데이터 저장
      formData.append("multipartFiles", file);
    });

    if (newRegistrationInfo) {
      formData.append("stringFoodDto", JSON.stringify(newRegistrationInfo)); // 직렬화하여 객체 저장
    }
    mutate(formData); // post 요청 실행
  };

  return (
    <div>
      {/* 등록하기 버튼 */}
      <button onClick={onFileUpload}>등록하기</button>
    </div>
  );
}

export default RegistrationBtn;
