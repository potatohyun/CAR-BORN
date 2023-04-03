import { DetailData } from "../VehiclePurchaseDetailType";

function CarContent({ data }: DetailData) {
  return (
    <div>
      <p>판매 내용</p>
      <textarea value={data.content} disabled={true} />
    </div>
  );
}
export default CarContent;
