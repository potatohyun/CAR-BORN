/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";
import { titleStyle } from "./ManufacturingCompany";
import { deleteBtnStyle } from "./VehicleRegistrationCertificate";

const file2Box = css`
  margin-bottom: 2%;

  .upload-name2 {
    width: 100%;
  }
  .filebox2 .upload-name2 {
    display: inline-block;
    margin-top: 2%;
    height: 5vh;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #bebebe;
    width: 67.6%;
    color: #bebebe;
  }
  .filebox2 .file2 {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 2%;
    line-height: 100%;
    color: #ffffff;
    font-weight: 600;
    vertical-align: middle;
    background-color: #000000;
    cursor: pointer;
    height: 2.4vh;
    margin-left: 2.4%;
  }
  .filebox2 input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

function AdditionalSubmissionFiles({
  registrationInfo,
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  // 파일 선택
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

    uploadFiles.forEach((uploadFile) => {
      const reader = new FileReader();

      setRegistrationInfo((registrationInfo) => {
        const newFiles = [...(registrationInfo.files || []), uploadFile];
        return { ...registrationInfo, files: newFiles };
      });

      reader.onload = () => {
        // 사진 이미지랑 파일 이름 state에 저장
        setRegistrationInfo((registrationInfo) => {
          const newFileListL: File[] = [
            ...(registrationInfo.fileList || []),
            reader.result,
          ];

          return {
            ...registrationInfo,
            fileList: newFileListL,
          };
        });
      };

      reader.readAsDataURL(uploadFile);
    });
    e.target.value = "";
  };

  // 등록된 사진 삭제 이벤트
  const deleteImg = (index: number) => {
    // 사진 파일 삭제
    setRegistrationInfo((registrationInfo) => {
      const newFileList = (registrationInfo.files || []).filter(
        (file, number) => {
          return number !== index;
        }
      );
      return { ...registrationInfo, files: newFileList };
    });

    // 사진 이미지 삭제
    setRegistrationInfo((registrationInfo) => {
      const newFileListL: File[] = (registrationInfo.fileList || []).filter(
        (file, number) => {
          return index !== number;
        }
      );

      return {
        ...registrationInfo,
        fileList: newFileListL,
      };
    });
  };

  return (
    <div css={file2Box}>
      <span css={titleStyle}>자동차 사진</span>
      <div className="filebox2">
        <input
          className="upload-name2"
          value="첨부파일"
          placeholder="첨부파일"
          disabled={true}
        />

        <label htmlFor="file2" className="file2">
          파일찾기
        </label>
        <input
          id="file2"
          type="file"
          multiple={true} /* 파일 여러개 선택 가능하게 하기 */
          accept="image/*"
          onChange={onSaveFiles}
        />
        {(registrationInfo?.files || []).map((file, index) => {
          return (
            <div key={`${file.name}/${index}`} css={deleteBtnStyle}>
              <span style={{ margin: "2% 0 0 0", fontWeight: "900" }}>
                ㆍ{file.name}
              </span>
              <button className="deleteBtn" onClick={() => deleteImg(index)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdditionalSubmissionFiles;
