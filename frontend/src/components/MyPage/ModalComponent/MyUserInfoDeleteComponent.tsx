import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userinfoDelete } from "../../../modules/userInfoDeleteModule";
import { useEffect } from "react";

const StyleMyUserWithdrawalComponentDiv = styled.div`
  margin-top: 3rem;
  width: 70vw;
  height: 30vw;
  border: 3px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2.4rem;
    font-weight: 900;
  }
`;

const MyUserWithdrawalButtonDiv = styled.div`
  width: 38vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
  a:nth-of-type(1) {
    button {
      width: 7vw;
      height: 7vh;
      border: 3px solid red;
      background-color: white;
      color: black;
      font-weight: 900;
      font-size: 1.2rem;
      cursor: pointer;

      &:hover {
        border: 3px solid red;
        background-color: #d23131;
        color: white;
      }
    }
  }

  > button {
    width: 28vw;
    height: 7vh;
    border: 3px solid red;
    background-color: #d23131;
    color: white;
    font-weight: 900;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      border: 3px solid red;
      background-color: white;
      color: black;
    }
  }
`;

const MyUserInfoDeleteComponent = () => {
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = JSON.parse(ObjString)
  const isSuccess = useSelector((state:any) => state.userinfoDeleteReducer.success)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInfoDelete = () => {
    dispatch(userinfoDelete());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess])

  return (
    <StyleMyUserWithdrawalComponentDiv>
      <p>회원탈퇴를 진행하시겠습니까?</p>
      <MyUserWithdrawalButtonDiv>
        <Link to={`/${Obj.userId}/mypage`}>
          <button>취소</button>
        </Link>
        <button onClick={handleUserInfoDelete}>회원탈퇴</button>
      </MyUserWithdrawalButtonDiv>
    </StyleMyUserWithdrawalComponentDiv>
  );
};

export default MyUserInfoDeleteComponent;
