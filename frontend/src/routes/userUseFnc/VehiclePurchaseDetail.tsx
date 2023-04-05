/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import { Params, useParams } from "react-router-dom";

import Nav2 from "../../components/Nav2";
import DetailThumnail from "../../components/VehiclePurchaseDetailComponents/leftContents/DetailThumnail";
import DetailInfomation from "../../components/VehiclePurchaseDetailComponents/rightContents/DetailInfomation";

const outer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const content = css`
  display: flex;
  align-items: center;
`;

function VehiclePurchaseDetail() {
  const { carId, id }: Readonly<Params<string>> = useParams();
  const [img, setImg] = useState<any[]>([]);

  return (
    <>
      <Nav2 />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 컨텐츠 */}
          <DetailThumnail img={img} />
          {/* 오른쪽 컨텐츠*/}
          <DetailInfomation id={id} setImg={setImg} />
        </div>
      </div>
    </>
  );
}
export default VehiclePurchaseDetail;
