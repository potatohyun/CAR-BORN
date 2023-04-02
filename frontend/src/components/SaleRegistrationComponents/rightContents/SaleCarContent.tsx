import { SaleInfoContentsType, SaleInfoType } from "./SaleInfoArea";

function SaleCarContent({
  setSaleInfo,
}: Pick<SaleInfoContentsType, "setSaleInfo">) {
  const getTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    setSaleInfo((saleInfo: SaleInfoType) => {
      return { ...saleInfo, content: inputValue };
    });
  };
  return (
    <>
      <span>판매내용</span>
      <div>
        <textarea onBlur={getTyping}></textarea>
      </div>
    </>
  );
}

export default SaleCarContent;
