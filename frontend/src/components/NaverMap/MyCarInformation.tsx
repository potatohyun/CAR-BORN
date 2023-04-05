import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Props } from "./ReserveForm";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";

interface CarType {
  id: number;
  maker: string;
  mileage: number;
  modelNm: string;
  modelYear: string;
  regNm: string;
}

const PAGE = 1;
const SIZE = 1;
const ObjString: any = localStorage.getItem("login-token");

const API = `https://carborn.site/api/user/car/list/${PAGE}/${SIZE}`;
function MyCarInformation({ data, setReserveInfo, reserveInfo }: Props) {
  const getUserCarListFnc = useAPI("get", API, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  });
  const { data: carList } = useQuery(
    "get-user-car-list-fnc",
    () => getUserCarListFnc,
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 300,
      staleTime: 1000 * 300,
      select: (data) => {
        return data.data.message.content;
      },
    }
  );

  const handleChange = (event: SelectChangeEvent) => {
    setReserveInfo((reserveInfo) => {
      const value = event.target.value;
      return { ...reserveInfo, carId: value };
    });
  };

  return (
    <>
      <div>
        <span style={{ fontSize: "0.85rem", marginLeft: "1%" }}>
          내 차 선택
        </span>
        <FormControl sx={{ width: "100%", margin: "4% 0 4% 0" }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={reserveInfo?.carId}
            onChange={handleChange}
            defaultValue="차를 선택해주세요."
          >
            {carList?.map((car: CarType) => {
              return (
                <MenuItem
                  key={car.id}
                  value={car.id}
                >{`${car.maker} / ${car.modelNm}`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default MyCarInformation;
