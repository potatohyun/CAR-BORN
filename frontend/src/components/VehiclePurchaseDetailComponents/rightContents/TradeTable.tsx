import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { createData } from "./FileListStack";

const contentStyle = { fontSize: "0.66rem", fontWeight: "bolder" };

function TradeTable({ data }: { data: ReturnType<typeof createData> }) {
  return (
    <>
      <TableRow key={data?.item.id}>
        <TableCell component="th" scope="row" sx={contentStyle}>
          {`${data?.item?.buyerAccountId}`}
        </TableCell>
        <TableCell sx={contentStyle}>{data?.item?.sellerAccountId}</TableCell>
        <TableCell sx={contentStyle}>
          {parseInt(data?.item?.price).toLocaleString("ko-KR")}
        </TableCell>
        <TableCell sx={contentStyle}>
          <a href={data?.item?.metadataUri}>블록체인 거래 정보</a>
        </TableCell>
        <TableCell sx={contentStyle}>{data?.item?.regDt}</TableCell>
      </TableRow>
    </>
  );
}

export default TradeTable;
