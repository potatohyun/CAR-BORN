/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
import { useQueryClient } from "react-query";
import TradeTable from "./TradeTable";

// 거래

const tradeTableRowName: string[] = [
  "판매자",
  "구매자",
  "거래가",
  "블록체인 정보",
  "등록일시",
];

// 정비
const repairTableRowName: string[] = [
  "차량모델",
  "차량번호",
  "연식",
  "주행거리",
  "등록일시",
];

// 검수
const inspectTableRowName: string[] = ["검수내용", "주행거리", "등록일시"];

// 보험
const insuranceTableRowName: string[] = [
  "제조사 / 차량모델",
  "차량번호",
  "연식",
  "유형",
  "등록일시",
];

const imgFontStyle = { fontWeight: "bolder", marginLeft: "1.2%" };

const container = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

const noContent = css`
  width: 10vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 900;
`;

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
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                css={{ fontWeight: "600" }}
              >
                세부정보
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead
                  sx={{
                    backgroundColor: "rgba(224, 0, 0, 0.6)",
                  }}
                >
                  <TableRow>
                    {(value === 0
                      ? tradeTableRowName
                      : value === 1
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
                            fontSize: "0.6rem",
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
                  {value === 0 ? (
                    <TradeTable data={data} />
                  ) : value === 1 ? (
                    <RepairTable data={data} />
                  ) : value === 2 ? (
                    <InspectTable data={data} />
                  ) : (
                    <InsuranceTable data={data} />
                  )}
                </TableBody>
              </Table>
              <div css={{ margin: "3% 0" }}>
                <span css={{ fontSize: "1rem", fontWeight: "600" }}>
                  내용 :{" "}
                  <span css={{ fontSize: "0.8em", fontWeight: "500" }}>
                    {data?.item.content}
                  </span>{" "}
                </span>
              </div>
              {value === 0 ? null : value !== 3 ? (
                <>
                  <div>
                    <span style={imgFontStyle}>
                      {value === 1 ? "정비전" : "검수전"}
                    </span>
                    <img
                      src={data?.item.beforeImgNm}
                      alt="전"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <span style={imgFontStyle}>
                      {value === 1 ? "정비후" : "검수후"}
                    </span>
                    <img
                      src={data?.item.afterImgNm}
                      alt="후"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <span style={imgFontStyle}>영수증</span>
                    <img
                      src={data?.item.receiptImgNm}
                      alt="영수증"
                      style={{ width: "100%" }}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <span style={imgFontStyle}>처리결과사진</span>
                  <img
                    src={data?.item.insuranceImgNm}
                    alt="처리결과"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
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
      return value === 0
        ? createData(item?.sellerAccountId, item?.regDt, item)
        : value === 1
        ? // 정비
          createData(
            item?.repairBookRepairShopAccountName,
            item?.repairDt,
            item
          )
        : value === 2
        ? // 검수
          createData(
            item?.inspectBookInspectorAccountName,
            item?.inspectDt,
            item
          )
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
    if (value === 0) {
      setTotalPage(pageData?.trade?.totalPages);
    } else if (value === 1) {
      setTotalPage(pageData?.repair?.totalPages);
    } else if (value === 2) {
      setTotalPage(pageData?.inspect?.totalPages);
    } else {
      setTotalPage(pageData?.insurance?.totalPages);
    }
  }, [page, totalPage]);

  return (
    <>
      {DATA ? (
        <TableContainer component={Paper} css={container}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E00000" }}>
                <TableCell />
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {value === 0
                    ? "판매자"
                    : value === 1
                    ? "정비소"
                    : value === 2
                    ? "검사소"
                    : "보험회사"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {value === 0
                    ? "거래일시"
                    : value === 1
                    ? "정비일시"
                    : value === 2
                    ? "검수일시"
                    : "사고일시"}
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
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </TableContainer>
      ) : (
        <div css={noContent}>기록이 없습니다.</div>
      )}
    </>
  );
}
