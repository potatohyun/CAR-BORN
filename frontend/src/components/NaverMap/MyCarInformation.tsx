import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Props } from "./ReserveForm";

function MyCarInformation({ data, setReserveInfo, reserveInfo }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setReserveInfo((reserveInfo) => {
      const value = event.target.value;
      return { ...reserveInfo, carId: value };
    });
  };

  return (
    <>
      <div>
        <span style={{ fontSize: "0.85rem", marginLeft: "1%" }}>
          내 차 선택
        </span>
        <FormControl sx={{ width: "100%", margin: "4% 0 4% 0" }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={reserveInfo?.carId}
            onChange={handleChange}
            defaultValue="차를 선택해주세요."
          >
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default MyCarInformation;
