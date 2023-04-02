import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Props } from "./VehiclePurchaseType";

function SearchSort({ setSearchInfo, searchInfo }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setSearchInfo((info) => {
      return { ...info, sortType: event.target.value };
    });
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 80, marginRight: "1.7vw" }}
        size="small"
      >
        <InputLabel id="demo-simple-select-autowidth-label">정렬</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={searchInfo.sortType}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value={-1}>기본</MenuItem>
          <MenuItem value={0}>최신순</MenuItem>
          <MenuItem value={1}>오래된순</MenuItem>
          <MenuItem value={3}>높은 가격 순</MenuItem>
          <MenuItem value={4}>낮은 가격 순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchSort;
