import { DataType } from "./SaleInfoArea";

function SaleCarYear({ data }: DataType) {
  return (
    <div>
      <span>연식</span>
      <div>
        <input value={`${data.modelYear}`} disabled={true} />
      </div>
    </div>
  );
}

export default SaleCarYear;
