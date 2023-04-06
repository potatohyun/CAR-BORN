import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Article from "../../components/community/Article";
import Nav2 from "../../components/Nav2";
import Footer from "../../components/Footer";

interface Post {
  title: string;
  author: string;
  content: string;
  id: string;
  created_at: string;
}

const posts: Post[] = [
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
  // const post = posts.find((p) => p.id === id);

  // if (!post) {
  //   return (
  //     <Box component="div" sx={{ mt: "50px", textAlign: "center" }}>
  //       <Typography variant="h4" component="h1" gutterBottom>
  //         글을 찾을 수 없습니다.
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <>
      <Nav2 />
      <Article />
      <Footer />
    </>
  );
}
