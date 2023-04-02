package site.carborn.service.common;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import site.carborn.util.common.HTTPUtils;
import site.carborn.util.common.URLUtils;
import site.carborn.util.network.Get;
import site.carborn.util.network.Header;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class AddressService {
    @Value("${naver.naver-cloud-map.X-NCP-APIGW-API-KEY-ID}")
    private String clientId;
    @Value("${naver.naver-cloud-map.X-NCP-APIGW-API-KEY}")
    private String clientSecret;

    public Map<String, Object> getGeoAddress(String address) {
        if (address == null || address.isBlank()) {
            throw new NullPointerException("변환할 주소 데이터를 입력해주세요");
        }

        try {
            JSONObject geoData = requestGeo(address);
            if (geoData == null) {
                throw new NullPointerException();
            }
            if ((int) ((JSONObject) geoData.get("meta")).get("totalCount") == 0) {
                throw new NullPointerException();
            }
            JSONObject document = (JSONObject) ((JSONArray) geoData.get("addresses")).get(0);
            Map<String, Object> map = new HashMap<>();
            map.put("lat", document.get("y"));
            map.put("lng", document.get("x"));

            return map;
        } catch (IOException e) {
            log.warn(e.getMessage());
        }

        throw new NullPointerException("위도 및 경도 정보를 확인할 수 없습니다");
    }

    public Map<String, Object> getReverseGeo(double lat, double lng) {
        try {
            JSONObject rGeoData = requestReverseGeo(lat, lng);
            if (rGeoData == null) {
                throw new NullPointerException();
            }

            Map<String, Object> map = new HashMap<>();
            JSONObject addr = (JSONObject)((JSONObject) ((JSONArray) rGeoData.get("results")).get(0)).get("region");
            map.put("addr1", ((JSONObject)addr.get("area1")).get("name"));
            map.put("addr2", ((JSONObject)addr.get("area2")).get("name"));

            addr = (JSONObject)((JSONObject) ((JSONArray) rGeoData.get("results")).get(0)).get("land");
            map.put("addr3", (addr.get("name")));
            map.put("number1", (addr.get("number1")));
            map.put("number2", (addr.get("number2")));

            return map;
        } catch (IOException e) {
            log.warn(e.getMessage());
        }

        throw new NullPointerException("주소 정보를 확인할 수 없습니다");
    }

    public Map<String, Object> getGeoAddressJibun(String address) {
        if (address == null || address.isBlank()) {
            throw new NullPointerException("변환할 주소 데이터를 입력해주세요");
        }

        try {
            JSONObject geoData = requestGeo(address);
            if (geoData == null) {
                throw new NullPointerException();
            }
            if ((int) ((JSONObject) geoData.get("meta")).get("totalCount") == 0) {
                throw new NullPointerException();
            }
            JSONObject document = (JSONObject) ((JSONArray) geoData.get("addresses")).get(0);
            Map<String, Object> map = new HashMap<>();
            map.put("roadAddress", document.get("roadAddress"));
            map.put("jibunAddress", document.get("jibunAddress"));
            int documentLen = ((JSONArray) ((JSONObject) ((JSONArray) geoData.get("addresses")).get(0)).get("addressElements")).length();
            document = ((JSONObject) ((JSONArray) ((JSONObject) ((JSONArray) geoData.get("addresses")).get(0)).get("addressElements")).get(documentLen-1));
            map.put("longName", document.get("longName"));
            return map;
        } catch (IOException e) {
            log.warn(e.getMessage());
        }

        throw new NullPointerException("위도 및 경도 정보를 확인할 수 없습니다");
    }

    public JSONObject requestGeo(String address) throws IOException {
        String url = String.format("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=%s", URLUtils.urlEncode(address));

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("X-NCP-APIGW-API-KEY-ID", clientId);
        header.append("X-NCP-APIGW-API-KEY", clientSecret);
        Get get = new Get(url, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new NullPointerException();
        }

        String content = get.get();
        return new JSONObject(content);
    }

    public JSONObject requestReverseGeo(double lat, double lng) throws IOException  {
        String coords = lng+","+lat;
        String url = String.format("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=%s&sourcecrs=epsg:4326&output=json&orders=roadaddr", URLUtils.urlEncode(coords));
        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("X-NCP-APIGW-API-KEY-ID", clientId);
        header.append("X-NCP-APIGW-API-KEY", clientSecret);

        Get get = new Get(url, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new NullPointerException("올바른 데이터 요청이 아닙니다");
        }

        String content = get.get();
        return new JSONObject(content);
    }
}
