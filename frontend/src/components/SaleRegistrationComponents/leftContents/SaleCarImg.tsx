/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Carousel } from "react-responsive-carousel";
import car from "../../../assets/car.png";

const leftContent = css`
  width: 30vw;
  height: 50%;
  margin-right: 6vw;
  display: flex;
  align-items: center;
  .slider {
    display: flex;
    align-items: center;
    height: auto;
  }
  .carousel-root {
    height: 85%;
  }
  .carousel-slider {
    height: 100%;
    .slider-wrapper {
      height: 80vh;
      width: 30vw;
    }
  }
  .carousel {
    .thumbs-wrapper {
      margin: 0;
      padding: 0;
    }
  }
  .no-img {
    text-align: center;
    margin-top: 50%;
  }
  .thumbs {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function SaleCarImg({ imgs }: { imgs: Array<string> }) {
  return (
    <div css={leftContent}>
      {imgs.length ? (
        <Carousel>
          {imgs?.map((IMG: string) => {
            return (
              <div>
                <img src={IMG} alt="qwe" />
              </div>
            );
          })}
        </Carousel>
      ) : (
        <Carousel>
          <div>
            <img src="" alt="qwe" />
          </div>
          <div>
            <img src="" alt="qwe" />
          </div>
        </Carousel>
      )}
    </div>
  );
}

export default SaleCarImg;
