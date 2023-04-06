import { Pagination, Stack } from "@mui/material";

interface PropType {
  totalLen: number;
  setPage: any;
}
export default function CommentPageNation({ totalLen, setPage }: PropType) {
  const handlePage = (v: any) => {
    setPage(v);
  };
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: "15px" }}>
      <Pagination
        count={totalLen}
        size="small"
        onChange={(e, v) => handlePage(v)}
      />
    </Stack>
  );
}
