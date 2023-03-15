import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { RegistrationInfo } from "../../routes/MyVehicleRegistration";

interface Props {
  setRegistrationInfo: React.Dispatch<React.SetStateAction<RegistrationInfo>>;
}

function AdditionalSubmissionFiles({ setRegistrationInfo }: Props) {
  const imgRef = useRef<null | any>(null);
  const { register, handleSubmit } = useForm();

  const savaImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    // formData.append("file", data.file[0]);
    console.log(e.target);
  };

  return (
    <div>
      <div>
        <label htmlFor="imgFile">파일 올리기</label>
        <input
          type="file"
          {...register("file")}
          multiple={true}
          accept="image/*"
          id="imgFile"
          style={{ display: "none" }}
          ref={imgRef}
          onChange={savaImgFile}
        />
      </div>
    </div>
  );
}
export default AdditionalSubmissionFiles;
