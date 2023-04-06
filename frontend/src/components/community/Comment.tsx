import { Box, Typography, Divider, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useQuery, useMutation } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useQueryClient } from "react-query";
import CommentPageNation from "./CommentPageNation";

interface MapType {
  accountId: string;
  accountName: string;
  id: string;
  regDt: string;
  content: string;
}

export default function Comment() {
  const [commentData, setCommentData] = useState<any[]>([]);
  const [page, setPage] = useState<any>(1);
  const [comment, setComment] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const [isFetch, setIsFetch] = useState(false);

  const queryClient = useQueryClient();
  const ObjString: any = localStorage.getItem("login-token");
  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  const postOption = {
    data: {
      community: {
        id: id,
      },
      content: comment,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  let getCommentsUrl = `https://carborn.site/api/user/community/${id}/comment/${page}/5`;
  const postCommentUrl = `https://carborn.site/api/user/community/comment`;

  const getComments = useAPI("get", getCommentsUrl, option);

  const { data, refetch }: any = useQuery(
    `getComments${id}`,
    () => getComments,
    {
      select: (res) => res?.data?.message,
      enabled: !!isFetch,
      retry: false,
    }
  );

  const { mutate } = useMutation(
    () =>
      axios({
        url: postCommentUrl,
        method: "post",
        ...postOption,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (comment) {
      mutate();
      queryClient.invalidateQueries(`getComments${id}`);
      setIsFetch(true);
    } else {
      alert("내용을 입력해 주세요");
    }
    setComment("");
  };

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    setCommentData(data?.content);
  }, [data?.content]);

  return (
    <Box component="div" sx={{ mb: "20px" }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Comment
      </Typography>
      <Divider
        sx={{
          mb: "20px",
          width: "6vw",
          borderColor: "#d23131",
          backgroundColor: "#d23131",
          height: "1.5px",
        }}
      />

      {!commentData?.length ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
          {commentData?.map(({ accountName, id, content }: MapType) => (
            <Box
              key={id}
              component="li"
              sx={{
                mt: "5px",
                pb: "10px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="p"
                gutterBottom
                sx={{ fontWeight: "bolder" }}
              >
                {accountName}
              </Typography>

              <Typography variant="subtitle1" component="p">
                {content}
              </Typography>
              <Divider sx={{ mb: "5px" }} />
            </Box>
          ))}
        </Box>
      )}
      <CommentPageNation
        totalLen={data ? Math.ceil(data?.totalElements / 5) : 0}
        setPage={setPage}
      />
      <Box component="form">
        <TextField
          id="standard-basic"
          variant="standard"
          value={comment}
          placeholder="댓글을 입력해 주세요"
          sx={{ width: "60%", mt: "10px", p: "10px", padding: "0" }}
          onChange={handleComment}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          sx={{ mt: "10px", float: "right" }}
        >
          댓글 달기
        </Button>
      </Box>
    </Box>
  );
}
