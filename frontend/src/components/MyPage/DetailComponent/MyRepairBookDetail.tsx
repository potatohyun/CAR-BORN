import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

//MUI 다이얼로그
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
///////////////////////////////////////////

import styled from "@emotion/styled";
import {
  Table,
  TableCell,
  TableRow,
} from "@mui/material";

// CarStatus 이미지 import 해오기
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CARBORN_SITE } from "../../../lib/api";
import Nav2 from "../../Nav2";
import { ContentType, applicationjson } from "./../../../lib/api";

const StyleMyRepairDetailDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #000000, #1e0000e8);
  background-size: 100% 200%;
  animation: gradient 10s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

export const StyledTableRepairContainer = styled.div`
  width: 70vw;
`;

const StyleMyRepairDetailContainerDiv = styled.div`
  width: 33vw;
  height: 50vh;
  border: 1px dashed #00000020;
  margin-top: 15vh;
  margin-bottom: 15vh;
  background-color: #fffffff6;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-left: 2rem;
`;

const StyleXButton = styled.div`
  font-weight: 900;
  font-size: 1.2rem;
  position: absolute;
  right: 32vw;
  top: 66vh;
  cursor: pointer;
`;

// 내 정비 정보 전체 컨테이너
const StyleTableDivRepairDetail = styled.div`
  border: 1px dashed #00000050;
  width: 30vw;
  height: 45vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 제조사, 차량모델
const StyleTableCarMakerModelDiv = styled.div`
  width: 30vw;
  height: 4vh;
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;

  span:nth-of-type(1) {
    display: inline-block;
    margin-right: 0.5vw;
    font-size: 1rem;
    font-weight: 500;
  }

  span:nth-of-type(2) {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

// 차량번호
export const StyleTableCarRegNmDiv = styled.div`
  width: 30vw;
  height: 5vh;
  margin-bottom: 2vh;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2rem;
    font-weight: 900;
  }
`;

// 정비업체, 업체주소
const StyleTableCarRepairShopDiv = styled.div`
  width: 24vw;
  height: 3vh;
  margin-bottom: 1vh;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #0000006c;
  font-size: 0.9rem;
  margin: 0;
`;

// 나머지 정보
const StyleTableRepairInfoDiv = styled.div`
  width: 30vw;
  height: 15vh;
  margin-top: 3vh;

  tr:nth-of-type(1) {
    background-color: #d23131;
    color: white;
    td {
      font-size: 0.6rem;
      font-weight: 900;
    }
  }

  & > tr {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1fr;
    td {
      font-size: 0.7rem;
    }
  }
`;

const StyleTableRepairModifyButtonDiv = styled.div`
  width: 35vw;
  height: 20vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    border: none;
    background-color: #d231317f;
    color: white;
    padding: 0.55rem 1.2rem;
    border-radius: 5px;
    font-weight: 900;
  }

  button:hover {
    background-color: #d23131;
    transition: all 0.5s;
    transform: scale(1.2);
  }
`;

const StyleBookDeleteDiv = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    background-color: #d23131;
    border: none;
    color: white;
    font-weight: 900;
    width: 10vw;
    height: 5vh;
    border-radius: 5px;
    opacity: 0.5;
  }

  & button:hover {
    opacity: 1;
    transition: all 0.5s;
  }
`

export const StyleRepairBookModifyContainer = styled.div`
  height: 20vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5vh;
    border: 1px solid #d231317e;
    border-radius: 5px;
  }
