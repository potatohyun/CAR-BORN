import { useDispatch } from "react-redux";
import { setKeywordType } from "../../../modules/carListModule";

function RadioBtn() {
  const dispatch = useDispatch();
  const setKeywordTypeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const keywordType = e.target.value;

    dispatch(setKeywordType(keywordType));
  };

  return (
    <>
      <select onChange={setKeywordTypeValue}>
        <option value="">초기화</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </>
  );
}

export default RadioBtn;
