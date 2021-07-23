package com.willchair.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.willchair.Service.FileService;
import com.willchair.Service.PushService;

@Controller
public class MobileController {

    @Autowired
    Environment environment;

    @Autowired
    FileService fileService;

    @Autowired
    PushService pushService;

    @RequestMapping(value = "/uploadFile")
    @ResponseBody
    public String uploadFile( MultipartFile file , @RequestParam HashMap<String,String> params) throws Exception{
        return fileService.uploadFile(file, params);
    }

    @RequestMapping(value = "/deleteFile")
    @ResponseBody
    public String deleteFile(@RequestParam HashMap<String,String> params) throws Exception{
        return fileService.deleteFile(params);
    }

    // 주소 반환
    @ResponseBody
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/coordsToAddr", method = RequestMethod.GET, produces="application/json;charset=UTF-8")
    public String coordsToAddr(HttpServletRequest request) throws Exception{
       
       String latitude = (String) request.getParameter("la"); //위도 37.36258943634862
       String longitude = (String) request.getParameter("lo"); //경도 127.10448857547912
       
       String clientId = "ktp8hsg080";//애플리케이션 클라이언트 아이디값";
         String clientSecret = "01EyDJAzejiohgXxxaFv2MQKWqEDZGJUBBCByvif";//애플리케이션 클라이언트 시크릿값
         try {
             String coords = longitude+","+latitude;
             System.out.println(coords);
             String sourcecrs = "epsg:4326";
             String orders = "legalcode";
             String output = "json";
             String apiURL = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords="+coords+"&sourcecrs="+sourcecrs+"&orders="+orders+"&output="+output;
             
             /*
              - legalcode: 좌표 to 법정동
           - admcode: 좌표 to 행정동
           - addr: 좌표 to 지번 주소
           - roadaddr: 좌표 to 도로명 주소(새주소)
              * */
             
             URL url = new URL(apiURL);
             HttpURLConnection con = (HttpURLConnection)url.openConnection();
             con.setDoOutput(false);
             con.setRequestMethod("GET");
             con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId); 
             con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
             
          
          int responseCode = con.getResponseCode();
             BufferedReader br;
             String inputLine;
             StringBuffer response = new StringBuffer();
          
             if(responseCode==200) { // 정상 호출
                 br = new BufferedReader(new InputStreamReader(con.getInputStream()));
                 
                 while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
                System.out.println(response.toString());
                
                //json 파싱 
                JSONParser jsonParse = new JSONParser();
                JSONObject jsonObj = (JSONObject) jsonParse.parse(response.toString());
                
                JSONObject regionObj = (JSONObject) ((JSONObject) ((JSONArray) jsonObj.get("results")).get(0)).get("region");
                String area1 = (String) ((JSONObject)regionObj.get("area1")).get("name").toString();
                String area2 = (String) ((JSONObject)regionObj.get("area2")).get("name").toString();
                String area3 = (String) ((JSONObject)regionObj.get("area3")).get("name").toString();
                
                JSONObject returnObj = new JSONObject();
                returnObj.put("area1", area1);
                returnObj.put("area2", area2);
                returnObj.put("area3", area3);
                returnObj.put("area4", area1+" "+area2);
                returnObj.put("area5", area1+" "+area2+" "+area3);
                
                System.out.println(returnObj.toString());

                return returnObj.toString();
                 
             } else {  // 오류 발생
                 br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                 
                 while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
                System.out.println(response.toString());
                
                return response.toString();
             }
           
          
         } catch (Exception e) {
             System.out.println(e);
             return e.toString();
         }
     
    }
    @RequestMapping(value="/send")
    @ResponseBody
    public String sendPush(@RequestParam HashMap<String,String> params ) throws Exception {

        String userToken = pushService.getUserToken(params); // DB에서 사용자 토큰 가져오기
        String result ="fail";
        if(userToken.length() > 0){ // 토큰이 존재하는 경우에만 처리
                params.put("userToken",pushService.getUserToken(params)); // 사용자 토큰 추가 
                params.put("firebaseKeyPath",environment.getProperty("firebase.path.key")); // key파일 path 가져오기
                result = pushService.sendPush(params);
        }
        return result;
    }
}