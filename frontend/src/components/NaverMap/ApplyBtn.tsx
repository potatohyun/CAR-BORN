import axios from "axios";
import { useMutation } from "react-query";
import { MarkerType } from "../../routes/userUseFnc/NaverMap";
import { ReserveInfoType } from "./ReserveForm";

function ApplyBtn({
  markerArr,
  markerNum,
  reserveInfo,
}: {
  markerArr: MarkerType[];
  markerNum: number;
  reserveInfo: ReserveInfoType;
}) {
  const { mutate, isSuccess } = useMutation("apply-company", () => {
    return axios({
      method: "post",
      url: `https://carborn.site/api/user/${
        markerArr[markerNum].AUTH === 1 ? "repair" : "inspect"
      }/book`,
      data:
        markerArr[markerNum].AUTH === 1
          ? {
              car: {
                id: reserveInfo.carId,
              },
              repairShop: {
                id: markerArr[markerNum].ID,
              },
              account: {
                id: "testuser2",
              },
              content: reserveInfo.content,
              bookDt: reserveInfo.date,
            }
          : {
              car: {
                id: reserveInfo.carId,
              },
              inspector: {
                id: markerArr[markerNum].ID,
              },
              account: {
                id: "testuser2",
              },
              content: reserveInfo.content,
              bookDt: reserveInfo.date,
            },
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  console.log(isSuccess);
  const getApply = () => {
    mutate();
  };
  return (
    <>
      <button
        style={{
          backgroundColor: "red",
          width: "100%",
          height: "6vh",
          borderRadius: "10px",
          border: "0",
          fontSize: "1.1rem",
          fontWeight: "bolder",
          color: "white",
          cursor: "pointer",
          margin: "7% 0 0 0",
        }}
        onClick={getApply}
      >
        신청하기
      </button>
    </>
  );
}

export default ApplyBtn;
