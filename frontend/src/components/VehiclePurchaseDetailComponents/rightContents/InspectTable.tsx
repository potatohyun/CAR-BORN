import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { createData } from "./FileListStack";

const contentStyle = { fontSize: "0.7rem" };

function InspectTable({ data }: { data: ReturnType<typeof createData> }) {
  return (
    <>
      <TableRow key={data?.item.id}>
        <TableCell sx={contentStyle}>{data?.item?.content}</TableCell>
        <TableCell sx={contentStyle}>
          {parseInt(data?.item?.mileage).toLocaleString("ko-KR")}
        </TableCell>
        <TableCell sx={contentStyle}>
          {(data?.item?.regDt).replace("T", " ")}
        </TableCell>
      </TableRow>
    </>
  );
}

export default InspectTable;
