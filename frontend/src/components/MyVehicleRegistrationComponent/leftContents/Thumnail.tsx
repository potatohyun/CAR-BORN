/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const leftContent = css`
  width: 30vw;
  height: 30%;
  margin-right: 6vw;

  .slider {
    display: flex;
    align-items: center;
    height: auto;
  }

  .carousel-slider {
    .slider-wrapper {
      height: auto;
      width: auto;
    }
  }
  .carousel {
    .thumbs-wrapper {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
    }
  }
  .no-img {
    text-align: center;
    margin-top: 50%;
  }
`;

function Thumnail({
  registrationInfo,
}: Pick<
  Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>,
  "registrationInfo"
>) {
  const imgList = [
    ...(registrationInfo?.fileList || []),
    ...(registrationInfo?.vrcList || []),
  ];

  return (
    <div css={leftContent}>
      {imgList?.length ? (
        <Carousel>
          {imgList?.map((file) => {
            return (
              <div key={file} style={{ height: "50%" }}>
                <img
                  src={file}
                  alt="qwe"
                  style={{ height: "60%", width: "60%" }}
                />
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div className="no-img">
          <h2>사진을 올려 주세요.</h2>
        </div>
      )}
    </div>
  );
}

export default Thumnail;
