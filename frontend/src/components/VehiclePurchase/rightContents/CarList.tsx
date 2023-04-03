/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useInfiniteQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorComponent from "../../ErrorComponent";
import Loading from "../../Loading";
import SpeedDialComponent from "../SpeedDialComponent";
import NoCarList from "./NoCarList";
import { useSelector } from "react-redux";
import { StateType } from "../../../modules/carListModule";

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

interface CarType {
  accountId: string;
  carId: number;
  content: string;
  id: number;
  imgNm: string | null;
  maker: string;
  mileage: string;
  modelNm: string;
  modelYear: string;
  price: string;
  regDt: string;
  saleStatus: number;
  uptDt: string;
}

let intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.3,
};

const SIZE: number = 5;
const CAR_URL = process.env.REACT_APP_IMG_URL;

function CarList() {
  let cnt = 0;
  const divRef = useRef<HTMLDivElement | any>({});
  const navigation = useNavigate();
  const [error, setError] = useState<Error | null>(null);
  const { sortType, keyword, keywordType } = useSelector(
    ({ carListReducer }: { carListReducer: StateType }) => carListReducer
  );

  const SORT_API = (pageParam: number) => {
    return `https://carborn.site/api/user/car/sale/list/${pageParam}/${SIZE}/${sortType}`;
  };
  const SEARCH_API = (pageParam: number) => {
    return `https://carborn.site/api/user/car/sale/list/${pageParam}/${SIZE}/${sortType}/${keywordType}/${keyword}`;
  };

  const { data, fetchNextPage, hasNextPage, isError, isLoading } =
    useInfiniteQuery(
      "infinity-scroll",
      ({ pageParam = 1 }) => {
        return axios({
          method: "get",
          url:
            keyword && keywordType
              ? SEARCH_API(pageParam)
              : SORT_API(pageParam),
        });
      },
      {
        retry: false,
        keepPreviousData: true,
        useErrorBoundary: true,
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

  // 데이터가 비었는지 확인하는 변수
  const isData = !!data?.pages[0].data.message.content.length;

  useEffect(() => {
    if (divRef?.current && isData && data) {
      let lastPage =
        (data.pages.length - 1) * SIZE +
        data.pages[data.pages.length - 1].data.message.content.length -
        1;
      intersection.observe(divRef?.current[lastPage]);
    }
  }, [data]);

  const goToDetil = (carId: number, id: number) => {
    navigation(`/user/car/${carId}/${id}`);
  };

  // 에러가 발생했을 시
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

  // 로딩중일 때
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
      {isData ? (
        data?.pages.map((item) => {
          return item?.data?.message.content.map(
            (car: CarType, index: number) => {
              if (!car?.saleStatus) {
                return (
                  // 검색 결과
                  <div
                    css={infoBox}
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        divRef.current[cnt] = ref;
                        cnt++;
                      }
                    }}
                  >
                    <button
                      className="btn"
                      onClick={() => goToDetil(car.carId, car.id)}
                    >
                      Detail
                    </button>
                    <img
                      src={`${CAR_URL}${car.imgNm}`}
                      alt="carImg"
                      css={imgStyle}
                    />
                    <div css={textStyle}>
                      <div>
                        <div>{`${car.modelYear} ${car.modelNm} | ${parseInt(
                          car.mileage
                        ).toLocaleString("ko-KR")}km`}</div>
                        <div
                          style={{ border: "2px solid red", width: "3vw" }}
                        ></div>
                      </div>

                      <div>{car.content}</div>
                      <div>{`${parseInt(car.price).toLocaleString(
                        "ko-KR"
                      )}￦`}</div>
                    </div>
                  </div>
                );
              }
            }
          );
        })
      ) : (
        // 검색 결과가 없음
        <NoCarList />
      )}
      {/* 스피드 다이얼 */}
      <SpeedDialComponent />
    </div>
  );
}

export default CarList;
