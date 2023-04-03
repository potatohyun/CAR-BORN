import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import RadioBtn from "./RadioBtn";
import { setKeyword } from "../../../modules/carListModule";

function SearchBar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const setKeywordValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const keyword = e.target.value.split(" ").join("");

    dispatch(setKeyword(keyword));
  };

  const getSearchData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queryClient.fetchQuery("infinity-scroll");
  };

  return (
    <div>
      <span>검색</span>
      <hr
        style={{
          width: "20%",
          marginLeft: "2%",
          background: "red",
          height: "1px",
        }}
      />
      <RadioBtn />
      <form onSubmit={getSearchData}>
        <input
          onChange={setKeywordValue}
          type="text"
          style={{ width: "80%" }}
          placeholder="Search for..."
        />
        <button>검색</button>
      </form>
    </div>
  );
}
export default SearchBar;
