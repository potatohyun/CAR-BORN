import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Nav2 from "./Nav2";
import styled from "@emotion/styled";
import axios from "axios";
import { applicationjson, CARBORN_SITE, ContentType } from "../lib/api";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const StyleSelfRepairHelperContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

const StyleSelfRepairHelperBorder = styled.div`
  border: 2px solid #00000088;
  border-radius: 5px;
  padding: 2rem 3rem;
`;

const StyleCell = styled.ul`
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  font-size: 0.9rem;
  font-weight: 900;
  li {
    list-style: dicimal;
    width: 35vw;
    margin-left: 2.2rem;
  }

  li:hover {
    color: #d23131;
  }
`

export default function CollapsibleTable() {
  // 토큰 넣기
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const accessToken = Obj ? Obj.value : null;

  const [selfHelp, setSelfHelp] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchSelfData = async () => {
      const response = await axios({
        method: "GET",
        url: `${CARBORN_SITE}/api/user/self-repair/list/1/30`,
        headers: {
          [ContentType]: applicationjson,
        },
      });
      setSelfHelp(response.data.message.content);
    };
    fetchSelfData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Nav2 />
      <StyleSelfRepairHelperContainer>
        <StyleSelfRepairHelperBorder>
          <Table aria-label="collapsible table">
            <TableHead sx={{ height:"7rem" }}>
              <TableRow>
                <TableCell colSpan={2} sx={{ width: "40vw", textAlign: "center", fontSize: "2.2rem", fontWeight: "900"}}>
                  차량점검리스트
                </TableCell>
              </TableRow>
            </TableHead>
            {selfHelp.map((row, index) => (
              <SelfRepairRow key={index} row={row} />
            ))}
          </Table>
        </StyleSelfRepairHelperBorder>
      </StyleSelfRepairHelperContainer>
    </TableContainer>
  );
}

export const SelfRepairRow = ({ row }: any) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <TableBody>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ backgroundColor:"#bb2a2aea", color:"white", width: "38vw", textAlign: "center", fontSize: "1.2rem", fontWeight: "700", borderRadius:"5px"}} component="th" scope="row">
            {row.title}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <StyleCell>
                {row.content.split("-").slice(1).map((element:string) => (
                  <li key={element.trim()}>{element.trim()}</li>
                ))}
              </StyleCell>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </React.Fragment>
  );
};
