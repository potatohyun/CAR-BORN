import { DataType } from "./SaleInfoArea";

function SaleDistanceDriven({ data }: DataType) {
  const mileage = data.mileage.toLocaleString("ko-KR");
  return (
    <div>
      <span>주행거리</span>
      <div>
        <input disabled={true} value={`${mileage}`} />
      </div>
    </div>
  );
}

export default SaleDistanceDriven;
