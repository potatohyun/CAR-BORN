/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useInfiniteQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { SearchType } from "../VehiclePurchaseType";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorComponent from "../../ErrorComponent";
import Loading from "../../Loading";
import SpeedDialComponent from "../SpeedDialComponent";

const rightContent = css`
  width: 75vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8vw;
  .btn {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 65px;
    height: 20px;
    background-color: red;
    color: white;
    border-color: red;
    font-size: x-small;
  }
`;

const infoBox = css`
  width: 95%;
  background-color: beige;
  height: 40%;
  margin-top: 3%;
  display: flex;
  align-items: center;
  position: relative;
`;

const imgStyle = css`
  height: 80%;
  width: 30%;
  margin-left: 2%;
  margin-right: 2%;
`;

const textStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 2%;
  justify-content: space-around;
`;

let intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.3,
};

const SIZE: number = 5;
const CAR_URL = process.env.REACT_APP_IMG_URL;

function CarList({ searchInfo }: { searchInfo: SearchType }) {
  const divRef = useRef<HTMLDivElement | any>({});
  const navigation = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const { data, fetchNextPage, hasNextPage, isError, isLoading } =
    useInfiniteQuery(
      "infinity-scroll",
      ({ pageParam = 1 }) => {
        return axios({
          method: "get",
          url: `https://carborn.site/api/user/car/sale/list/${pageParam}/${SIZE}/${searchInfo.sortType}`,
        });
      },
      {
        retry: false,
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.data.message.totalPages > allPages.length) {
            return allPages.length + 1;
          }
        },
        onSuccess: (data) => {
          return data;
        },
        onError: (error: Error) => {
          setError(error);
        },
      }
    );

  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    });
  }, intersectionOptions);

  useEffect(() => {
    if (divRef?.current && data) {
      let lastPage =
        (data.pages.length - 1) * SIZE +
        data.pages[data.pages.length - 1].data.message.content.length -
        1;
      intersection.observe(divRef?.current[lastPage]);
    }
  }, [data]);

  const goToDetil: any = (id: number) => {
    navigation(`/user/car/${id}`);
  };

  if (isError) {
    return (
      <div css={rightContent}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ErrorComponent error={error} queryKey={"infinity-scroll"} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div css={rightContent}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div css={rightContent}>
      {data?.pages.map((item) => {
        let cnt = 0;

        return item?.data?.message.content.map((car: any, index: number) => {
          return (
            <div
              css={infoBox}
              key={index}
              ref={(ref) => {
                divRef.current[cnt] = ref;
                cnt++;
              }}
            >
              <button className="btn" onClick={() => goToDetil(car.carId)}>
                Detail
              </button>
              <img src={`${CAR_URL}${car.imgNm}`} alt="carImg" css={imgStyle} />
              <div css={textStyle}>
                <div>
                  <div>{`${car.modelYear} ${car.modelNm} | ${parseInt(
                    car.mileage
                  ).toLocaleString("ko-KR")}km`}</div>
                  <div style={{ border: "2px solid red", width: "3vw" }}></div>
                </div>

                <div>{car.content}</div>
                <div>{`${parseInt(car.price).toLocaleString("ko-KR")}￦`}</div>
              </div>
            </div>
          );
        });
      })}
      {/* 스피드 다이얼 */}
      <SpeedDialComponent />
    </div>
  );
}

export default CarList;
