/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useQuery } from "react-query";
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
import {
  InspectDataType,
  InsuranceDataType,
  RepairDataType,
} from "../VehiclePurchaseDetailType";

const rightContent = css`
  width: 30vw;
  height: 90vh;
  margin-top: 10vh;
`;

const SIZE: number = 5;

// 내부 컨텐츠
const DetailInfomationComponent = ({
  setError,
  page,
  setPage,
  id,
  setImg,
}: {
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  id?: string;
  setImg: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const API = `https://carborn.site/api/user/car/sale/${id}/${page}/${SIZE}`;
  const getCarDetail = useAPI("get", API);

  const { data } = useQuery(["get-car-detail", page], () => getCarDetail, {
    staleTime: 0,
    cacheTime: 1000 * 300,
    retry: false,
    select: (data) => {
      return data.data.message;
    },
    onError: (error: Error) => {
      setError(error);
    },
    onSuccess: (data) => {
      setImg(data.img);
      return data;
    },
    suspense: true,
    useErrorBoundary: true,
  });

  return (
    <div css={rightContent}>
      <h2 style={{ textAlign: "center" }}>상세정보</h2>
      <hr
        style={{
          background: "#D23131",
          border: "0",
          height: "2px",
          marginBottom: "5%",
        }}
      />

      <CarModel data={data.detail} />
      <CarNumber data={data.detail} />
      <CarCost data={data.detail} />
      <CarDistance data={data.detail} />
      <CarContent data={data.detail} />
      <WatchFileBtn<RepairDataType>
        data={data.repair.content}
        value={1}
        page={page}
        setPage={setPage}
      />
      <WatchFileBtn<InspectDataType>
        data={data.inspect.content}
        value={2}
        page={page}
        setPage={setPage}
      />
      <WatchFileBtn<InsuranceDataType>
        data={data.insurance.content}
        value={3}
        page={page}
        setPage={setPage}
      />
      <PurchaseApplicationBtn DetailData={data} id={id} />
    </div>
  );
};

function DetailInfomation({
  id,
  setImg,
}: {
  id?: string;
  setImg: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  return (
    <ErrorBoundary
      fallback={
        <ErrorComponent queryKey={["get-car-detail", page]} error={error} />
      }
    >
      <Suspense fallback={<Loading />}>
        <DetailInfomationComponent
          setError={setError}
          page={page}
          setPage={setPage}
          id={id}
          setImg={setImg}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

export default DetailInfomation;
