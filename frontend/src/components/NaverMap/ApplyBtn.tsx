import axios from "axios";
import { useMutation } from "react-query";
import { MarkerType } from "../../routes/userUseFnc/NaverMap";
import { ReserveInfoType } from "./ReserveForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ApplyBtn({
  markerArr,
  markerNum,
  reserveInfo,
}: {
  markerArr: MarkerType[];
  markerNum: number;
  reserveInfo: ReserveInfoType;
}) {
  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: true,
    timer: 1000,
    timerProgressBar: true,
  });

  const navigate = useNavigate();
  const ObjString: any = localStorage.getItem("login-token");

  const { mutate, isSuccess } = useMutation(
    () => {
      return axios({
        method: "post",
        url: `https://carborn.site/api/user/${
          markerArr[markerNum]?.AUTH === 1 ? "repair" : "inspect"
        }/book`,
        data:
          markerArr[markerNum]?.AUTH === 1
            ? {
                car: {
                  id: reserveInfo?.carId,
                },
                repairShop: {
                  id: markerArr[markerNum]?.ID,
                },
                account: {
                  id: JSON.parse(ObjString).userId,
                },
                content: reserveInfo?.content,
                bookDt: reserveInfo?.date,
              }
            : {
                car: {
                  id: reserveInfo?.carId,
                },
                inspector: {
                  id: markerArr[markerNum]?.ID,
                },
                account: {
                  id: JSON.parse(ObjString).userId,
                },
                content: reserveInfo?.content,
                bookDt: reserveInfo?.date,
              },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(ObjString).value}`,
        },
      });
    },
    {
      onSuccess: () => {
        navigate(
          markerArr[markerNum]?.AUTH === 1
            ? "/user/mypage/repair"
            : "/user/mypage/inspector"
        );
      },
    }
  );

  const getApply = () => {
    if (!reserveInfo?.carId || !reserveInfo?.content || !reserveInfo?.date) {
      Toast.fire({
        icon: "error",
        title: "양식을 다 작성해주세요.",
      });
    } else {
      mutate();
    }
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
