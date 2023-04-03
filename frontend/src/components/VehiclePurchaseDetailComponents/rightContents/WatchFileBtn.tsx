import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FileListStack from "./FileListStack";

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
    <div>
      <button onClick={handleClickOpen}>
        {value === 1 ? "정비" : value === 2 ? "검수" : "보험"}기록
      </button>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
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
    </div>
  );
}

export default WatchFileBtn;
