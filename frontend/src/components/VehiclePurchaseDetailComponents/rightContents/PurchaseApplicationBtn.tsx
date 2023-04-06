/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Button } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import swal from "sweetalert";
import { useAPI } from "../../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const buttonStyle = css`
  padding-bottom: 3vh;
  display: flex;
  justify-content: center;
  .back {
    margin-left: 1.5%;
    width: 30.1%;
    margin-right: 2.2%;
    height: 5vh;
    cursor: pointer;
    font-weight: 900;
    color: #d23131;
    border-color: #d23131;
  }
  .apply {
    border: 0;
    width: 63.3%;
    margin-left: 1%;
    margin-right: 1.5%;

    height: 5vh;
    background-color: #d23131;
    color: white;
    cursor: pointer;
    font-weight: 900;
  }
  .user-delete {
    /* border: 0; */
    width: 27.5%;
    margin-left: 2.5%;
    height: 5vh;
    background-color: #d23131;
    color: white;
    cursor: pointer;
    font-weight: 900;
    &:hover {
      background-color: #000000;
    }
  }
  .user-complete {
    border: 0;
    width: 27.5%;
    margin-left: 2.5%;
    height: 5vh;
    background-color: #d23131;
    color: white;
    cursor: pointer;
    font-weight: 900;
  }
  .list {
    border: 0;
    width: 27.5%;
    margin-left: 2.5%;
    height: 5vh;
    background-color: #d23131;
    color: white;
    cursor: pointer;
    font-weight: 900;
    &:hover {
      background-color: #000000;
    }
  }
  .complete {
    border: 0;
    width: 67.5%;
    margin-left: 2.5%;
    height: 5vh;
    color: white;
    font-weight: 900;
    &:hover {
      background-color: #000000;
    }
  }
`;

const dialog = css`
  box-shadow: 0 14px 28px rgba(255, 0, 0, 0.25),
    0 10px 10px rgba(255, 0, 0, 0.22);
  border: 0;
  text-align: center;
  border-radius: 10px;
  padding: 20px 50px 10px 50px;
  width: 20%;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .userInfoBox {
    display: flex;
    border: 2px solid lightgrey;
    border-top: transparent;
    border-left: transparent;
    border-right: transparent;
    justify-content: space-evenly;
    margin-bottom: 4%;
    width: auto;
    color: #000000;

    .text {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 3vh;
      margin-bottom: 1.5vh;
    }
  }
`;

const closeBtn = css`
  width: 20%;
  height: 4vh;
  border: 2px solid black;
  background-color: white;
  color: black;
  border-radius: 10px;
  font-weight: 500;
  top: 90%;
  margin-left: 85%;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

interface DataType {
  accountId: string;
  accountName: string;
  accountPhoneNo: string;
  id: string;
}

const SIZE: number = 5;

