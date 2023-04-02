/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import carsImg from "../../assets/cars.png";
import engineerImg from "../../assets/engineer.png";
import transactionImg from "../../assets/transection.png";
import gumsuImg from "../../assets/gumsu.png";
import { useQueries } from "react-query";
import { useAPI } from "./../../hooks/useAPI";

// const { data } = useQueris()

const container = css`
  display: flex;
  align-items: center;
  height: auto;
  position: relative;
  flex-direction: column;

  .header {
    height: auto;
    width: 70vw;
    text-align: center;
    position: relative;
  }

  .desciprtion {
    height: auto;
    display: flex;
    justify-content: center;
  }

  .card {
    text-align: center;
    width: 30vw;
    height: 8vw;
    margin: 1.5vw 1.5vw 1.5vw 1.5vw;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .card > div:first-of-type {
    font-size: 25px;
    font-weight: bold;
  }
  .cardDetail {
    width: 30%;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 30px;
      font-weight: bolder;
      color: black;
    }
  }

  img {
    width: 5vw;
    height: 5vw;
  }
`;

export default function HomeCarsInfo() {
  const URL = "https://carborn.site/";
  const getRepairCount = useAPI("get", `${URL}api/user/repair/count`);
  const getInspectorCount = useAPI("get", `${URL}api/user/inspector/count`);
  const getCarCount = useAPI("get", `${URL}api/user/car/count`);
  const getCarTradeCount = useAPI("get", `${URL}api/user/car-trade/count`);
  const [{ data }, { data: data1 }, { data: data2 }, { data: data3 }] =
    useQueries([
      {
        queryKey: "getRepairCount",
        queryFn: () => getRepairCount,
      },
      {
        queryKey: "getInspectorCount",
        queryFn: () => getInspectorCount,
      },
      {
        queryKey: "getCarCount",
        queryFn: () => getCarCount,
      },
      {
        queryKey: "getCarTradeCount",
        queryFn: () => getCarTradeCount,
      },
    ]);

  console.log(data1, data2, data3);

  return (
    <div css={container}>
      <div className="header">
        <p css={{ fontSize: "30px", fontWeight: "bold" }}>
          차량 거래 및 관련 파트너사 정보
        </p>
        <hr />
        <div css={{ padding: "0 100px" }}>
          <p css={{ fontSize: "20px" }}>
            우리 회사를 방문해주셔서 감사합니다. 저희는 항상 사용자 중심의
            서비스를 제공하며, 사용자들의 요구에 부응하여 지속적으로 서비스를
            개선하고 있습니다. 저희와 함께 안전하고 편리한 중고차 거래를
            경험해보세요.
          </p>
        </div>
      </div>
      <div className="desciprtion">
        <div className="cards">
          <div className="card">
            <div>The number of vehicles</div>
            <div className="cardDetail">
              <img src={carsImg} />
              <p>{data?.data?.message}</p>
            </div>
          </div>
          <div className="card">
            <div>Maintenance Network</div>
            <div className="cardDetail">
              <img src={transactionImg} />
              <p>{data1?.data?.message}</p>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div>The number of transactions</div>
            <div className="cardDetail">
              <img src={engineerImg} />
              <p>{data2?.data?.message}</p>
            </div>
          </div>
          <div className="card">
            <div>Inspection partners</div>
            <div className="cardDetail">
              <img src={gumsuImg} />
              <p>{data3?.data?.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
