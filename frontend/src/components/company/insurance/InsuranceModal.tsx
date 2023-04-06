/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useQuery, useQueryClient } from "react-query";
import { useAPI } from "./../../../hooks/useAPI";

interface Props {
  id: string;
  content: string;
}

const tableStyle = css`
  tr {
    border-spacing: 20px;
  }
  td {
    width: 1.5vw;
    font-size: 15px;
  }
  width: 30vw;
  border-spacing: 0 15px;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InsuranceModal({ id }: Props) {
  const [open, setOpen] = React.useState(false);

  const client = useQueryClient();

  const queryKey: string = `getGarageHistoryDetail${id}`;
  const URL = `http://carborn.site/api/insurance/list/${id}`;

  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  const getDetailData = useAPI("get", URL, option);
  const { data }: any = useQuery(queryKey, () => getDetailData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data.message;
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
    client.fetchQuery(queryKey);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#d23131" }}
        onClick={handleClickOpen}
        size="small">
        보기
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ minWidth: "8vw" }}
        maxWidth={false}>
        <DialogTitle>
          <img
            src={data?.insuranceImgNm}
            height="200px"
            width="auto"
            alt="img"
          />
        </DialogTitle>
        <DialogContent>
          <table css={tableStyle}>
            <thead></thead>
            <tbody>
              <tr>
                <td>사고 번호</td>
                <td> : {data?.id}</td>
              </tr>
              <tr>
                <td>사고 날짜</td>
                <td> : {data?.insuranceDt}</td>
              </tr>
              <tr>
                <td>사고 유형</td>
                <td> : {data?.category}</td>
              </tr>
              <tr>
                <td>사고 내용</td>
                <td> : {data?.content}</td>
              </tr>
              <tr>
                <td>차대 번호</td>
                <td> : {data?.carVin}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
