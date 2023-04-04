import axios from "axios";

// export const API_URL = "https://carborn.site";
export const CARBORN_SITE = "https://carborn.site";
// export const CARBORN_SITE = "http://192.168.100.80";
export const API_URL = "http://localhost:3001";
export const ContentType = "Content-Type";
export const applicationjson = "application/json";
export const Authorization = "Authorization";
export const multipart_formData = "multipart/form-data";

const ObjString: string | null = localStorage.getItem("login-token");
const Obj = ObjString ? JSON.parse(ObjString) : null;
const accessToken = Obj ? Obj.value : null;

// 로그인
export const LoginApi = async (payload: any): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${CARBORN_SITE}/api/login`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: {
        id: payload.loginid,
        pwd: payload.loginpassword,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

// 로그아웃
export const LogoutApi = async (): Promise<any> => {

  try {
    const response = await axios({
      method: "GET",
      url: `${CARBORN_SITE}/api/logout`,
      headers: {
        [Authorization]: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 유저 회원가입 요청
export const userSignUpSendApi = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(`${CARBORN_SITE}/api/join`, {
      method: "POST",
      body: formData,
    });

    return response.body;
  } catch (error) {
    console.log(error);
  }
};

// 기업 회원가입 요청
export const companySignUpSendApi = async (
  formData: FormData
): Promise<any> => {
  try {
    const response = await fetch(`${CARBORN_SITE}/api/join`, {
      method: "POST",
      body: formData,
    });
    console.log(response);

    return response.body;
  } catch (error) {
    console.log(error);
  }
};

// 아이디 중복체크
export const UserIdCheckApi = async (id: string): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${CARBORN_SITE}/api/check-id/${id}`,
    });

    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

// 기업 아이디 중복체크
export const CompanyIdCheckApi = async (id: string): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${CARBORN_SITE}/api/check-id/${id}`,
    });

    // true는 가입할수 있는 상태, false는 가입 못하는 상태
    console.log(response.data.message);

    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

type PayloadType = {
  userid: string;
  phonenumber: string,
  newpassword: string
};

// 비밀번호 바꾸기 전에 아이디랑 이름 일치하는지 확인
export const passwordCheckIdApi = async (
  payload: PayloadType
): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${CARBORN_SITE}/api/find-pw`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: {
        id: payload.userid,
        phoneNo: payload.phonenumber
      }
    });

    console.log(response)

    return response
  } catch (error) {
    console.log(error);
  }
};

// 비밀번호 수정본 반영해주기
export const newPasswordApi = async (payload: PayloadType): Promise<any> => {
  console.log(payload);
  try {
    const response = await axios({
      method: "PATCH",
      url: `${CARBORN_SITE}/api/reset-pw`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: {
        id: payload.userid,
        phoneNo: payload.phonenumber,
        pwd: payload.newpassword
      }
    });

    console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};

export type UserType = {
  name: string;
  phone: string;
  verify: boolean;
};

// 휴대폰 인증(회원가입(유저, 기업))
export const PhoneNumberCheckApi = async (
  phonenumber: string
): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${CARBORN_SITE}/api/sms-auth-send`,
      data: {
        phoneNm: phonenumber,
      },
      headers: {
        [ContentType]: applicationjson,
      },
    });

    // 인증되면 true, 아니면 false
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 휴대폰 인증(비밀번호 재설정, 아이디 찾기할 때)
export const SearchIdCheckApi = async (payload: any): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${CARBORN_SITE}/api/find-id`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: {
        name: payload.name,
        phoneNo: payload.phonenumber,
      },
    });

    console.log(response.data.message);

    return response;
  } catch (error) {
    console.log(error);
  }
};

// 유저 인증번호랑 전화번호 보내주면서, 인증여부 확인하기
export const smsAuthApi = async (payload: any): Promise<any> => {
  try {
    // 전화번호, 인증번호 넘겨주기
    const response: any = await axios({
      method: "POST",
      // 수정해야함
      url: `${CARBORN_SITE}/api/sms-auth`,
      data: {
        phoneNm: payload.phoneNumber,
        authNm: payload.inputValue,
      },
      headers: {
        [ContentType]: applicationjson,
      },
    });
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

// 약관 동의 불러오기
export const GetAgreementApi = async (): Promise<any> => {
  try {
    const response = await axios({
      method: "GET",
      url: `${CARBORN_SITE}/`,
    });

    console.log(response)

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 검수 리뷰 작성
export const createInspectorReviewApi = async (data: any): Promise<any> => {
  const ObjString: any = localStorage.getItem("login-token");
  const Obj = JSON.parse(ObjString);
  let userid = Obj.userId;

  let reviewObj = {
    reviewInput: data.reviewInput,
    userId: userid,
    carId: parseInt(data.carId),
    rating: data.rating,
  };

  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/inspectorreviewwrite`,
      data: reviewObj,
      headers: {
        [ContentType]:applicationjson,
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 정비 리뷰 작성
export const createRepairReviewApi = async (data: any): Promise<any> => {
  const ObjString: any = localStorage.getItem("login-token");
  const Obj = JSON.parse(ObjString);
  let userid = Obj.userId;

  try {
    const response = await axios({
      method: "POST",
      url: `${CARBORN_SITE}/api/user/repair/result/review/${data.detailId}`,
      data: {
        account : {
          id : userid
        },
        content : data.reviewInput,
        point: data.rating,
      },
      headers: {
        [ContentType]:applicationjson,
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 사용자 회원 탈퇴
export const userinfoDeleteApi = async (userId: string) => {
  try {
    const response = await axios({
      method: "DELETE",
      // url: `${API_URL}/users/${userid}`,
      url: `${API_URL}/userdelete/${userId}`,
      headers: {
        [ContentType]:applicationjson,
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 기업 회원 탈퇴
export const companyinfoDeleteApi = async (userId: string) => {
  try {
    const response = await axios({
      method: "DELETE",
      // url: `${API_URL}/users/${userid}`,
      url: `${API_URL}/companydelete/${userId}`,
      headers: {
        [ContentType]:applicationjson,
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DB 리뷰 체킹
export const getReviewedCheckingApi = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/reviewrite`,
    });

    // 여기서 비교하고 들어가자
    for (let review of response.data) {
      if (
        payload.userId === review.userid &&
        payload.carId === parseInt(review.data.carId)
      ) {
        payload.isReview = false;
        break;
      }
    }

    return payload;
  } catch (error) {
    console.log(error);
  }
};

// 마이페이지에서 유저 비밀번호 바꾸기
export const userModifyPasswordApi = async (payload: any) => {
  const { oldPassword, newPassword } = payload;
  const ObjString = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;

  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/mypage/${Obj.userId}`,
      data: {
        oldPassword,
        newPassword,
      },
      headers: {
        [ContentType]: applicationjson,
        [Authorization]: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 마이페이지에서 기업 비밀번호 바꾸기
export const companyModifyPasswordApi = async (payload: any) => {
  const { oldPassword, newPassword } = payload;
  const ObjString = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;

  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/mypage/${Obj.userId}`,
      data: {
        oldPassword,
        newPassword,
      },
      headers: {
        [ContentType]: applicationjson,
        [Authorization]: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
