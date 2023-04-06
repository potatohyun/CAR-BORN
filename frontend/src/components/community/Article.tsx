import * as React from "react";
import { Box, Container, Typography, Divider, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
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

const posts: any = [
  {
    title: "첫 번째 글",
    author: "작성자1",
    content: "내용1",
    id: "1",
    created_at: "1632622657000",
  },
  {
    title: "두 번째 글",
    author: "작성자2",
    content: "내용2",
    id: "2",
    created_at: "1632562467000",
  },
  {
    title: "세 번째 글",
    author: "작성자3",
    content: "내용3",
    id: "3",
    created_at: "1632429545000",
  },
];

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p: any) => p.id === id);
  const navigate = useNavigate();
  const URL = `https://carborn.site/api/user/community/${id}`;
  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };
  const getArticle = useAPI("get", URL, option);

  const { data } = useQuery("getArticle", () => getArticle, {
    select: (res) => res.data.message,
  });
  console.log(data);
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: "50px" }}>
        <Box component="div" sx={{ mb: "40px" }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Community Board
          </Typography>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" onClick={handleBackClick}>
              목록으로 돌아가기
            </Button>
          </Box>
        </Box>
        <Box component="div" sx={{ mb: "40px" }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {data?.title}
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            작성자: {data?.accountName}
          </Typography>
          <Typography variant="subtitle2" component="p">
            작성일: {dayjs(data?.regDt).format("YYYY년 MM월 DD일")}
          </Typography>
        </Box>
        <Divider sx={{ mb: "40px" }} />
        <Typography variant="body1" component="p">
          {data?.content}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
