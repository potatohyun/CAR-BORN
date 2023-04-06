/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import ApplyBtn from "./ApplyBtn";

import Calendar from "./Calendar";
import MyCarInformation from "./MyCarInformation";
import TextBox from "./TextBox";
import CloseIcon from "@mui/icons-material/Close";
import { MarkerType } from "../../routes/userUseFnc/NaverMap";

const title = css`
  text-align: center;
`;

export interface ReserveInfoType {
  carId: string;
  shopId: string;
  userId: string;
  content: string;
  date: string;
}

export interface Props {
  data?: any;
  setReserveInfo: React.Dispatch<React.SetStateAction<ReserveInfoType>>;
  reserveInfo: ReserveInfoType;
}

export interface IncomeProps {
  setReserve: React.Dispatch<React.SetStateAction<boolean>>;
  setMarkerNum: React.Dispatch<React.SetStateAction<number>>;
  searchInfoWindows: any;
  markerNum: number;
  markerArr: MarkerType[];
}

function ReserveForm({
  setReserve,
  setMarkerNum,
  searchInfoWindows,
  markerNum,
  markerArr,
}: IncomeProps) {
  const [reserveInfo, setReserveInfo] = useState<ReserveInfoType>({
    carId: "",
    shopId: "",
    userId: "",
    content: "",
    date: "",
  });

  const exit = () => {
    setReserve(false);
    setMarkerNum(-1);
    searchInfoWindows[markerNum].close();
  };

  return (
    <div>
      <CloseIcon
        style={{ marginLeft: "93%", cursor: "pointer" }}
        onClick={exit}
      />

      <h2 css={title}>예약 정보 입력</h2>
      <MyCarInformation
        setReserveInfo={setReserveInfo}
        reserveInfo={reserveInfo}
      />
      <TextBox
        setReserveInfo={setReserveInfo}
        markerArr={markerArr}
        markerNum={markerNum}
      />
      <Calendar setReserveInfo={setReserveInfo} />
      <ApplyBtn
        markerArr={markerArr}
        markerNum={markerNum}
        reserveInfo={reserveInfo}
      />
    </div>
  );
}

export default ReserveForm;
