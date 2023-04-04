import styled from "@emotion/styled";
import MyCarInfoPagination from "../Pagination/MyCarInfoPagination";

const StyleMyCarInfoTableDiv = styled.div`
  width: 72%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  margin-bottom: 15vh;
  /* background-color: #fffffff6; */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  `;

const MyCarDataComponent = () => {
  const ITEMS_PER_PAGE = 10;

  return (
    <StyleMyCarInfoTableDiv>
      <MyCarInfoPagination itemsPerPage={ITEMS_PER_PAGE} />
    </StyleMyCarInfoTableDiv>
  );
};

export default MyCarDataComponent;
