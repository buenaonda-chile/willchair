package com.willchair.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.willchair.Service.UserService;
import com.willchair.Util.Encrypt;
import com.willchair.Vo.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;

    @RequestMapping(value = "/userinfo", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveUser(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalUser", userService.getTotalUser());
    	req.setAttribute("totalAdmin", userService.getTotalAdmin());
    	
        return "user";
    }
    
    @RequestMapping(value = "/getUserList")
    @ResponseBody
    public List<UserVo> getUserList(@RequestParam HashMap<String,Object> params){
    	
    	List<UserVo> staffList = userService.getUserList(params);
    	
    	return staffList;
    }
    
    /** 아이디 중복확인 */
    @RequestMapping(value = "/dupCheckId")
    @ResponseBody
    public String dupCheckId(@RequestParam HashMap<String,String> params){
            return userService.dupCheckId(params);
    }    
    
    /**직원 등록 */
    @RequestMapping(value = "/saveNewUser")
    public void saveNewStaff(HttpServletRequest req, HttpServletResponse res){
    	UserVo userInfo = new UserVo();
        HttpSession session = req.getSession();


        // salt + SHA512 암호화 적용
        String password = req.getParameter("password");
        String password_key = Encrypt.getSaltKey();
        password = Encrypt.setSHA512(password, password_key);

        userInfo.setUserId(req.getParameter("id"));
        userInfo.setUserPass(password);
        userInfo.setUserName(req.getParameter("name"));
        userInfo.setUserPnum(req.getParameter("telPhone"));
        userInfo.setUserEmail((req.getParameter("mail")));
        userInfo.setMemo(req.getParameter("memo"));
        userInfo.setPasswordKey(password_key);
       // staffInfo.setCretId(session.getAttribute("id").toString());
       userInfo.setCretId("testUser");
        try{
        	userService.saveNewUser(userInfo);
        }catch(Exception e){
            e.toString();
        }
    }
    
    /* 직원 삭제 */
    @RequestMapping(value = "/deleteUser")  
    @ResponseBody
    public void deleteUser(@RequestParam HashMap<String,String> params){
    	userService.deleteUser(params);
    }
    
    /* 직원 수정 */
    @RequestMapping(value = "/updateUser")
    @ResponseBody
    public void updateUser(@RequestParam HashMap<String,String> params){
    	userService.updateUser(params);
    }    
    
  
}
