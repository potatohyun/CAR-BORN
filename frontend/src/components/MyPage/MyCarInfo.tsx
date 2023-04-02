import Nav from "./../Nav";
import styled from "@emotion/styled";
import MyCarDataComponent from "./TableComponent/MyCarDataComponent";
import Nav2 from "../Nav2";

// 캐러셀 CSS
const StyleMyCarInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MyCarInfo = () => {
  return (
    <>
      <Nav2 />
      <StyleMyCarInfoContainer>
        <MyCarDataComponent />
      </StyleMyCarInfoContainer>
    </>
  );
};

export default MyCarInfo;
