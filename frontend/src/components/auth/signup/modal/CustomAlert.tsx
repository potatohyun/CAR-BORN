import styled from "@emotion/styled";

const StyleAlertDiv = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
  transition: opacity 1s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`;

const StyleAlertBox = styled.div`
  width: 100vw;
  height: 80px;
  background-color: #d23131;
  border: 1px solid #d23131;
  color: white;
  font-weight: 900;
  font-size: 1.4rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #d23131;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const CustomAlert = ({ message }:any) => {
  return (
    <StyleAlertDiv show={true}>
      <StyleAlertBox>
        <h3>{message}</h3>
      </StyleAlertBox>
    </StyleAlertDiv>
  );
};

export default CustomAlert