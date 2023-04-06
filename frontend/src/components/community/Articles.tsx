import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import dayjs from "dayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d23131",
    },
    secondary: {
      main: "#dbdbdb",
    },
    background: {
      default: "white",
    },
  },
});

interface MapType {
  id: string;
  accountName: string;
  regDt: string;
  title: string;
}

export default function Articles() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const navigate = useNavigate();

  const URL = `https://carborn.site/api/user/community/list/${page}/10/0`;
  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  const getArticles = useAPI("get", URL, option);

  const { data, refetch } = useQuery("getArticles", () => getArticles, {
    select: (res) => res.data?.message,
    onSuccess: (res) => setTotalPage(res.totalPages),
  });

  useEffect(() => {
    refetch();
  }, [page]);
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: "50px", width: "70vw" }}>
        <Box component="div" sx={{ mb: "40px" }}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          ></Box>
        </Box>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead sx={{ backgroundColor: "#f7f7f7" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  width: "6%",
                  color: "#23131",
                  border: "none",
                }}
              >
                번호
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  width: "50%",
                  color: "#23131",
                  border: "none",
                }}
              >
                제목
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  width: "10%",
                  color: "#23131",
                  border: "none",
                }}
              >
                작성자
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  width: "15%",
                  color: "#23131",
                  border: "none",
                }}
              >
                작성일자
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map(
              ({ id, accountName, regDt, title }: MapType, idx: number) => (
                <TableRow
                  key={id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                    textDecoration: "none",
                  }}
                >
                  <TableCell sx={{ color: "gray" }}>{id}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "400px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/user/community/${id}`)}
                  >
                    {title}
                  </TableCell>
                  <TableCell sx={{ color: "gray" }}>{accountName}</TableCell>
                  <TableCell sx={{ color: "gray" }}>
                    {dayjs(regDt).format("YYYY년 MM월 DD일")}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <Stack spacing={2} alignItems="center" sx={{ mt: "15px", mb: "20px" }}>
          <Pagination
            count={totalPage}
            size="large"
            onChange={(e, v) => setPage(v)}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
