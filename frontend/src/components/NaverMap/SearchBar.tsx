import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";
import { usePhoneNum } from "../../hooks/usePhoneNum";

interface SearchBarType {
  index: number;
  item: any;
  searchBarItemClick: (index: number) => void;
}

function SearchBar({ index, item, searchBarItemClick }: SearchBarType) {
  const API = `https://carborn.site/api/address/convert-geo/jibun/${item.ADDRESS}`;
  const getJibunAddressAPI = useAPI("get", API);
  const hipenPhoneNum = usePhoneNum(item?.PHONE_NO);
  const { data } = useQuery(
    ["get-jibun-address", index],
    () => getJibunAddressAPI,
    {
      retry: false,
      cacheTime: 1000 * 300,
      staleTime: 1000 * 300,
      select: (data) => {
        return data.data.message;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const jibun = data?.jibunAddress.slice(" ");
  return (
    <div
      style={{
        marginBottom: "5vh",
        cursor: "pointer",
        backgroundColor: "white",
      }}
      onClick={() => searchBarItemClick(index)}
    >
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "0",
          fontWeight: "bolder",
        }}
      >
        {item?.NAME}
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#E00000",
          fontWeight: "bolder",
        }}
      >
        {item.avg_point === 0 ? item.avg_point : item.avg_point.toFixed(1)}
        <span>★</span>
        <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}>
          {" "}
          리뷰 {item?.cntReview}
        </span>
      </p>
      <p
        style={{
          marginBottom: "0",
          color: "#606060",
          fontSize: "0.9rem",
        }}
      >
        {item?.ADDRESS}
      </p>
      <p
        style={{
          margin: "0",
          color: "#C1C1C1",
          fontSize: "0.9rem",
        }}
      >
        (우) {data?.longName}
      </p>
      <p
        style={{
          margin: "0",
          color: "#C1C1C1",
          fontSize: "0.9rem",
        }}
      >
        (지번) {jibun}
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#038400",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {hipenPhoneNum}
      </p>
      <div
        style={{
          border: "0.8px solid #C1C1C1",
          opacity: "0.3",
          width: "100%",
        }}
      ></div>
    </div>
  );
}

export default SearchBar;
