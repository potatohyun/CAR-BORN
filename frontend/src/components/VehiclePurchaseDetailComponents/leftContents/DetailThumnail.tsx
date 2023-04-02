/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loading from "../../Loading";
import { useAPI } from "./../../../hooks/useAPI";
import ErrorComponent from "../../ErrorComponent";
import { useState } from "react";
import { Props } from "../VehiclePurchaseDetailType";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import car from "../../../assets/car.png";

const leftContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 80vh;
  margin-right: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const API = `https://jsonplaceholder.typicode.com/todos/1`;

function DetailThumnailContent({ setError }: Pick<Props, "setError">) {
  const getThumnail = useAPI("get", API);
  const { data } = useQuery("get-thumnail", () => getThumnail, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
    },
    onError: (error: Error) => {
      setError(error);
    },
    suspense: true,
    useErrorBoundary: true,
  });
  return (
    <div css={leftContent}>
      <Carousel>
        <div>
          <img src={car} alt="qwe" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={car} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={car} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
}

function DetailThumnail() {
  const [error, setError] = useState<Error | null>(null);
  return (
    <ErrorBoundary
      fallback={<ErrorComponent queryKey={"get-thumnail"} error={error} />}
    >
      <Suspense fallback={<Loading />}>
        <DetailThumnailContent setError={setError} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default DetailThumnail;
