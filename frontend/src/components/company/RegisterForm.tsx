/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimePicker from "./Timepicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs from "dayjs";
import FileUpload from "../FileUpload";
import Carousels from "./Carousels";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import axios from "axios";

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
`;

export default function RegisterForm() {
  const [selectTime, setSelectTime] = useState<any>("");
  const [beforeImage, setbeforeImage] = useState<string>("");
  const [beforeImageFile, setbeforeImageFile] = useState<string>("");
  const [afterImage, setAfterImage] = useState<string>("");
  const [afterImageFile, setAfterImageFile] = useState<string>("");
  const [reciptImage, setReciptImage] = useState<string>("");
  const [reciptImageFile, setReciptImageFile] = useState<string>("");
  const [연비, set연비] = useState<string>("");
  const [content, setContent] = useState<string>("123123");

  const URL = "http://192.168.100.176/api/repair-shop/book";

  const handleTextInput = (e: any) => {
    setContent(e.target.value);
  };

  const fileUpLoadAPI = async (data: FormData) => {
    return fetch(URL, {
      method: "PUT",
      body: data,
      // url: "http://192.168.100.176/api/repair-shop/book",
      //   data: data,
      //   headers: { "Content-Type": "multipart/form-data" },
      /// axios 코드
    });
  };

  const { mutate } = useMutation(fileUpLoadAPI);

  const isGarage = useLocation().pathname == "/garage/register";
  const { id } = useLocation().state;

  const change연비 = (e: any) => {
    if (/^[0-9]+$/.test(e.target.value)) {
      set연비(e.target.value);
    } else {
      set연비("");
      alert("숫자만 입력하세요");
    }
  };

  const submit = () => {
    const formData = new FormData();

    formData.append("beforeImg", beforeImageFile);
    formData.append("afterImg", afterImageFile);
    formData.append("receiptImg", reciptImageFile);
    formData.append("repairBook.id", id); // 직렬화하여 객체 저장
    formData.append("content", content); // 직렬화하여 객체 저장
    formData.append("mileage", 연비); // 직렬화하여 객체 저장
    formData.append("inspectDt", selectTime); // 직렬화하여 객체 저장 // 하면 안됨
    mutate(formData);
  };

  return (
    <div css={container}>
      <div className="section1">
        <Carousels<ImageType> images={[beforeImage, afterImage, reciptImage]} />
      </div>
      <div className="section2">
        <div className="formDetail">
          {isGarage ? "수리 완료 일자" : "검수 완료 일자"}
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
            />
            <TimePicker setSelectTime={setSelectTime} />
          </div>
        </div>
        <div className="formDetail">
          {isGarage ? "수리 내용" : "검수 내용"}
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            size="small"
            onChange={handleTextInput}
            placeholder={
              isGarage
                ? "수리 내역을 입력해 주세요"
                : "검수 내역을 입력해 주세요"
            }
          />
        </div>
        <div className="formDetail">
          주행거리
          <TextField
            id="standard-basic"
            variant="standard"
            size="small"
            value={연비}
            placeholder="숫자만 입력하세요 (단위 : km)"
            onChange={change연비}
          />
        </div>
        <div className="formDetail upload">
          {isGarage ? "수리 전 사진 등록" : "검수 전 사진 등록"}
          <FileUpload
            size={20}
            row={1}
            setImage={setbeforeImage}
            setFile={setbeforeImageFile}
          />
        </div>
        <div className="formDetail upload">
          {isGarage ? "수리 후 사진 등록" : "검수 후 사진 등록"}
          <FileUpload
            size={20}
            row={1}
            setImage={setAfterImage}
            setFile={setAfterImageFile}
          />
        </div>
        <div className="formDetail upload">
          영수증 등록
          <FileUpload
            size={20}
            row={1}
            setImage={setReciptImage}
            setFile={setReciptImageFile}
          />
        </div>
        <Button variant="contained" sx={{ maxWidth: "50%" }} onClick={submit}>
          제출
        </Button>
      </div>
    </div>
  );
}
