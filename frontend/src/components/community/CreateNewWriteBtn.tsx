/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";

const speedDialStyle = css`
  .MuiButtonBase-root {
    background-color: #d23131;
    &:hover {
      background-color: #af2828;
    }
  }
`;

export default function CreateNewWriteBtn() {
  const navigate = useNavigate();

  const goToWrite = () => {
    navigate("/user/community/write");
  };
  return (
    <div css={speedDialStyle}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClick={goToWrite}
      ></SpeedDial>
    </div>
  );
}
