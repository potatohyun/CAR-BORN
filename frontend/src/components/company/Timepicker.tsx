import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface propType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectTime: any;
}

function Picker({ setOpen, setSelectTime }: propType) {
  const yes = (e: any) => {
    setOpen(false);
    setSelectTime(dayjs(e).format("YYYY-MM-DDTHH:mm:ss"));
  };

  const no = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["StaticDateTimePicker"]}>
        <DemoItem>
          <StaticDateTimePicker onAccept={yes} onClose={no} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default function Timepicker({
  setSelectTime,
}: Pick<propType, "setSelectTime">) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} color="error">
        날짜 선택
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Picker setOpen={setOpen} setSelectTime={setSelectTime} />
        </DialogContent>
      </Dialog>
    </>
  );
}
