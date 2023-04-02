import { useMutation } from "react-query";
import { useAPI } from "./../../../hooks/useAPI";

const API = `https://jsonplaceholder.typicode.com/posts`;
const option = {
  data: {
    title: "foo",
    body: "bar",
    userId: 1,
  },
};

function PurchaseApplicationBtn() {
  const buyApply = useAPI("post", API, option);
  const { mutate, data } = useMutation(() => buyApply);

  console.log(data);

  const goToBuy = () => {
    mutate();
  };

  return (
    <>
      <button onClick={goToBuy}>구매신청</button>
    </>
  );
}

export default PurchaseApplicationBtn;
