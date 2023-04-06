import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { createData } from "./FileListStack";

const contentStyle = { fontSize: "0.66rem", fontWeight: "bolder" };

function RepairTable({ data }: { data: ReturnType<typeof createData> }) {
  return (
    <>
      <TableRow key={data?.item.id}>
        <TableCell component="th" scope="row" sx={contentStyle}>
          {`${data?.item?.repairBookCarModelNm}`}
        </TableCell>
        <TableCell sx={contentStyle}>
          {data?.item?.repairBookCarRegNm}
        </TableCell>
        <TableCell sx={contentStyle}>
          {data?.item?.repairBookCarModelYear}
        </TableCell>
        <TableCell sx={contentStyle}>
          {parseInt(data?.item?.mileage).toLocaleString("ko-KR")}
        </TableCell>
        <TableCell sx={contentStyle}>
          <a href={data?.item?.metadataUri}>블록체인 거래 정보</a>
        </TableCell>
        <TableCell sx={contentStyle}>
          {(data?.item?.repairDt).replace("T", " ")}
        </TableCell>
      </TableRow>
    </>
  );
}

export default RepairTable;
