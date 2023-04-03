// 테이블
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InsuranceTable from "./InsuranceTable";
import RepairTable from "./RepairTable";
import InspectTable from "./InspectTable";

// 페이지네이션 버튼
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import car from "../../../assets/car.png";
import { useQueryClient } from "react-query";

const repairTableRowName: string[] = [
  "차량모델",
  "차량번호",
  "연식",
  "주행거리",
  "등록일시",
];
const inspectTableRowName: string[] = ["검수내용", "주행거리", "등록일시"];
const insuranceTableRowName: string[] = [
  "제조사 / 차량모델",
  "차량번호",
  "연식",
  "유형",
  "등록일시",
];

const imgFontStyle = { fontWeight: "bolder", marginLeft: "1.2%" };

export function createData(
  companyAccountId: string,
  conpanyDt: string,
  item: any
) {
  return {
    companyAccountId,
    conpanyDt,

    item,
  };
}

function Row(props: {
  data: ReturnType<typeof createData>;
  value: number;
  modalOpen: boolean;
}) {
  const { data, value, modalOpen } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!modalOpen) {
      setOpen(false);
    }
  }, [modalOpen]);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: "bolder" }}>
          {value === 1
            ? // 정비
              data?.companyAccountId
            : // 검수
            value === 2
            ? data?.companyAccountId
            : // 보험
              data?.companyAccountId}
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: "bolder" }}>
          {(data?.conpanyDt).replace("T", " ")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component="div" sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                세부내용
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead
                  sx={{
                    backgroundColor: "rgba(224, 0, 0, 0.6)",
                  }}
                >
                  <TableRow>
                    {(value === 1
                      ? // 정비
                        repairTableRowName
                      : value === 2
                      ? // 검수
                        inspectTableRowName
                      : // 보험
                        insuranceTableRowName
                    ).map((title: string, index) => {
                      return (
                        <TableCell
                          sx={{
                            fontSize: "0.72rem",
                            fontWeight: "bolder",
                            color: "white",
                          }}
                          align="center"
                          key={`${title}-${index}`}
                        >
                          {title}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value === 1 ? (
                    <RepairTable data={data} />
                  ) : value === 2 ? (
                    <InspectTable data={data} />
                  ) : (
                    <InsuranceTable data={data} />
                  )}
                </TableBody>
              </Table>
              {value !== 3 ? (
                <>
                  <div>
                    <span style={imgFontStyle}>검수전</span>
                    <img src={car} alt="car.img" style={{ width: "100%" }} />
                  </div>
                  <div>
                    <span style={imgFontStyle}>검수후</span>
                    <img src={car} alt="car.img" style={{ width: "100%" }} />
                  </div>
                  <div>
                    <span style={imgFontStyle}>영수증</span>
                    <img src={car} alt="car.img" style={{ width: "100%" }} />
                  </div>
                </>
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function FileListStack<T>({
  data,
  value,
  modalOpen,
  page,
  setPage,
}: {
  data: T[];
  value: number;
  modalOpen: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const [totalPage, setTotalPage] = React.useState<number>(1);

  let DATA = null;

  if (data.length) {
    DATA = data?.map((item: any) => {
      return value === 1
        ? // 정비
          createData(item?.repairCompanyAccountId, item?.repairDt, item)
        : value === 2
        ? // 검수
          createData(item?.inspectCompanyAccountId, item?.inspectDt, item)
        : // 보험
          createData(item?.insuranceCompanyAccountId, item?.insuranceDt, item);
    });
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  React.useEffect(() => {
    const pageData = queryClient.getQueryData<any>(["get-car-detail", page])
      .data.message;

    if (value === 1) {
      setTotalPage(pageData?.repair?.totalPages);
    } else if (value === 2) {
      setTotalPage(pageData?.inspect?.totalPages);
    } else {
      setTotalPage(pageData?.insurance?.totalPages);
    }
  }, [page, totalPage]);

  return (
    <TableContainer
      component={Paper}
      style={{ width: "28.7vw", height: "100%" }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#E00000" }}>
            <TableCell />
            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {value === 1 ? "정비소" : value === 2 ? "검사소" : "보험회사"}
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {value === 1 ? "정비일시" : value === 2 ? "검수일시" : "사고일시"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DATA
            ? DATA.map((data: any) => (
                <Row
                  key={data?.item?.id}
                  data={data}
                  value={value}
                  modalOpen={modalOpen}
                />
              ))
            : null}
        </TableBody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          left: "50%",
          margin: "2% 0",
        }}
      >
        <Stack spacing={2}>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </TableContainer>
  );
}
