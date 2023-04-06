/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Carousel } from "react-responsive-carousel";

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

const IMG_URL = process.env.REACT_APP_IMG_URL;

function SaleCarImg({ imgs }: { imgs: Array<any> }) {
  return (
    <div css={leftContent}>
      {imgs.length ? (
        <Carousel>
          {imgs?.map((IMG: { imgNm: string; regDt: string }, index: number) => {
            return (
              <div key={`${IMG}/${index}`}>
                <img
                  src={`https://carborn.site/images/${IMG.imgNm}`}
                  alt="img"
                />
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
