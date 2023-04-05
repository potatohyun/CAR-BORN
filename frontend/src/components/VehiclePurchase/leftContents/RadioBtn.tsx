/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useDispatch } from "react-redux";
import { setKeywordType } from "../../../modules/carListModule";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const container = css`
  margin-bottom: 1vh;

  .MuiButtonBase-root {
    padding: 0;
  }
  .MuiTypography-root {
    font-size: 0.9rem;
    margin-right: 0.26vw;
    margin-top: 0.4vh;
    font-weight: 600;
    color: #909090;
  }
  .css-hyxlzm {
    color: #424242;
  }
`;

function RadioBtn() {
  const dispatch = useDispatch();
  const setKeywordTypeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywordType = e.target.value;
    dispatch(setKeywordType(keywordType));
  };

  return (
    <>
      <FormControl css={container}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={setKeywordTypeValue}
        >
          <FormControlLabel
            value="0"
            sx={{ margin: "0" }}
            control={<Radio size="small" />}
            label="제조사"
          />
          <FormControlLabel
            value="1"
            control={<Radio size="small" />}
            label="차종"
            sx={{ margin: "0" }}
          />
          <FormControlLabel
            value="2"
            sx={{ margin: "0" }}
            control={<Radio size="small" />}
            label="연식"
          />
          <FormControlLabel
            value="3"
            sx={{ margin: "0" }}
            control={<Radio size="small" />}
            label="컨텐츠"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default RadioBtn;
