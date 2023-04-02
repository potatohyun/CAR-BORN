import { DataType } from "./SaleInfoArea";

function SaleManufacturingCompany({ data }: DataType) {
  return (
    <div>
      <span>제조사 / 차량모델</span>
      <div>
        <input
          type="text"
          disabled={true}
          value={`${data.maker} / ${data.modelNm}`}
        />
      </div>
    </div>
  );
}

export default SaleManufacturingCompany;
