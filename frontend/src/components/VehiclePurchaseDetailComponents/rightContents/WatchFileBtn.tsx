/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FileListStack from "./FileListStack";
import { Button } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import BuildIcon from "@mui/icons-material/Build";
import SearchIcon from "@mui/icons-material/Search";
import CarCrashIcon from "@mui/icons-material/CarCrash";

const historyBtnStyle = css`
  border: none;
  margin-right: 1.83%;
  width: 21.65%;
  height: 5vh;
  background-color: black;
  color: white;
  margin-left: 1.5%;
  font-weight: 900;
  margin-bottom: 5%;
  margin-top: 3%;
  &:hover {
    background-color: #d23131;
  }
  cursor: pointer;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WatchFileBtn<T>({
  data,
  value,
  page,
  setPage,
}: {
  data: T[];
  value: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setPage(1);
  };

  return (
    <span>
      <Button
        css={historyBtnStyle}
        onClick={handleClickOpen}
        startIcon={
          value === 0 ? (
            <PaymentsIcon />
          ) : value === 1 ? (
            <BuildIcon />
          ) : value === 2 ? (
            <SearchIcon />
          ) : (
            <CarCrashIcon />
          )
        }>
        {value === 0
          ? "거래"
          : value === 1
          ? "정비"
          : value === 2
          ? "검수"
          : "보험"}
        기록
      </Button>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogContent>
          <FileListStack<T>
            data={data}
            value={value}
            modalOpen={modalOpen}
            page={page}
            setPage={setPage}
          />
        </DialogContent>
      </Dialog>
    </span>
  );
}

export default WatchFileBtn;
