import styled from "@emotion/styled";
import InsuranceContentPagination from "./../Pagination/InsuranceContentPagination";

const ITEMS_PER_PAGES = 5;

const StyleMyInsuranceContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyInsuranceContentComponent = () => {
  return (
    <StyleMyInsuranceContentTableDiv>
      <InsuranceContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyInsuranceContentTableDiv>
  );
};

export default MyInsuranceContentComponent;
