import { DetailData } from "../VehiclePurchaseDetailType";

function CarNumber({ data }: DetailData) {
  return (
    <div>
      <p>차량 번호</p>
      <input value={data.carRegNm} disabled={true} />
    </div>
  );
}

export default CarNumber;
