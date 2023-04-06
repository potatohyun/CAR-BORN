import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Article from "../../components/community/Article";
import Nav2 from "../../components/Nav2";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router";

interface Post {
  title: string;
  author: string;
  content: string;
  id: string;
  created_at: string;
}

export default function ArticleDetail() {
  const navigate = useNavigate();

  return (
    <>
      <Nav2 />
      <Article />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
        icon={<ArrowBackIcon />}
        FabProps={{
          sx: {
            bgcolor: "#d23131",
            "&:hover": {
              bgcolor: "#af2828",
            },
          },
        }}
        onClick={() => navigate(-1)}
      />
      <Footer />
    </>
  );
}
