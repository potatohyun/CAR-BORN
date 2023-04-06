/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Nav2 from "./../../components/Nav2";
import Articles from "../../components/community/Articles";
import Footer from "../../components/Footer";
import CreateNewWriteBtn from "../../components/community/CreateNewWriteBtn";

function Community() {
  return (
    <div css={{ position: "relative" }}>
      <Nav2 />
      <Articles />
      <div
        css={{ position: "fixed", bottom: "50px", right: "50px", zIndex: "2" }}
      >
        <CreateNewWriteBtn />
      </div>
      <Footer />
    </div>
  );
}

export default Community;
