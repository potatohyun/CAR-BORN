import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";

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
    <div>
      <span>자동차 등록증</span>
      <div>
        <input type="file" accept="image/*" onChange={onSaveFiles} />
        {(registrationInfo?.vrc || []).map((file, index) => {
          return (
            <div key={`${file.name}/${index}`}>
              <span style={{ padding: "0" }}>{file.name}</span>
              <button onClick={() => deleteImg(index)}>삭제</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VehicleRegistrationCertificate;
