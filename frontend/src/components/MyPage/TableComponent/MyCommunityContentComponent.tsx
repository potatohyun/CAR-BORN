import styled from "@emotion/styled";
import MyCommunityContentPagination from "../Pagination/MyCommunityContentPagination";

const ITEMS_PER_PAGES = 10;

const StyleMyCommunityContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyCommunityContentComponent = () => {
  return (
    <StyleMyCommunityContentTableDiv>
      <MyCommunityContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyCommunityContentTableDiv>
  )
}

export default MyCommunityContentComponent