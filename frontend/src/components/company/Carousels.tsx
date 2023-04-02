/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { Carousel } from "react-responsive-carousel";

interface PropType<T> {
  images: T;
}

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .imgBox > img {
    width: 80%;
    height: 100%;
    object-fit: fill;
  }

  .slider-wrapper,
  .slider {
    height: 100%;
  }
  .imgBox {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .test {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .carousel.carousel-slider {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default function Carousels<T>({ images }: PropType<T>) {
  const test = (images as []).filter((ele: string, idx: number) => {
    return ele;
  });
  return (
    <div css={container}>
      {test[0] ? (
        <Carousel className="test">
          {test.map((ele, idx) => (
            <div key={idx} className="imgBox">
              {<img src={ele} />}
            </div>
          ))}
        </Carousel>
      ) : (
        "사진을 업로드 해 주세요"
      )}
    </div>
  );
}
