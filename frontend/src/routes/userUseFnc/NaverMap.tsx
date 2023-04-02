/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";

import hand from "../../assets/hand.png";
import gumsu from "../../assets/gumsu.png";
import CurrentLocationBtn from "../../components/NaverMap/CurrentLocationBtn";
import ReserveForm from "../../components/NaverMap/ReserveForm";
import SearchBar from "../../components/NaverMap/SearchBar";
import { useAPI } from "../../hooks/useAPI";
import SearchForm from "./../../components/NaverMap/SearchForm";
import { useQuery } from "react-query";
import MarkerDetail from "../../components/NaverMap/MarkerDetail";
import axios from "axios";

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

const naver = window.naver;
const API_USER_INFO = `https://jsonplaceholder.typicode.com/todos/1`;

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchMarkers, setSearchMarkers] = useState<any[]>([]);
  const [searchInfoWindows, setSearchInfoWindows] = useState<any[]>([]);
  const [mapObject, setMapObject] = useState<any>(null);
  const [reserve, setReserve] = useState<boolean>(false);
  const [markerNum, setMarkerNum] = useState<number>(-1);
  const [markerArr, setMarkerArr] = useState<any[]>([]);

  const getUserCarInfo = useAPI("get", API_USER_INFO);

  const { data } = useQuery("get-user-car-info", () => getUserCarInfo, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    refetchOnMount: false,
    retry: false,
    keepPreviousData: true,
  });
  /**
   * 현재 위치를 받는 함수
   */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        axios({
          method: "get",
          url: `https://carborn.site/api/user/map/list/${lat}/${lng}`,
        })
          .then((res) => res.data)
          .then((data) => {
            const markerInfo = data.message;
            drawingMap(lat, lng, markerInfo);
          });
      },
      null,
      options
    );
  };

  /**
   * 지도를 그리는 함수
   */
  const drawingMap = (lat: number, lng: number, markerInfo: any) => {
    const center = new naver.maps.LatLng(lat, lng);

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

    setMarker(map, markerInfo);
  };

  /**
   * 마커 생성 함수
   */
  const setMarker = (map: any, markerInfo: any) => {
    setMarkerArr(markerInfo);
    let newMarkerArr: any[] = markerInfo;
    console.log(markerInfo);
    markerInfo.forEach((key: any) => {
      var position = new naver.maps.LatLng(key.LAT, key.LNG);
      var marker = new naver.maps.Marker({
        map: map,
        position,
        icon: {
          url: key.AUTH === 2 ? gumsu : hand,
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
          `<p style="font-size: 1.5rem; margin-bottom: 0; margin-top: 0; font-weight: bolder;">${key.NAME}</p>`,
          '<p style="margin-top: 0; color: #E00000; font-weight: bolder;">',
          `<span style="font-size: 1.2rem">★</span><span style="color: #242424">${key.avg_point}</span><span style="color: #8F8F8F">/5</span>`,
          `<span style="color: #BBBBBB; font-size: 0.9rem; "> 리뷰 ${key.cntReview}</span>`,
          "</p>",
          `<p style="margin-bottom: 0; color: #606060; font-size: 0.9rem">${key.ADDRESS}</p>`,
          '<p style="margin: 0; color: #C1C1C1; font-size: 0.9rem">(우) 39301 (지번) 원평동 1008-1</p>',
          `<p style="margin-top: 0; color: #038400; font-size: 1rem; font-weight: bold;">${key.PHONE_NO}</p>`,
          `<button class="fix-shop" style="background-color: ${
            key.AUTH === 2 ? "#9C27B0" : "#2196F3"
          }; width: 90%; height: 22%; border-radius: 10px; border: 0; font-size: 1.1rem; font-weight: bolder; color: white; cursor: pointer;">예약하기</button>`,
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
      let updateMarker: any[] = [];
      let openInfoIndex: number = -1;

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
          setMarkerNum(-1);
        }

        if (marker.map) {
          newMarker[newMarker.length] = marker;
          updateMarker[updateMarker.length] = newMarkerArr[i];
        } else {
          newMarker[newMarker.length] = null;
          updateMarker[updateMarker.length] = null;
        }
        if (infoWindow._isAdded) {
          openInfoIndex = i;
        }
        setSearchMarkers(newMarker);
      }
      setMarkerArr(updateMarker);
      if (openInfoIndex !== -1) {
        setMarkerNum(openInfoIndex);
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
          setMarkerNum(-1);
        } else {
          infoWindow.open(map, marker);
          setReserve(false);
          setMarkerNum(seq);
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
        setMarkerNum(-1);
      } else {
        searchInfoWindows[index].open(mapObject, searchMarkers[index]);
        setMarkerNum(index);
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
            {searchMarkers.filter((item) => item === null).length !==
            searchMarkers.length ? (
              reserve ? (
                <ReserveForm
                  data={data}
                  setReserve={setReserve}
                  setMarkerNum={setMarkerNum}
                  searchInfoWindows={searchInfoWindows}
                  markerNum={markerNum}
                />
              ) : markerNum >= 0 ? (
                <MarkerDetail
                  searchInfoWindows={searchInfoWindows}
                  setReserve={setReserve}
                  setMarkerNum={setMarkerNum}
                  markerNum={markerNum}
                  markerArr={markerArr}
                />
              ) : (
                markerArr.map((item, index) => {
                  return item ? (
                    <SearchBar
                      key={item.ADDRESS + item.PHONE_NO + item.NAME}
                      index={index}
                      item={item}
                      searchBarItemClick={searchBarItemClick}
                    />
                  ) : null;
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
