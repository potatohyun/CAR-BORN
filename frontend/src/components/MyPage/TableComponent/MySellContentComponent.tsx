import styled from "@emotion/styled";
import SellContentPagination from "../Pagination/SellContentPagination";

const ITEMS_PER_PAGES = 5;

const StyleMySellContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MySellContentComponent = () => {
  return (
    <StyleMySellContentTableDiv>
      <SellContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMySellContentTableDiv>
  );
};

export default MySellContentComponent;
