/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import carForSaleImg from "../../assets/carForSaleImg.jpg";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger, gsap } from "gsap/all";

interface Maptype {
  IMG_NM: string;
  MODEL_NM: string;
  MODEL_YEAR: string;
  MAKER: string;
  PRICE: string;
  ID: string;
  CAR_ID: string;
}

const container = css`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-image: url(${carForSaleImg});
  background-size: cover;
  background-position: 0 60%;
  hr {
    background-color: #d23131;
    border: #d23131;
    height: 2px;
  }
  hr:nth-of-type(1) {
    width: 6vw;
    margin-bottom: 0.5px;
    margin-top: 0px;
  }

  hr:nth-of-type(2) {
    width: 2vw;
  }
`;

const header = css`
  display: flex;
  flex-direction: column;
  height: 18vh;
  align-items: center;
  /* margin-top: 70px; */
  color: white;
  p:nth-of-type(1) {
    margin: 7vh 0 5px 0;
  }
  p:nth-of-type(2) {
    margin: 0 0 0 0;
    font-size: 1.4rem;
    font-weight: bold;
  }

  &:hover {
    cursor: default;
  }

  hr {
    color: red;
    border: none;
  }
`;

const imgBox = css`
  width: 65vw;
  height: 55vh;
  position: relative;
  overflow: hidden;
  /* padding: 0 10px 0 10px; */

  &:hover {
    transition: all 0.3s;

    .Btn {
      display: inline;
      transition: all 0.3s;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bolder;
      cursor: pointer;
    }

    .leftBtn {
      left: 0;
      transition: all 0.3s;
    }
    .rightBtn {
      right: 0;
      transition: all 0.3s;
    }
    .img {
      cursor: pointer;
    }
  }
  .Btn {
    color: red;
    border: 1px solid #a8a8a8;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    top: 45%;
    position: absolute;
    z-index: 2;
    opacity: 0;
    transition: all 0.3s;
    border-radius: 5px;
    background-color: #f6f6f6;
    &:hover {
      background-color: #c5c5c5;
    }
  }
  .rightBtn {
    right: 30px;
  }

  .leftBtn {
    left: 30px;
  }

  .img {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    margin: 0 20px 0 0;
    height: 80%;
    width: 30%;
    border: none;
    position: relative;
    z-index: 2;

    .imgUrl {
      flex: 3;
    }
    .year {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1.2;
      background-color: #202223;
      color: white;
      font-size: 1rem;
      hr {
        background-color: #d23131;
        border: none;
        height: 2px;
      }
      hr:nth-last-of-type(2) {
        margin-top: 10px;
      }
    }
    .car {
      flex: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #202223;
      color: white;
      font-size: 1.1rem;
      transform: translateY(-10px);
    }
  }
`;

export default function HomeCarForSales() {
  const URL = `http://carborn.site/api/user/car-regist/list`;
  const getCarForSale = useAPI("get", URL);
  const imgWidth = window.innerWidth * 0.15125;
  const [x, setX] = useState<number>(0);
  const navigate = useNavigate();

  const { data } = useQuery("getCarForSale", () => getCarForSale, {
    select: (data) => {
      return data.data.message;
    },
  });

  const len = data?.length;
  const cars = css`
    transition: all ease 80ms 0s;
    display: flex;
    height: 100%;
    width: 80%;
    align-items: center;
    flex-wrap: nowrap;
    transform: translateX(${x}px);
    &::-webkit-scrollbar {
      display: none;
    }
  `;
  const moveRight = (): void => {
    if (-x < (len - 3) * imgWidth) setX((prev) => prev - imgWidth);
  };
  const moveLeft = (): void => {
    if (x + imgWidth < 0) {
      setX((prev) => prev + imgWidth);
    } else setX(0);
  };
  const carsRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: string, carId: string): any => {
    navigate(`/user/car/${carId}/${id}`);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".saleHr", {
      width: "30%",
      scrollTrigger: {
        trigger: ".saleHr",
        scrub: 2,
        start: "top 60%",
        end: "top 60%",
        id: "hrTag",
        ease: "bounce",
      },
    });
  }, []);
  return (
    <div css={container}>
      <div css={header}>
        <p>안전한 거래를 하세요</p>
        <p>최신 판매 등록 차량</p>
      </div>
      <hr className="saleHr" />
      <hr className="saleHr" />
      <div css={imgBox}>
        <div className="Btn rightBtn" onClick={moveRight}>
          <p>&#10095;</p>
        </div>
        <div className="Btn leftBtn" onClick={moveLeft}>
          <p>&#10094;</p>
        </div>
        <div css={cars} ref={carsRef}>
          {data?.map((data: Maptype, idx: number): any => (
            <div
              className="img"
              key={idx}
              onClick={() => handleClick(data.ID, data.CAR_ID)}
            >
              <div className="imgUrl">
                <img
                  src={`https://carborn.site/images/${data.IMG_NM}`}
                  height="100%"
                  width="100%"
                  alt="img"
                />
              </div>
              <div className="year">
                {`${data.MODEL_YEAR} ${data.MAKER} ${data.MODEL_NM}`}
                <hr
                  css={{
                    border: "2px solid #d23131",
                    color: "#d23131ed",
                    height: "2px",
                  }}
                />
                <hr
                  css={{
                    height: "2px",
                    border: "2px solid #d23131",
                    color: "#d23131ed",
                  }}
                />
              </div>
              <div className="car">
                {parseInt(data.PRICE).toLocaleString("ko-KR")} ￦
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
