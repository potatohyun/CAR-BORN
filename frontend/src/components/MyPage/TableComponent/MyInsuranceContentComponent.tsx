import styled from "@emotion/styled";
import InsuranceContentPagination from "./../Pagination/InsuranceContentPagination";


const StyleMyInsuranceContentTableDiv = styled.div`
  width: 72%;
  height: 125vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  margin-bottom: 15vh;
  /* background-color: #fffffff6; */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  border: 2px solid #e6e6e6;
  `;

const MyInsuranceContentComponent = () => {
  const ITEMS_PER_PAGES = 10;
  
  return (
    <StyleMyInsuranceContentTableDiv>
      <InsuranceContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyInsuranceContentTableDiv>
  );
};

export default MyInsuranceContentComponent;
