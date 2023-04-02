/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const leftContent = css`
  width: 40vw;
  height: 90vh;
  margin-right: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function Thumnail({
  registrationInfo,
}: Pick<
  Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>,
  "registrationInfo"
>) {
  return (
    <div css={leftContent}>
      {registrationInfo?.fileList?.length ? (
        <Carousel>
          {registrationInfo?.fileList.map((file, index) => {
            return (
              <div key={file}>
                <img src={file} alt="qwe" />
                <p className="legend">
                  {registrationInfo?.fileNames
                    ? registrationInfo?.fileNames[index]
                    : null}
                </p>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div>
          <h1>사진을 올려 주세요</h1>
        </div>
      )}
    </div>
  );
}

export default Thumnail;
