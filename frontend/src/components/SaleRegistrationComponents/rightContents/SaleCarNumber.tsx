import { DataType } from "./SaleInfoArea";

function SaleCarNumber({ data }: DataType) {
  return (
    <div>
      <span>차량 번호</span>
      <div>
        <input type="text" disabled={true} value={`${data.regNm}`} />
      </div>
    </div>
  );
}
export default SaleCarNumber;
