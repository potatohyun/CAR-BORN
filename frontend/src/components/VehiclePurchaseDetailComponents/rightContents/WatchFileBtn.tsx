import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FileListStack from "./FileListStack";
import { useQuery } from "react-query";
import { useAPI } from "../../../hooks/useAPI";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const API = `https://jsonplaceholder.typicode.com/todos/1`;

function WatchFileBtn() {
  const [open, setOpen] = React.useState(false);
  const watchFile = useAPI("get", API);
  const { data, refetch } = useQuery("watch-file", () => watchFile, {
    enabled: false,
  });

  const handleClickOpen = () => {
    refetch();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>관련 서류 보기</button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <FileListStack data={data} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WatchFileBtn;