`

export interface bookDetailType {
  id: number;
  model: string;
  manufacturer: string;
  registrationNumber: string;
  year: number;
  mileage: number;
  price: number;
  reservationDate: number;
}

const MyRepairBookDetail = () => {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const param = useParams();
  const carId = param.carId;
  const location = useLocation();
  const [data, setData] = useState<any>();

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/user/repair/book/${carId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            [ContentType]: applicationjson,
          },
        });
        
        let modifiedContent = response.data.message

        switch (modifiedContent.bookStatus) {
          case 0:
            modifiedContent.bookStatusString = "예약 중";
            modifiedContent.bookStatusNumber = 0;
            break;
          case 1:
            modifiedContent.bookStatusString = "정비 완료";
            modifiedContent.bookStatusNumber = 1;
            break;
          case 2:
            modifiedContent.bookStatusString = "정비 취소";
            modifiedContent.bookStatusNumber = 2;
            break;
          default:
            break;
        }
  
        setData(modifiedContent);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setData, carId]);

  // 뒤로가기
  const goBack = () => {
    window.history.back();
  };

  // 예약 변경 모달 
  const [isRepairBookModify, setIsRepairBookModify] = useState<boolean>(false);
  const handleRepairBookModify = () => {
    setIsRepairBookModify(!isRepairBookModify);
  };
  
  // 예약 취소 모달
  const [isRepairBookDelete, setIsRepairBookDelete] = useState<boolean>(false);
  const handleRepairBookDelete = () => {
    setIsRepairBookDelete(!isRepairBookDelete);
  };

  return (
    <StyleMyRepairDetailDiv>
      <Nav2 />
      <StyleMyRepairDetailContainerDiv>
        <StyleXButton onClick={() => goBack()}>X</StyleXButton>
        {/* 디테일 정보  */}
        <StyledTableRepairContainer>
          <StyleTableDivRepairDetail>
            <StyleTableCarMakerModelDiv>
              {/* 제조사, 차량모델 */}
              <span>{location.state.carMaker}</span>
              <span>{location.state.carModelNm}</span>
            </StyleTableCarMakerModelDiv>
            <StyleTableCarRegNmDiv>
              {/* 차량번호 */}
              <span>{location.state.carRegNm}</span>
            </StyleTableCarRegNmDiv>
            {data && (
              <>
                <StyleTableCarRepairShopDiv>
                  {/* 정비업체 */}
                  <div>업체명</div>
                  {data.repairShopAccountName && (
                    <div>{data.repairShopAccountName}</div>
                  )}
                </StyleTableCarRepairShopDiv>
                <StyleTableCarRepairShopDiv>
                  {/* 업체주소 */}
                  <div>업체주소</div>
                  {data.repairShopAddress && (
                    <div>{data.repairShopAddress}</div>
                  )}
                </StyleTableCarRepairShopDiv>
                <StyleTableRepairInfoDiv>
                  {/* 나머지 테이블 정보 */}
                  <Table>
                    <tbody>
                      <TableRow>
                        <TableCell align="center">{`주행거리(km)`}</TableCell>
                        <TableCell align="center">{`연식(년)`}</TableCell>
                        <TableCell align="center">정비예약일</TableCell>
                        <TableCell align="center">예약상태</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          {location.state.carMileage === undefined
                            ? null
                            : location.state.carMileage.toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          {location.state.carModelYear}
                        </TableCell>
                        <TableCell align="center">
                          {data &&
                            data.bookDt &&
                            data.bookDt.slice(0, 10)}
                        </TableCell>
                        <TableCell
                          align="center"
                        >
                        {/* 한글로 바꿔주기 */}
                          {data.bookStatusString === undefined ? null : data.bookStatusString}
                        </TableCell>
                      </TableRow>
                    </tbody>
                  </Table>
                </StyleTableRepairInfoDiv>
              </>
            )}
            <StyleTableRepairModifyButtonDiv>
              <button onClick={handleRepairBookModify}>예약 변경하기</button>
              <button onClick={handleRepairBookDelete}>예약 취소하기</button>
            </StyleTableRepairModifyButtonDiv>
            <BookModifyDialogSlide 
              open={isRepairBookModify} 
              onClose={handleRepairBookModify}
              data={data}
            />
            <BookDeleteDialogSlide 
              open={isRepairBookDelete} 
              onClose={handleRepairBookDelete}
              data={data}
            />
          </StyleTableDivRepairDetail>
        </StyledTableRepairContainer>
      </StyleMyRepairDetailContainerDiv>
    </StyleMyRepairDetailDiv>
  );
};

export default MyRepairBookDetail;

// 예약 일자 변경 모달
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export function BookModifyDialogSlide(props: AlertDialogSlideProps) {
  const { open, onClose, data } = props;

  // string 값으로 날짜값 변환
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '';

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  };

  // 예약 변경값 넣기(사유)
  const [reservationChangeContent, setReservationChangeContent] = useState("");
  const handleReservationChangeContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setReservationChangeContent(value);
  };

  // 예약 변경 신청
  const handleModifySubmit = async (bookid:number) => {
    // 토큰 가져오기
    const ObjString: string | null = localStorage.getItem("login-token");
    const Obj = ObjString ? JSON.parse(ObjString) : null;
    const accessToken = Obj ? Obj.value : null;

    try {
      await axios.put(
        `${CARBORN_SITE}/api/user/repair/book`,
        {
          id:bookid,
          car: {
            id:data.carId
          },
          repairShop: {
            id:data.repairShopId
          },
          account: {
            id: Obj.userId
          },
          content: reservationChangeContent,
          bookDt: formattedDate,
        },
        {
          headers: {
            [ContentType]: applicationjson,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          예약 변경하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            선택한 날짜 : {formattedDate.slice(0,4)}년 {formattedDate.slice(5,7)}월 {formattedDate.slice(8,10)}일
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker" value={selectedDate} onChange={handleDateChange}/>
              </DemoContainer>
            </LocalizationProvider>
            <textarea
              cols={35}
              rows={5}
              value={reservationChangeContent}
              onChange={(e) => handleReservationChangeContent(e)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={() => handleModifySubmit(data.id)}>예약 변경</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// 예약 취소 모달
const Transition2 = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export function BookDeleteDialogSlide(props: AlertDialogSlideProps) {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const { open, onClose, data } = props;
  // 예약 삭제
  const DeleteBook = async (id: string | number | undefined) => {
    try {
      const ObjString: string | null = localStorage.getItem("login-token");
      const Obj = ObjString ? JSON.parse(ObjString) : null;

      await axios.delete(
        `${CARBORN_SITE}/api/user/repair/book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Obj.value}`,
            [ContentType]: applicationjson,
          },
        }
      );

      console.log(`예약이 삭제되었습니다.`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition2}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          예약 취소하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <StyleBookDeleteDiv>
              정말 예약을 취소하시겠습니까?
            </StyleBookDeleteDiv>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={() => DeleteBook(data.id)}>예약 취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
