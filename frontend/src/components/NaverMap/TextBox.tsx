import TextField from "@mui/material/TextField";
import { Props } from "./ReserveForm";

function TextBox({ setReserveInfo }: Pick<Props, "setReserveInfo">) {
  const setTextInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    setReserveInfo((reserveInfo) => {
      return { ...reserveInfo, content: inputValue };
    });
  };

  return (
    <>
      <p style={{ fontSize: "0.85rem", margin: "0 0 3.5% 1%" }}>정비 내용</p>
      <TextField
        id="outlined-multiline-static"
        multiline
        placeholder="차량 상태를 작성해주세요."
        rows={5}
        sx={{ width: "100%", marginBottom: "4%" }}
        onBlur={setTextInput}
      />
    </>
  );
}
export default TextBox;
