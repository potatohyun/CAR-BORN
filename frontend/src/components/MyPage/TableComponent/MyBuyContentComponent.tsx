import styled from '@emotion/styled';
import BuyContentPagination from '../Pagination/BuyContentPagination';

const ITEMS_PER_PAGES = 5;

const StyleMyBuyContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MyBuyContentComponent = () => {

  return (
    <StyleMyBuyContentTableDiv>
      <BuyContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyBuyContentTableDiv>
  )
}

export default MyBuyContentComponent;