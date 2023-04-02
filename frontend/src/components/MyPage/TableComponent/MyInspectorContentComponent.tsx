import styled from "@emotion/styled";
import InspectorContentPagination from "./../Pagination/InspectorContentPagination";

const ITEMS_PER_PAGES = 5;

const StyleMyInspectorContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyInspectorContentComponent = () => {
  return (
    <StyleMyInspectorContentTableDiv>
      <InspectorContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyInspectorContentTableDiv>
  );
};

export default MyInspectorContentComponent;