function PurchaseApplicationBtn({
  id,
  DetailData,
  PAGE,
}: {
  id?: string;
  DetailData: any;
  PAGE: number;
}) {
  // 로컬스토리지 회원 정보 받아오기
  const ObjString = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const userId = Obj ? Obj.userId : null;
  const token = Obj ? Obj.value : null;

  const [page, setPage] = useState<number>(1);
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // 구매 신청
  const API = `https://carborn.site/api/user/car/buy/${id}`;
  const { mutate } = useMutation(
    () => {
      return axios({
        method: "post",
        url: API,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onError: (error: Error) => {
        console.error(error.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["get-car-detail", page]);
        navigate("/user/mypage/buycontent");
      },
    }
  );

  const goToBuy = () => {
    mutate();
    swal({
      title: "신청되었습니다.",
      text: "2초후 자동으로 닫힙니다.",
      icon: "success",
      buttons: [true],
      timer: 2000,
    });
  };

  // 판매자 - 판매 취소 (확인)
  const SALER_DELETE_API = `https://carborn.site/api/user/sell/cancel/${id}`;
  const { mutate: salerDeleteMutate } = useMutation(
    () => {
      return axios({
        method: "put",
        url: SALER_DELETE_API,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-car-detail", PAGE]);
        swal("판매가 취소되었습니다..", {
          icon: "success",
        });
        navigate("/user/car/list");
        queryClient.invalidateQueries("infinity-scroll");
      },
    }
  );
  const salerDelete = () => {
    swal({
      text: "판매를 취소하겠습니까?",
      buttons: ["나가기", "판매취소"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        salerDeleteMutate();
      }
    });
  };

  // 구매 신청자 리스트 모달 오픈
  const USER_LIST_API = `https://carborn.site/api/user/car/sale/sell/${id}/${page}/${SIZE}`;
  const getApplyUserList = useAPI("get", USER_LIST_API, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { data, refetch } = useQuery<any, AxiosError>(
    "get-apply-user-list",
    () => getApplyUserList,
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 0,
      staleTime: 0,
      select: (data) => {
        return data.data.message.content;
      },
      enabled: false,
    }
  );

  const showModal = () => {
    refetch();
    modalRef?.current?.showModal();
  };

  // 판매 확정
  const { mutate: putMutate } = useMutation(
    (userId: string) => {
      return axios({
        method: "put",
        url: `https://carborn.site/api/user/car/sale/sell/confirm/${id}/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-car-detail", PAGE]);
        navigate("/user/mypage/sellcontent");
      },
    }
  );

  const isConfirm = (userId: string) => {
    modalRef?.current?.close();
    swal({
      text: "판매를 확정하겠습니까?",
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        putMutate(userId);
        swal("확정되었습니다.", {
          icon: "success",
        });
      } else {
        swal("취소되었습니다.");
      }
    });
  };

  // 뒤로가기 (확인)
  const back = () => {
    navigate(-1);
  };

  // 사용자 구매 확정 및 취소
  // 확정
  const USER_BUY_CONFIRM_API = `https://carborn.site/api/user/car/sale/buy/confirm/${id}`;
  const { mutate: confirmMutate } = useMutation(
    () => {
      return axios({
        method: "put",
        url: USER_BUY_CONFIRM_API,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-car-detail");
        navigate("/user/mypage/buycontent");
      },
    }
  );

  const userConfirmBtn = () => {
    swal({
      text: `구매 확정을 원하시면 구매확정을 눌러주세요.`,
      buttons: ["나가기", "구매확정"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        confirmMutate();

        swal("확정되었습니다.", {
          icon: "success",
        });
      } else {
      }
    });
  };

  // 취소
  const USER_BUY_CENCEL_API = `https://carborn.site/api/user/car/sale/buy/cancel/${id}`;
  const { mutate: cancelMutate } = useMutation(
    () => {
      return axios({
        method: "put",
        url: USER_BUY_CENCEL_API,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-car-detail", PAGE]);
        navigate("/user/mypage/buycontent");
      },
    }
  );

  const userCencelBtn = () => {
    swal({
      text: `구매취소를 원하시면 구매취소를 눌러주세요`,
      buttons: ["나가기", "구매취소"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        cancelMutate();

        swal("취소되었습니다.", {
          icon: "success",
        });
      } else {
      }
    });
  };

  useEffect(() => {}, [
    DetailData?.detail?.saleStatus,
    DetailData?.bookStatus?.bookStatus,
  ]);

  return (
    <div css={buttonStyle}>
      <Button variant="outlined" className="back" onClick={back}>
        뒤로가기
      </Button>
      {userId === DetailData?.detail?.accountId ? (
        DetailData?.detail?.saleStatus === 0 ? (
          <>
            <Button className="user-delete" onClick={salerDelete}>
              판매취소
            </Button>
            <Button className="list" onClick={showModal}>
              신청자 목록
            </Button>
            <dialog ref={modalRef} css={dialog}>
              <div css={{ display: "flex", justifyContent: "center" }}>
                {data?.map((userInfo: DataType) => {
                  return (
                    <div className="userInfoBox" key={userInfo.id}>
                      <div className="text">
                        <div css={{ fontSize: "1rem", fontWeight: "600" }}>
                          {userInfo.accountName} -
                        </div>
                        <div css={{ fontSize: "0.7rem", marginRight: "2vw" }}>
                          &nbsp; {userInfo.accountPhoneNo}
                        </div>
                      </div>
                      <button
                        css={{
                          border: "0",
                          backgroundColor: "#D23131",
                          color: "white",
                          height: "90%",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => isConfirm(userInfo.accountId)}
                      >
                        확정
                      </button>
                    </div>
                  );
                })}
              </div>
              <form method="dialog">
                <button value="close" css={closeBtn}>
                  Close
                </button>
              </form>
            </dialog>
          </>
        ) : DetailData?.detail?.saleStatus === 1 ? (
          <Button sx={{ backgroundColor: "#d23131" }} className="complete">
            확정완료
          </Button>
        ) : (
          <Button className="complete">취소완료</Button>
        )
      ) : DetailData?.bookStatus?.bookStatus === undefined ? (
        <button className="apply" onClick={goToBuy}>
          구매신청
        </button>
      ) : DetailData?.bookStatus?.bookStatus === 0 ? (
        <>
          <button className="user-delete" onClick={userCencelBtn}>
            신청취소
          </button>
          <button className="user-complete" onClick={userConfirmBtn}>
            구매확정
          </button>
        </>
      ) : DetailData?.bookStatus?.bookStatus === 1 ? (
        <button className="complete">확정완료</button>
      ) : DetailData?.bookStatus?.bookStatus === 2 ? (
        <button className="complete">취소완료</button>
      ) : null}
    </div>
  );
}

export default PurchaseApplicationBtn;
