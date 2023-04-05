/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useAPI } from "../../hooks/useAPI";
import { useState } from "react";

interface Props {
  id: string;
}

interface MapType {
  accountId: string;
}

const tableStyle = css`
  tr {
    border-spacing: 10px;
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewModal({ id }: Props) {
  const client = useQueryClient();

  let URL;
  let queryKey: any;

  const isGarage = useLocation().pathname == "/garage/history";

  if (isGarage) {
    URL = `http://carborn.site/api/repair-shop/result/review/${id}`;
    queryKey = `getRepairReview${id}`;
  } else {
    URL = `http://carborn.site/api/inspector/result/review/${id}`;
    queryKey = `getInspectorReview${id}`;
  }

  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };
  const getRepairDetail = useAPI("get", URL, option);

  const { data } = useQuery(queryKey, () => getRepairDetail, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data.message;
    },
    onError: (error: Error) => {
      console.log(error);
    },

    enabled: false,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    client.fetchQuery(queryKey);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  let score;
  switch (data?.point) {
    case 0:
      score = "☆☆☆☆☆";
      break;
    case 1:
      score = "★☆☆☆☆";
      break;
    case 2:
      score = "★★☆☆☆";
      break;
    case 3:
      score = "★★★☆☆";
      break;
    case 4:
      score = "★★★★☆";
      break;
    case 5:
      score = "★★★★★";
      break;
    default:
      score = "";
  }
  return (
    <div>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClickOpen}
        size="small"
      >
        보기
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Review</DialogTitle>
        <DialogContent sx={{ minWidth: "300px" }}>
          <table css={tableStyle}>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  {data ? data?.content : "아직 리뷰가 등록되지 않았습니다."}
                </td>
              </tr>
              <tr>
                <td css={{ color: "#ff9600", fontSize: "20px" }}>{score}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel} color="error">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
