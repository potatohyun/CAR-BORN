// 취소 관련 모달
import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { applicationjson, CARBORN_SITE, ContentType } from "../../../lib/api";
import CustomAlert from "../../auth/signup/modal/CustomAlert";
import swal from "sweetalert";

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    margin-right: 1rem;
    cursor: pointer;
  }
`;

export type SellDeleteWarningModalType = {
  message: string;
  onClose: any;
  bookid: string | number;
  isOpen: boolean;
};

export const SellDeleteWarningModal = ({
  message,
  onClose,
  bookid,
  isOpen
}: SellDeleteWarningModalType) => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const DeleteBook = async (bookid: string | number) => {
    try {
      await axios.put(`${CARBORN_SITE}/api/user/sell/cancel/${bookid}`, {
        headers: {
          [ContentType]: applicationjson,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      onClose();
      swal("판매 예약", "예약 취소가 완료되었습니다.", "success");
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
    </StyledModalContainer>
  );
};
