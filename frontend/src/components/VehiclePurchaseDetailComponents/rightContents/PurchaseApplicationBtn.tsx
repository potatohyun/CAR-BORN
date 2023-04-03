import axios from "axios";
import { useMutation } from "react-query";

function PurchaseApplicationBtn({ id }: { id?: string }) {
  const API = `https://carborn.site/api/user/car/buy/${id}`;

  const { mutate } = useMutation(
    () => {
      return axios({
        method: "post",
        url: API,
      });
    },
    {
      onError: (error: Error) => {
        console.error(error.message);
      },
    }
  );

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
