import styled from "@emotion/styled";
import MyCommunityContentPagination from "../Pagination/MyCommunityContentPagination";

const StyleMyCommunityContentTableDiv = styled.div`
  width: 72%;
  height: 74vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  margin-bottom: 15vh;
  /* background-color: #fffffff6; */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  border: 2px solid #e6e6e6;
`

const MyCommunityContentComponent = () => {
  const ITEMS_PER_PAGES = 9;

  return (
    <StyleMyCommunityContentTableDiv>
      <MyCommunityContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyCommunityContentTableDiv>
  );
};

export default MyCommunityContentComponent;
