import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useState } from "react";
import { Props } from "./ReserveForm";
import Swal from "sweetalert2";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

function Calendar({ setReserveInfo }: Pick<Props, "setReserveInfo">) {
  const [value, setValue] = useState<any | null>(dayjs(""));

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: true,
    timer: 1000,
    timerProgressBar: true,
  });

  const pickCalendar = (newValue: any) => {
    const YEAR = newValue.$y;
    const MONTH =
      `${newValue.$M}`.length === 1
        ? `0${newValue.$M + 1}`
        : `${newValue.$M + 1}`;
    const DATE =
      `${newValue.$D}`.length === 1 ? `0${newValue.$D}` : `${newValue.$D}`;
    console.log(year, month, day);
    if (YEAR < year) {
      Toast.fire({
        icon: "error",
        title: "미래 날짜를 선택해주세요.",
      });
      setValue("");
      setReserveInfo((reserveInfo) => {
        return { ...reserveInfo, date: "" };
      });
    } else if (parseInt(MONTH) < month) {
      Toast.fire({
        icon: "error",
        title: "미래 날짜를 선택해주세요.",
      });
      setValue("");
      setReserveInfo((reserveInfo) => {
        return { ...reserveInfo, date: "" };
      });
    } else if (parseInt(DATE) < day) {
      Toast.fire({
        icon: "error",
        title: "미래 날짜를 선택해주세요.",
      });
      setValue("");
      setReserveInfo((reserveInfo) => {
        return { ...reserveInfo, date: "" };
      });
    } else {
      setValue(newValue);
      setReserveInfo((reserveInfo) => {
        return { ...reserveInfo, date: `${YEAR}-${MONTH}-${DATE}` };
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="예약 날짜">
        <DesktopDatePicker
          value={value}
          onChange={(newValue) => pickCalendar(newValue)}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}

export default Calendar;
