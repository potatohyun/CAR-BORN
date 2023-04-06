/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeCarModel from "../../components/UserHome/HomeCarModel";
import HomeIconMenu from "../../components/UserHome/HomeIconMenu";
import HomeMainMenu from "../../components/UserHome/HomeMainMenu";
import HomeCarForSales from "../../components/UserHome/HomeCarForSales";
import HomeWhyCooseUs from "../../components/UserHome/HomeWhyChooseUs";
import HomeCarsInfo from "../../components/UserHome/HomeCarsInfo";
import Nav2 from "../../components/Nav2";
import Footer from "../../components/Footer";
import { ScrollTrigger, gsap } from "gsap/all";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loginFailureReset } from "../../modules/takeLoginLogoutModule";
import { useDispatch } from 'react-redux';

const container = css`
  position: absolute;
  top: 15.5vh;
  z-index: 3;
  width: 100%;
  height: 393.5vh;
`;

export default function UserHome() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.LoginOutReducer.success);
  
  useEffect(() => {
    if (isLoggedIn === undefined) {
      dispatch(loginFailureReset());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".carSale", {
      y: "20vh",
      scrollTrigger: {
        trigger: ".carSale",
        start: "top 50%",
        end: "top 50%",
        scrub: 1,
      },
    });
    gsap.to(".homeMenu", {
      opacity: 0.2,
      scrollTrigger: {
        trigger: ".carSale",
        start: "top 50%",
        end: "top 50%",
        scrub: 1,
      },
    });

    gsap.to(".homeInfo", {
      yPercent: -50,
      scrollTrigger: {
        trigger: ".homeInfo",
        start: "top 80%",
        end: "top 80%",
        scrub: 2,
      },
    });
    gsap.to(".homeChoose", {
      opacity: 0.2,
      scrollTrigger: {
        trigger: ".homeInfo",
        start: "top 80%",
        end: "top 80%",
        scrub: 1,
      },
    });
  }, []);
  return (
    <>
      <Nav2 home={"home"} />
      <div css={container}>
        <HomeCarModel />
        <HomeIconMenu />
        <div className="homeMenu">
          <HomeMainMenu />
        </div>
        <div className="carSale">
          <HomeCarForSales />
        </div>
        <div className="homeChoose">
          <HomeWhyCooseUs />
        </div>
        <div className="homeInfo">
          <HomeCarsInfo />
          <Footer />
        </div>
      </div>
    </>
  );
}
