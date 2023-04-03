import { DetailData } from "../VehiclePurchaseDetailType";

function CarDistance({ data }: DetailData) {
  return (
    <div>
      <p>주행 거리(km)</p>
      <input value={data.carMileage.toLocaleString("ko-KR")} disabled={true} />
    </div>
  );
}

export default CarDistance;
