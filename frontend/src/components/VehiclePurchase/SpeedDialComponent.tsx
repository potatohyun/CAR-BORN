/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import EditIcon from "@mui/icons-material/Edit";
import { useRef } from "react";
import SpeedDialTable from "./SpeedDialTable";
import { useState } from "react";
import { useAPI } from "./../../hooks/useAPI";
import { useQuery } from "react-query";

const dialog = css`
  box-shadow: 0 14px 28px rgba(255, 0, 0, 0.25),
    0 10px 10px rgba(255, 0, 0, 0.22);
  border: 0;
  text-align: center;
  border-radius: 10px;
  padding: 20px 50px 10px 50px;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
const closeBtn = css`
  width: 20%;
  height: 4vh;
  border: 2px solid black;
  background-color: white;
  color: black;
  border-radius: 10px;
  font-weight: 500;
  margin-left: 90%;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

function SpeedDialComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [page, setPage] = useState<number>(1);
  const API = `https://carborn.site/api/user/car/list/${page}/15`;

  const getCarListFnc = useAPI("get", API);

  const { data } = useQuery("get-car-list-fnc", () => getCarListFnc, {
    retry: false,
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data.message.content;
    },
  });

  const showModalFnc = () => {
    dialogRef.current?.showModal();
  };

  dialogRef.current?.addEventListener("close", () => {
    console.log(dialogRef.current?.returnValue);
  });

  return (
    <div css={{ position: "absolute" }}>
      <Box
        component="div"
        sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
      >
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClick={showModalFnc}
        ></SpeedDial>
        <dialog ref={dialogRef} css={dialog}>
          <SpeedDialTable data={data} />
          <form method="dialog">
            <button value="close" css={closeBtn}>
              Close
            </button>
          </form>
        </dialog>
      </Box>
    </div>
  );
}

export default SpeedDialComponent;
