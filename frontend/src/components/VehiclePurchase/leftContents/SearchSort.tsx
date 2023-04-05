import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, StateType } from "../../../modules/carListModule";

function SearchSort() {
  const dispatch = useDispatch();
  const { sortType } = useSelector(
    ({ carListReducer }: { carListReducer: StateType }) => carListReducer
  );

  const handleChange = (event: SelectChangeEvent) => {
    const inputValue = event.target.value;
    dispatch(setSortType(inputValue));
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", marginTop: "2%" }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">정렬</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sortType}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value={0}>최신순</MenuItem>
          <MenuItem value={1}>오래된순</MenuItem>
          <MenuItem value={2}>높은 가격 순</MenuItem>
          <MenuItem value={3}>낮은 가격 순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchSort;
