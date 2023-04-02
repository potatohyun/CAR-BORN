/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavCompany from "../../components/company/NavCompnay";
import RegisterForm from "../../components/company/RegisterForm";
import car from "../../assets/giup-car.png";
import { useLocation } from "react-router-dom";
import InsuranceForm from "../../components/company/insurance/InsuranceForm";

const container = css`
  width: 100%;
  height: 88.5vh;
  background-color: black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .backImg {
    height: 75%;
    width: 75%;
    opacity: 0.6;
    position: absolute;
    z-index: 0;
  }
`;

export default function Register() {
  const isInsurance = useLocation().pathname === "/insurance/register";
  console.log(useLocation().pathname);
  return (
    <>
      <NavCompany />
      <div css={container}>
        <img src={car} className="backImg" />
        {isInsurance ? <InsuranceForm /> : <RegisterForm />}
      </div>
    </>
  );
}
