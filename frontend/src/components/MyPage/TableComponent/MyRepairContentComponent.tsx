import styled from "@emotion/styled";
import RepairContentPagination from "../Pagination/RepairContentPagination";

const StyleMyRepairContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyRepairContentComponent = () => {
  const ITEMS_PER_PAGES = 5;

  return (
    <StyleMyRepairContentTableDiv>
      <RepairContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyRepairContentTableDiv>
  );
};

export default MyRepairContentComponent;
