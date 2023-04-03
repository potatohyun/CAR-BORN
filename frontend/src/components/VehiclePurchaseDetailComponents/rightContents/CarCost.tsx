import { DetailData } from "../VehiclePurchaseDetailType";

function CarCost({ data }: DetailData) {
  return (
    <div>
      <p>가격</p>
      <input
        value={`${data.price.toLocaleString("ko-KR")}원`}
        disabled={true}
      />
    </div>
  );
}

export default CarCost;
