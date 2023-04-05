/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery, useMutation } from "react-query";

import SaleManufacturingCompany from "./SaleManufacturingCompany";
import SaleCarNumber from "./SaleCarNumber";
import SaleCarYear from "./SaleCarYear";
import SaleDistanceDriven from "./SaleDistanceDriven";
import SaleCarCost from "./SaleCarCost";
import SaleCarContent from "./SaleCarContent";

import ErrorComponent from "./../../ErrorComponent";
import { Loading } from "./../../Loading";
import { useAPI } from "./../../../hooks/useAPI";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";

const rightContent = css`
  width: 30vw;
  height: 90vh;
  margin-top: 10vh;
`;

export interface SaleInfoType {
  price: string;
  content: string;
}

export interface SaleInfoContentsType {
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setSaleInfo: React.Dispatch<React.SetStateAction<SaleInfoType>>;
  saleInfo: SaleInfoType;
  setImg: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface DataType {
  data: {
    id: number;
    maker: string;
    mileage: number;
    modelNm: string;
    modelYear: string;
    regDt: string;
    regNm: string;
    uptDt: string;
    vin: string;
    walletHash: string;
  };
}

const POST_API = `https://carborn.site/api/user/car/sell`;

function SaleInfoContents({
  setError,
  setImg,
}: Pick<SaleInfoContentsType, "setError" | "setImg">) {
  const ObjString: any = localStorage.getItem("login-token");

  const [saleInfo, setSaleInfo] = useState<SaleInfoType>({
    price: "",
    content: "",
  });
  const { id: carId } = useParams();
  const navigation = useNavigate();

  const GET_API = `https://carborn.site/api/user/car/${carId}`;
  const getCarInfo = useAPI("get", GET_API, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  });

  // 자동차 정보를 받아오는 query
  const { data } = useQuery("get-car-info", () => getCarInfo, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data.message;
    },
    onError: (error: Error) => {
      setError(error);
    },
    onSuccess: (data) => {
      setImg((img) => {
        return [...data.img];
      });
    },
    suspense: true,
    useErrorBoundary: true,
  });

  // 제출할 때 실행되는 query
  const { mutate, isSuccess } = useMutation(() =>
    axios({
      method: "post",
      url: POST_API,
      data: {
        ...saleInfo,
        car: { id: data.detail.id },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(ObjString).value}`,
      },
    })
  );

  const submitInfo = () => {
    if (saleInfo.content && saleInfo.price) {
      swal({
        title: "등록이 완료되었습니다.",
        text: "2초후 자동으로 닫힙니다.",
        icon: "success",
        timer: 2000,
        buttons: [false],
      });
      mutate();
    } else {
      swal({
        text: "양식을 채워주세요",
        icon: "error",
        timer: 2000,
        buttons: [false],
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigation("/");
    }
  }, [isSuccess]);

  const back = () => {
    navigation("/");
  };

  return (
    <div css={rightContent}>
      <h2 style={{ textAlign: "center" }}>차량 판매 등록</h2>
      <hr
        style={{
          background: "#D23131",
          border: "0",
          height: "2px",
          marginBottom: "5%",
        }}
      />
      {/* 제조사 / 차량모델 */}
      <SaleManufacturingCompany data={data.detail} />
      {/* 차량번호 */}
      <SaleCarNumber data={data.detail} />
      {/* 연식 */}
      <SaleCarYear data={data.detail} />
      {/* 주행거리 */}
      <SaleDistanceDriven data={data.detail} />
      {/* 차량 가격 */}
      <SaleCarCost setSaleInfo={setSaleInfo} />
      {/* 판매내용 */}
      <SaleCarContent setSaleInfo={setSaleInfo} />
      {/* 뒤로가기 버튼 */}
      <button
        css={{
          border: "0",
          width: "30%",
          height: "5.5%",
          marginBottom: "3%",
          color: "black",
          marginRight: "5%",
          backgroundColor: "lightgray",
          cursor: "pointer",
        }}
        onClick={back}
      >
        뒤로가기
      </button>
      {/* 제출 버튼 */}
      <button
        css={{
          border: "0",
          width: "65%",
          height: "5.5%",
          marginBottom: "3%",
          color: "white",
          backgroundColor: "#D23131",
          cursor: "pointer",
        }}
        onClick={submitInfo}
      >
        제출
      </button>
    </div>
  );
}

function SaleInfoArea({
  setImg,
}: {
  setImg: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [error, setError] = useState<Error | null>(null);

  return (
    <ErrorBoundary
      fallback={<ErrorComponent error={error} queryKey={"get-car-info"} />}
    >
      <Suspense fallback={<Loading />}>
        <SaleInfoContents setError={setError} setImg={setImg} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default SaleInfoArea;
