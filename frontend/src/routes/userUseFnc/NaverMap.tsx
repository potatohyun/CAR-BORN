/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";

import { useState } from "react";
import hand from "../../assets/hand.png";
import CurrentLocationBtn from "../../components/NaverMap/CurrentLocationBtn";
import ReserveForm from "../../components/NaverMap/ReserveForm";
import SearchBar from "../../components/NaverMap/SearchBar";
import { useAPI } from "../../hooks/useAPI";
import SearchForm from "./../../components/NaverMap/SearchForm";
import { useQuery } from "react-query";

const container = css`
  display: flex;
`;

const searchBar = css`
  background-color: white;
  width: 27vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const searchResult = css`
  background-color: #ffffff;
  width: 83%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const 좌표 = [
  {
    lat: 37.565525,
    lng: 126.976915,
  },
  {
    lat: 37.563551,
    lng: 126.976926,
  },
  {
    lat: 37.565636,
    lng: 126.977328,
  },
  {
    lat: 37.565364,
    lng: 126.977339,
  },
  {
    lat: 37.565564,
    lng: 126.977339,
  },
];
const naver = window.naver;
const API = `https://jsonplaceholder.typicode.com/todos/1`;

// 현재 지도에 마커 정보가 없을 때 나타나는 컴포넌트
const NoContentComponent = () => {
  return (
    <div
      style={{
        transform: "translate(20%,50vh)",
        height: "20%",
        width: "80%",
        fontSize: "1.5rem",
        fontWeight: "bolder",
      }}
    >
      주변에 정보가 없어요.
    </div>
  );
};

// geolocation 옵션
const options = {
  enableHighAccuracy: true,
};

var markers: any[] = [],
  infoWindows: any[] = [];

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchMarkers, setSearchMarkers] = useState<any[]>([]);
  const [searchInfoWindows, setSearchInfoWindows] = useState<any[]>([]);
  const [mapObject, setMapObject] = useState<any>(null);
  const [reserve, setReserve] = useState<boolean>(false);

  const getUserCarInfo = useAPI("get", API);
  const { data } = useQuery("get-user-car-info", () => getUserCarInfo, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 600,
    select: (data) => {
      return data.data;
    },
  });

  /**
   * 현재 위치를 받는 함수
   */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        drawingMap(lat, lng);
      },
      null,
      options
    );
  };

  /**
   * 지도를 그리는 함수
   */
  const drawingMap = (lat: number, lng: number) => {
    // const center = new naver.maps.LatLng(lat, lng);
    const center = new naver.maps.LatLng(37.565525, 126.976915);

    // 네이버 맵 생성
    const mapDiv = mapRef.current;
    const map = new naver.maps.Map(mapDiv, {
      center,
      zoom: 17,
    });
    setMapObject(map);
    setSearchMarkers((mark) => {
      return [];
    });
    setSearchInfoWindows((info) => {
      return [];
    });

    setMarker(map);
  };

  /**
   * 마커 생성 함수
   */
  const setMarker = (map: any) => {
    좌표.forEach((key: any) => {
      var position = new naver.maps.LatLng(key.lat, key.lng);
      var marker = new naver.maps.Marker({
        map: map,
        position,
        icon: {
          url: hand,
          size: new naver.maps.Size(50, 52),
          scaledSize: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
        zIndex: 100,
      });

      var infoWindow = new naver.maps.InfoWindow({
        content: [
          '<div style="width:28vw; padding:10px; height: 28vh; margin-left:2.5vw;">',
          '<p style="font-size: 1.5rem; margin-bottom: 0; margin-top: 0; font-weight: bolder;">정비소</p>',
          '<p style="margin-top: 0; color: #E00000; font-weight: bolder;">',
          "3.9<span>★★★★☆</span>",
          '<span style="color: #BBBBBB; font-size: 0.9rem; "> 리뷰 15</span>',
          "</p>",
          '<p style="margin-bottom: 0; color: #606060; font-size: 0.9rem">경북 구미시 구미중앙로 76</p>',
          '<p style="margin: 0; color: #C1C1C1; font-size: 0.9rem">(우) 39301 (지번) 원평동 1008-1</p>',
          '<p style="margin-top: 0; color: #038400; font-size: 1rem; font-weight: bold;">1234-5678</p>',
          `<button class="fix-shop" style="background-color: red; width: 90%; height: 22%; border-radius: 10px; border: 0; font-size: 1.1rem; font-weight: bolder; color: white; cursor: pointer;">예약하기</button>`,
          "</div>",
        ].join(""),
      });

      // 예약하기 버튼 클릭
      const button = infoWindow.getContentElement().childNodes[5];
      button.addEventListener("click", () => {
        setReserve((reserve) => !reserve);
      });

      markers.push(marker);
      infoWindows.push(infoWindow);
      setSearchMarkers((mark) => {
        return [...mark, marker];
      });
      setSearchInfoWindows((info) => {
        return [...info, infoWindow];
      });
    });

    naver.maps.Event.addListener(map, "idle", function () {
      updateMarkers(map, markers);
    });

    function updateMarkers(map: any, markers: any) {
      var mapBounds = map.getBounds();
      var marker: any, position, infoWindow;
      let newMarker: any[] = [];

      for (var i = 0; i < markers.length; i++) {
        marker = markers[i];
        position = marker.getPosition();
        infoWindow = infoWindows[i];

        if (mapBounds.hasLatLng(position)) {
          showMarker(map, marker);
        } else {
          hideMarker(map, marker);
          infoWindow.close();
          setReserve(false);
        }

        if (marker.map) {
          newMarker[newMarker.length] = marker;
        }
        setSearchMarkers(newMarker);
      }
    }

    function showMarker(map: any, marker: any) {
      if (marker.getMap()) return;
      marker.setMap(map);
    }

    function hideMarker(map: any, marker: any) {
      if (!marker.getMap()) return;
      marker.setMap(null);
    }

    function getClickHandler(seq: number) {
      return function () {
        var marker = markers[seq],
          infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
          setReserve(false);
        } else {
          infoWindow.open(map, marker);
          setReserve(false);
        }
      };
    }

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 검색창 검수원, 정비소 왼쪽 박스에서 클릭시 실행
  const searchBarItemClick = (index: number) => {
    if (searchInfoWindows.length && searchMarkers.length) {
      if (searchInfoWindows[index].getMap()) {
        searchInfoWindows[index].close();
      } else {
        searchInfoWindows[index].open(mapObject, searchMarkers[index]);
      }
    }
  };

  return (
    <>
      <div css={container}>
        <div css={searchBar}>
          <div style={{ height: "15%" }}>
            {/* 검색창 */}
            {!reserve ? <SearchForm /> : null}
          </div>
          <div css={searchResult}>
            {/* 검색 결과 */}
            {searchMarkers.length ? (
              reserve ? (
                <ReserveForm data={data} />
              ) : (
                searchMarkers.map((item, index) => {
                  return (
                    <SearchBar
                      key={index}
                      index={index}
                      searchBarItemClick={searchBarItemClick}
                    />
                  );
                })
              )
            ) : (
              <NoContentComponent />
            )}
          </div>
        </div>
        <CurrentLocationBtn
          mapRef={mapRef}
          getCurrentLocation={getCurrentLocation}
        />
      </div>
    </>
  );
}
export default NaverMap;
