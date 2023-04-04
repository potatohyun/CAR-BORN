import styled from "@emotion/styled";
import BuyContentPagination from "../Pagination/BuyContentPagination";

const StyleMyBuyContentTableDiv = styled.div`
  width: 72%;
  height: 56vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  margin-bottom: 15vh;
  /* background-color: #fffffff6; */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
`;

const MyBuyContentComponent = () => {
  const ITEMS_PER_PAGES = 4;

  return (
    <StyleMyBuyContentTableDiv>
      <BuyContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyBuyContentTableDiv>
  );
};

export default MyBuyContentComponent;
