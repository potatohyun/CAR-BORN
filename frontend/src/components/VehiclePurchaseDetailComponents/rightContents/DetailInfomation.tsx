/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { Params } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import CarModel from "./CarModel";
import CarNumber from "./CarNumber";
import CarCost from "./CarCost";
import CarContent from "./CarContent";
import CarDistance from "./CarDistance";
import WatchFileBtn from "./WatchFileBtn";
import PurchaseApplicationBtn from "./PurchaseApplicationBtn";
// import Loading from "../../Loading";
import Loading from "../../Loading";
import { useAPI } from "../../../hooks/useAPI";
import ErrorComponent from "../../ErrorComponent";

const rightContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 80vh;
`;

const API = `https://jsonplaceholder.typicode.com/todos/1`;

// 내부 컨텐츠
const DetailInfomationComponent = ({ setError }: any) => {
  const getCarInfo = useAPI("get", API);
  const { data } = useQuery("car-detail", () => getCarInfo, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
    },
    onError: (error) => {
      setError(error);
    },
    suspense: true,
    useErrorBoundary: true,
  });

  return (
    <div css={rightContent}>
      <h2 style={{ textAlign: "center" }}>상세정보</h2>
      <CarModel />
      <CarNumber />
      <CarCost />
      <CarContent />
      <CarDistance />
      <WatchFileBtn />
      <PurchaseApplicationBtn />
    </div>
  );
};

function DetailInfomation({ carId }: Readonly<Params<string>>) {
  const [error, setError] = useState<Error | null>(null);
  return (
    <ErrorBoundary
      fallback={<ErrorComponent queryKey={"car-detail"} error={error} />}
    >
      <Suspense fallback={<Loading />}>
        <DetailInfomationComponent setError={setError} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default DetailInfomation;
