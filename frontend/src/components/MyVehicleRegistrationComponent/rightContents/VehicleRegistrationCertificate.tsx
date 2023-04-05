/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";
import { titleStyle } from "./ManufacturingCompany";

const fileBox = css`
  margin-bottom: 2%;

  .upload-name {
    width: 100%;
  }
  .filebox .upload-name {
    display: inline-block;
    margin-top: 2%;
    height: 5vh;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #bebebe;
    width: 67.6%;
    color: #bebebe;
  }
  .filebox .file {
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
  .filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export const deleteBtnStyle = css`
  display: flex;
  justify-content: space-between;
  .deleteBtn {
    border: 0;
    height: 4.8vh;
    margin-top: 2%;
    margin-right: 3%;
    width: 5vw;
    color: white;
    background-color: #000000;
    opacity: 0.3;
    font-weight: 900;
    cursor: pointer;
  }
`;

function VehicleRegistrationCertificate({
  registrationInfo,
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

    uploadFiles.forEach((uploadFile) => {
      const reader = new FileReader();

      setRegistrationInfo((registrationInfo) => {
        const newFiles = [...(registrationInfo.vrc || []), uploadFile];
        return { ...registrationInfo, vrc: newFiles };
      });

      reader.onload = () => {
        // 사진 이미지랑 파일 이름 state에 저장
        setRegistrationInfo((registrationInfo) => {
          const newFileListL: File[] = [
            ...(registrationInfo.vrcList || []),
            reader.result,
          ];

          return {
            ...registrationInfo,
            vrcList: newFileListL,
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
      const newFileList = (registrationInfo.vrc || []).filter(
        (file, number) => {
          return number !== index;
        }
      );
      return { ...registrationInfo, vrc: newFileList };
    });

    // 사진 이미지 삭제
    setRegistrationInfo((registrationInfo) => {
      const newFileListL: File[] = (registrationInfo.vrcList || []).filter(
        (file, number) => {
          return index !== number;
        }
      );

      return {
        ...registrationInfo,
        vrcList: newFileListL,
      };
    });
  };

  return (
    <div css={fileBox}>
      <span css={titleStyle}>자동차 등록증</span>
      <div className="filebox">
        <input
          className="upload-name"
          value="첨부파일"
          placeholder="첨부파일"
          disabled={true}
        />

        <label htmlFor="file" className="file">
          파일찾기
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          multiple={true}
          onChange={onSaveFiles}
        />
      </div>
      {(registrationInfo?.vrc || []).map((file, index) => {
        return (
          <div key={`${file.name}/${index}`} css={deleteBtnStyle}>
            <p style={{ margin: "2% 0 0 0", fontWeight: "900" }}>
              ㆍ{file.name}
            </p>
            <button className="deleteBtn" onClick={() => deleteImg(index)}>
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default VehicleRegistrationCertificate;
