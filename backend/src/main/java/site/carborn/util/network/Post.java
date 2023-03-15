package site.carborn.util.network;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

public class Post {
    HttpURLConnection conn;
    Charset charset = Charset.forName("UTF-8");

    public Post(String getUrl, Header header, RequestBody requestBody) throws IOException {
        URL url = new URL(getUrl);
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");

        setHeader(header);
        setRequestBody(requestBody);
    }

    public void setHeader(Header header) {
        List<String> keyList = header.getKeyList();
        for (String key: keyList) {
            conn.setRequestProperty(key, header.getValue(key));
        }
    }

    public void setRequestBody(RequestBody requestBody) throws IOException {
        Map<String, String> params = requestBody.getRequestBody();
        StringBuilder postData = new StringBuilder();

        for(Map.Entry<String, String> param: params.entrySet()) {
            if (postData.length() != 0) {
                postData.append("&");
            }
            postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
            postData.append("=");
            postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
        }
        byte[] postDataBytes = postData.toString().getBytes("UTF-8");

        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
        conn.setDoOutput(true);
        conn.getOutputStream().write(postDataBytes);
    }

    public int getResponseCode() throws IOException {
        return conn.getResponseCode();
    }

    public void setCharset(String charsetName) {
        charset = Charset.forName(charsetName);
    }

    public String post() {
        try(BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset))) {
            String inputLine;
            StringBuffer sb = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                sb.append(inputLine);
            }

            return sb.toString();
        } catch (Exception e) {
            System.out.println(e);
        }

        return null;
    }
}
