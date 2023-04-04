/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { InputLabel } from "@mui/material";

const container = css`
  display: flex;
  align-items: center;
  width: auto;
  flex-wrap: nowrap;
  height: 10px;
  .cancel {
    width: 20px;
    height: 20px;
    display: flex;
    text-align: center;

    align-items: center;
    margin-left: 10px;
    font-weight: bolder;
    cursor: pointer;
  }
`;

export default function FileUpload({
  size,
  row,
  setImage,
  setFile,
}: {
  size: number;
  row: number;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setFile: any;
}) {
  const [imageName, setImageName] = useState<string>("");

  const readAndPreview = (file: any) => {
    console.log(file);
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();

      setImageName(file.name);
      reader.onload = () => {
        setFile(file);
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancel = () => {
    setImageName("");
    setImage("");
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };
  return (
    <div css={container}>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={row}
        size="small"
        sx={{ marginLeft: "10px" }}
        value={imageName}
        InputProps={{
          readOnly: true,
        }}
        placeholder="사진을 선택해 주세요"
      />
      <IconButton
        color="error"
        aria-label="upload picture"
        component="label"
        sx={{ fontSize: size, border: "2px solid #d23131", marginLeft: "10px" }}
      >
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={addImage}
          multiple={true}
        />
        <PhotoCamera />
      </IconButton>
      {imageName ? (
        <div className="cancel" onClick={cancel}>
          X
        </div>
      ) : null}
    </div>
  );
}
