/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import SaleInfoArea from "../../components/SaleRegistrationComponents/rightContents/SaleInfoArea";
import SaleCarImg from "./../../components/SaleRegistrationComponents/leftContents/SaleCarImg";
import { useState } from "react";
import Nav2 from "./../../components/Nav2";
import Footer from "../../components/Footer";

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

function SaleRegistration() {
  const [imgs, setImg] = useState<string[]>([]);

  return (
    <>
      <Nav2 />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 컨텐츠 */}
          <SaleCarImg imgs={imgs} />
          {/* 오른쪽 컨텐츠*/}
          <SaleInfoArea setImg={setImg} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SaleRegistration;
