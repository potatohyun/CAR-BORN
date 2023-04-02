/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Carousel } from "react-responsive-carousel";
import car from "../../../assets/car.png";

const leftContent = css`
  width: 40vw;
  height: 90vh;
  margin-right: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function SaleCarImg({ imgs }: { imgs: Array<string> }) {
  return (
    <div css={leftContent}>
      {imgs.length ? (
        <Carousel>
          {imgs?.map((IMG: string) => {
            return (
              <div>
                <img src={car} alt="qwe" />
                <p className="legend">Legend 1</p>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <Carousel>
          <div>
            <img src={car} alt="qwe" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={car} alt="qwe" />
            <p className="legend">Legend 1</p>
          </div>
        </Carousel>
      )}
    </div>
  );
}

export default SaleCarImg;
