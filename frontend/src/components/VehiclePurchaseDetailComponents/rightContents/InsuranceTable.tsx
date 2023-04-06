import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { createData } from "./FileListStack";

const contentStyle = { fontSize: "0.7rem" };

function InsuranceTable({ data }: { data: ReturnType<typeof createData> }) {
  return (
    <>
      <TableRow key={data?.item.id}>
        <TableCell component="th" scope="row" sx={contentStyle}>
          {`${data?.item?.carMaker} / ${data?.item?.carModelNm}`}
        </TableCell>
        <TableCell sx={contentStyle}>{data?.item?.carRegNm}</TableCell>
        <TableCell sx={contentStyle}>{data?.item?.carModelYear}</TableCell>
        <TableCell sx={contentStyle}>{data?.item?.category}</TableCell>
        <TableCell sx={contentStyle}>
          <a href={data?.item?.metadataUri}>블록체인 거래 정보</a>
        </TableCell>
        <TableCell sx={contentStyle}>
          {(data?.item?.regDt).replace("T", " ")}
        </TableCell>
      </TableRow>
    </>
  );
}

export default InsuranceTable;
