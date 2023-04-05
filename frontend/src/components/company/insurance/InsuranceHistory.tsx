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
import { useQuery } from "react-query";
import { useAPI } from "../../../hooks/useAPI";
import { useEffect } from "react";
import InsuranceModal from "./InsuranceModal";

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
  carVin: string;
  category: string;
  content: string;
  insuranceDt: string;
}

const container = css`
  position: relative;
  opacity: 0.85;
`;

export default function InsuranceHistory() {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 7;

  const URL = `http://carborn.site/api/insurance/list/${page + 1}/7`;
  const queryKey = "getInsuranceHistory";

  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  const getInsuranceHistory = useAPI("get", URL, option);

  const { data, refetch } = useQuery(queryKey, () => getInsuranceHistory, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data.message;
    },
    onError: (err) => {
      console.log(err, "에러");
    },

    suspense: true,
  });

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    refetch();
    console.log(data, "데이터");
  }, [page]);
  return (
    <div css={container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "60vw", minHeight: "60vh" }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">사고 일시</TableCell>
              <TableCell align="center">차대 번호</TableCell>
              <TableCell align="center">사고 유형</TableCell>
              <TableCell align="center">자세히 보기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map(
              (
                { id, carVin, category, content, insuranceDt }: MapType,
                idx: number
              ) => (
                <TableRow key={idx}>
                  <TableCell sx={{ minWidth: "20px" }}>{id}</TableCell>
                  <TableCell>{insuranceDt}</TableCell>
                  <TableCell>{carVin}</TableCell>
                  <TableCell align="center" sx={{ minWidth: "30px" }}>
                    {category}
                  </TableCell>
                  <TableCell align="center">
                    <InsuranceModal id={id} content={content} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.totalElements}
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
