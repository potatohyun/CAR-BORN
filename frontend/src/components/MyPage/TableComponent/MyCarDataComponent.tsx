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
  border: 2px solid #6e6e6e4c;
  border-radius: 5px;
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
