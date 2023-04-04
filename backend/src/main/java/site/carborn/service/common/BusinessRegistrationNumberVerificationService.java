package site.carborn.service.common;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import site.carborn.util.common.HTTPUtils;
import site.carborn.util.common.URLUtils;
import site.carborn.util.network.Header;
import site.carborn.util.network.Post;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

@Service
public class BusinessRegistrationNumberVerificationService {

    @Value("${business-registration-number-verification.serviceKey}")
    private String serviceKey;

    public Map<String, Object> getVaildate(String number) {
        try {
            JSONObject vaildateData = requestVaildate(number);
            if (vaildateData == null) {
                throw new NullPointerException();
            }

            if ((int) vaildateData.get("request_cnt") == 0) {
                throw new NullPointerException();
            }

            JSONObject document = (JSONObject) ((JSONArray) vaildateData.get("data")).get(0);
            Map<String, Object> map = new HashMap<>();
            map.put("tax_type", document.get("tax_type"));

            return map;
        } catch (IOException e) {
            System.out.println(e);
        }

        throw new NullPointerException();
    }

    public JSONObject requestVaildate(String number) throws IOException {
        String url = String.format("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=%s", URLUtils.urlEncode(serviceKey));

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Content-Type", HTTPUtils.CONTENT_TYPE_JSON);
        header.append("Accept", "application/json");
        header.append("Data-Type", "JSON");
        header.append("Authorization", serviceKey);

        JSONObject requestBody = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        jsonArray.put(number);
        requestBody.put("b_no", jsonArray);

        Post post = new Post(url, header, requestBody);

        int responseCode = post.getHttpResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new NullPointerException();
        }

        String content = post.httpPost();
        return new JSONObject(content);
    }
}
