// 취소 관련 모달
import styled from "@emotion/styled";
import axios from "axios";
import { CARBORN_SITE } from "../../../lib/api";
import { useState } from "react";
import CustomAlert from "../../auth/signup/modal/CustomAlert";

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  transform: translateY(100%);
  transition: all 1s ease-in-out;

  &.open {
    transform: translateY(0%);
  }
`;

const StyledModalContent = styled.div`
  width: 400px;
  background: #fff;
  padding: 24px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 24px;
  }

  button {
    background: #f44336;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

export type BuyDeleteWarningModalType = {
  message: string;
  onClose: any;
  bookid: string | number;
  isOpen: boolean;
};

export const BuyDeleteWarningModal = ({
  message,
  onClose,
  bookid,
  isOpen,
}: BuyDeleteWarningModalType) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const DeleteBook = async (bookid: string | number) => {
    try {
      const ObjString: string | null = localStorage.getItem("login-token");
      const Obj = ObjString ? JSON.parse(ObjString) : null;

      await axios.put(`${CARBORN_SITE}/api/user/buy/cancel/${bookid}`, {
        headers: {
          Authorization: `Bearer ${Obj.value}`,
        },
      });

      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledModalContainer className={isOpen ? "open" : ""}>
      <StyledModalContent>
        <p>{message}</p>
        <button onClick={() => DeleteBook(bookid)}>예</button>
        <button onClick={onClose}>아니오</button>
      </StyledModalContent>
      {isAlert ? (
        <div>
          <CustomAlert message={"구매예약 취소가 완료 되었습니다."} />
        </div>
      ) : null}
    </StyledModalContainer>
  );
};
