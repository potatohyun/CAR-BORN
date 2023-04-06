/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimePicker from "../Timepicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs from "dayjs";
import FileUpload from "../../FileUpload";
import Carousels from "../Carousels";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

type ImageType = string[];

const container = css`
  overflow: scroll;
  height: 75vh;
  width: 70vw;
  background-color: #f6f6f6;
  position: relative;
  opacity: 0.85;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }

  .section1 {
    width: 50%;
    height: 100%;
    border-right: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .section2 {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0 0 20px;
  }

  .imgSection {
    width: 50%;
    height: 50%;
    position: relative;
  }

  .formDetail {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .text {
    margin-right: 20px;
  }

  .upload {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .btnSection {
    display: flex;
    justify-content: end;
    .btn:nth-of-type(1) {
      width: 100px;
    }
    .btn:nth-of-type(2) {
      margin: 0 10px;
      width: 150px;
    }
  }
`;

export default function InsuranceForm() {
  const [selectTime, setSelectTime] = useState<any>("");
  const [reciptImage, setReciptImage] = useState<string>("");
  const [reciptImageFile, setReciptImageFile] = useState<string>("");
  // const [연비, set연비] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const navigate = useNavigate();

  const URL = "https://carborn.site/api/insurance/book";

  const ObjString: any = localStorage.getItem("login-token");
  const option = {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };
  const fileUpLoadAPI = async (data: FormData) => {
    return fetch(URL, {
      method: "PUT",
      body: data,
      ...option,
    });
  };

  const { mutate } = useMutation(fileUpLoadAPI);

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const submit = () => {
    const formData = new FormData();

    formData.append("receiptImg", reciptImageFile);
    // formData.append("mileage", 연비);
    formData.append("inspectDt", selectTime);
    formData.append("category", category);
    if (reciptImageFile && content && selectTime) {
      mutate(formData);
      Toast.fire({
        icon: "success",
        title: "등록이 성공적으로 완료됐습니다.",
        didClose: () => navigate("/insurance"),
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "모든 항목은 필수입니다.",
      });
    }
  };

  const changeCategory = (e: any) => {
    setCategory(e.target.value);
  };

  const changeContent = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div css={container}>
      <div className="section1">
        <Carousels<ImageType> images={[reciptImage]} />
      </div>
      <div className="section2">
        <div className="formDetail">
          사고 일자
          <div css={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="standard-basic"
              variant="standard"
              className="text"
              placeholder="시간을 선택해 주세요"
              value={
                !selectTime
                  ? ""
                  : dayjs(selectTime).format("YYYY-MM-DD hh시 mm분")
              }
              InputProps={{
                readOnly: true,
              }}
              onChange={changeContent}
            />
            <TimePicker setSelectTime={setSelectTime} />
          </div>
        </div>
        <div className="formDetail">
          사고 유형
          <TextField
            id="standard-basic"
            variant="standard"
            size="small"
            placeholder="사고 유형을 입력해 주세요"
            onChange={changeCategory}
          />
        </div>
        <div className="formDetail">
          사고 내용
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            size="small"
            placeholder={"사고 내용을 입력해 주세요"}
            onChange={changeContent}
          />
        </div>
        <div className="formDetail upload">
          사진 등록
          <FileUpload
            size={20}
            row={1}
            setImage={setReciptImage}
            setFile={setReciptImageFile}
          />
        </div>
        <div className="btnSection">
          <Button
            className="btn"
            variant="outlined"
            sx={{ maxWidth: "50%" }}
            onClick={() => navigate(-1)}
            color="error">
            취소
          </Button>
          <Button
            className="btn"
            variant="contained"
            sx={{ maxWidth: "50%" }}
            onClick={submit}
            color="error">
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}
