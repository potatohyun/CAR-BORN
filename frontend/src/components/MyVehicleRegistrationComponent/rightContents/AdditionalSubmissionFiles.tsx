import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";

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

          const newFileNames: string[] = [
            ...(registrationInfo.fileNames || []),
            uploadFile.name,
          ];

          return {
            ...registrationInfo,
            fileList: newFileListL,
            fileNames: newFileNames,
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
    <div>
      <input
        type="file"
        multiple={true} /* 파일 여러개 선택 가능하게 하기 */
        accept="image/*"
        onChange={onSaveFiles}
      />
      {(registrationInfo?.files || []).map((file, index) => {
        return (
          <div key={`${file.name}/${index}`}>
            <span style={{ padding: "0" }}>{file.name}</span>
            <button onClick={() => deleteImg(index)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
}

export default AdditionalSubmissionFiles;
