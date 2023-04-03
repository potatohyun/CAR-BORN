import { DetailData } from "../VehiclePurchaseDetailType";

function CarModel({ data }: DetailData) {
  return (
    <div>
      <p>제조사 / 차량 모델</p>
      <input value={`${data.carMaker} / ${data.carModelNm}`} disabled={true} />
    </div>
  );
}

export default CarModel;
