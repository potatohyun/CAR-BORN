import { Box, Container, Typography, Divider, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";

import { useState } from "react";
import Comment from "./Comment";
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

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();

  const [page, setPage] = useState<number>(0);

  const ObjString: any = localStorage.getItem("login-token");
  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  const articleDetailUrl = `https://carborn.site/api/user/community/${id}`;

  const getArticle = useAPI("get", articleDetailUrl, option);

  const { data } = useQuery(`getArticle${id}`, () => getArticle, {
    select: (res) => res.data.message,
  });

  const titleLen = data?.title?.length;

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: "100px", width: "65vw" }}>
        <Box component="div" sx={{ mb: "10px" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {data?.title}
          </Typography>
          <Divider
            sx={{
              mb: "10px",
              borderColor: "#d23131",
              width: `${titleLen * 35}px`,
              backgroundColor: "#d23131",
              height: "1.5px",
            }}
          />
          <Typography variant="subtitle2" component="p" gutterBottom>
            작성자 | {data?.accountName}
          </Typography>
          <Typography variant="subtitle2" component="p">
            작성일 | {dayjs(data?.regDt).format("YYYY년 MM월 DD일")}
          </Typography>
        </Box>
        <Divider sx={{ mb: "10px" }} />
        <Box
          component="div"
          sx={{
            mb: "10px",
            minHeight: "20vh",
          }}
        >
          <Typography variant="body1" component="p">
            {data?.content}
          </Typography>
        </Box>
        <Comment />
      </Container>
    </ThemeProvider>
  );
}
