/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, TableFooter } from "@mui/material";
import { useState } from "react";
import HistoryModal from "./HistoryModal";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReviewModal from "./ReviewModal";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}
interface MapType {
  id: string;
  regDt: string;
  mileage: string;
  repairDt: string;
}

const container = css`
  position: relative;
  opacity: 0.85;
`;

export default function HistoryTable() {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 7;

  const isGarage = useLocation().pathname == "/garage/history";

  let URL: any;
  let queryKey;

  if (isGarage) {
    URL = `http://carborn.site/api/repair-shop/result/list/${page + 1}/7`;
    queryKey = "getGarageHistory";
  } else {
    URL = `http://carborn.site/api/inspector/result/list/${page + 1}/7`;
    queryKey = "getInspectorHistory";
  }

  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };
  const getHistoryData = useAPI("get", URL, option);

  const { data, refetch } = useQuery(queryKey, () => getHistoryData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      // return data.data;
      return data.data.message;
    },
    onError: (err) => {
      console.log(err);
    },

    suspense: true,
  });

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  console.log(data);
  useEffect(() => {
    refetch();
  }, [page]);
  return (
    <div css={container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "60vw", minHeight: "60vh" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                No
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                요청 날짜
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                완료 날짜
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                주행 거리
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                자세히 보기
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                리뷰 보기
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map(
              ({ id, regDt, repairDt, mileage }: MapType, idx: number) => (
                <TableRow key={idx}>
                  <TableCell sx={{ minWidth: "20px" }}>{id}</TableCell>
                  <TableCell align="center">{regDt}</TableCell>
                  <TableCell align="center">{repairDt}</TableCell>
                  <TableCell align="center" sx={{ minWidth: "30px" }}>
                    {mileage} KM
                  </TableCell>
                  <TableCell align="center">
                    <HistoryModal id={id} />
                  </TableCell>
                  <TableCell align="center">
                    <ReviewModal id={id} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.totalElements}
                // count={15}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
