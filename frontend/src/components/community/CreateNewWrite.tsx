/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Nav2 from "./../Nav2";
import Footer from "./../Footer";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import SpeedDial from "@mui/material/SpeedDial";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const container = css`
  position: relative;

  .submit {
    position: absolute;
    top: 2.8%;
    right: 18%;
    z-index: 3;
  }
  .btn {
    border: 0;
    width: 5vw;
    height: 4vh;
    background-color: #d23131;
    &:hover {
      background-color: #af2929;
    }
    color: white;
    cursor: pointer;
    font-weight: 500;
    border-radius: 4px;
  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    height: 60vh;
    width: 60vw;
  }
  .ck-editor {
    margin-left: 20%;
  }
  .inputStyle {
    width: 20%;
    height: 4vh;
    border-top: transparent;
    border-right: transparent;
    border-left: transparent;
    border-color: #d0cece;
    &:focus {
      outline: none;
      border-color: #d23131;
    }
  }
`;

const speedDialStyle = css`
  .MuiButtonBase-root {
    background-color: #d23131;
    &:hover {
      background-color: #af2828;
    }
  }
`;

interface ContentType {
  title: string;
  content: string;
}

export default function CreateNewWrite() {
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentType>({
    title: "",
    content: "",
  });
  const ObjString: any = localStorage.getItem("login-token");

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const { mutate } = useMutation(
    () => {
      return axios({
        method: "post",
        url: `https://carborn.site/api/user/community`,
        data: { ...contents },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(ObjString).value}`,
        },
      });
    },
    {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "글 작성을 성공했습니다.",
          didClose: () => navigate("/user/community"),
        });
      },
    }
  );

  const setTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setContents((contents) => {
      return { ...contents, title: inputValue };
    });
  };

  const setContentData = () => {
    if (!contents.content || !contents.title) {
      Toast.fire({
        icon: "error",
        title: "모든 항목은 필수입니다.",
      });
    } else {
      mutate();
    }
  };

  return (
    <div>
      <Nav2 />
      <div css={speedDialStyle}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: "fixed",
            bottom: 50,
            right: 50,
          }}
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        ></SpeedDial>
      </div>

      <div css={container}>
        <div css={{ margin: "1% 0 1% 20%" }}>
          <span css={{ fontSize: "1.2rem" }}>제목 : </span>
          <input
            type="text"
            autoComplete="false"
            className="inputStyle"
            onBlur={setTitle}
          />
        </div>
        <div className="submit">
          <button className="btn" onClick={setContentData}>
            작성
          </button>
        </div>
        <CKEditor
          editor={ClassicEditor}
          //   data="<p>Hello from CKEditor 5!</p>"
          config={{
            placeholder: "내용을 입력하세요.",
          }}
          onBlur={(event: any, editor: any) => {
            const data = editor.getData();
            setContents((contents) => {
              return { ...contents, content: data };
            });
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
