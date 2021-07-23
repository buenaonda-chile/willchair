package com.willchair.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.willchair.Service.StaffService;
import com.willchair.Util.Encrypt;
import com.willchair.Vo.StaffVo;
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
	StaffService staffService;

    @RequestMapping(value = "/staff", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStaff(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalStaff", staffService.getTotalStaff());
    	req.setAttribute("totalUser", staffService.getTotalUser());
        req.setAttribute("appVersion", staffService.getAppVersion());
    	
        return "user";
    }
    
    @RequestMapping(value = "/getStaffList")
    @ResponseBody
    public List<StaffVo> getStaffList(@RequestParam HashMap<String,Object> params){
    	
    	List<StaffVo> staffList = staffService.getStaffList(params);
    	
    	return staffList;
    }

    @RequestMapping(value = "/getUserList")
    @ResponseBody
    public List<UserVo> getUserList(@RequestParam HashMap<String,Object> params){
    	
    	List<UserVo> userList = staffService.getUserList(params);
    	
    	return userList;
    }
    
    /** 아이디 중복확인 */
    @RequestMapping(value = "/dupCheckId")
    @ResponseBody
    public String dupCheckId(@RequestParam HashMap<String,String> params){
            return staffService.dupCheckId(params);
    }    
    
    /**직원 등록 */
    @RequestMapping(value = "/saveNewStaff")
    public void saveNewStaff(HttpServletRequest req, HttpServletResponse res){
    	StaffVo staffInfo = new StaffVo();
        //HttpSession session = req.getSession();


        // salt + SHA512 암호화 적용
        String password = req.getParameter("password");
        String password_key = Encrypt.getSaltKey();
        password = Encrypt.setSHA512(password, password_key);

        staffInfo.setStaffId(req.getParameter("id"));
        staffInfo.setStaffPass(password);
        staffInfo.setStaffName(req.getParameter("name"));
        staffInfo.setStaffPnum(req.getParameter("telPhone"));
        staffInfo.setStaffEmail((req.getParameter("mail")));
        staffInfo.setMemo(req.getParameter("memo"));
        staffInfo.setPasswordKey(password_key);
       // staffInfo.setCretId(session.getAttribute("id").toString());
       staffInfo.setCretId("testUser");
        try{
        	staffService.saveNewStaff(staffInfo);
        }catch(Exception e){
            e.toString();
        }
    }

    /* 앱버전 수정 */
    @RequestMapping(value = "/updateVersion")  
    @ResponseBody
    public void updateVersion(@RequestParam HashMap<String,String> params){
    	staffService.updateVersion(params);
    }

    /* 회원 권한 수정 */
    @RequestMapping(value = "/saveAdminFlag")  
    @ResponseBody
    public void saveAdminFlag(@RequestParam HashMap<String,String> params){
    	staffService.saveAdminFlag(params);
        System.out.println("박준호:" + params);
    }
    
    /* 직원 삭제 */
    @RequestMapping(value = "/deleteStaff")  
    @ResponseBody
    public void deleteStaff(@RequestParam HashMap<String,String> params){
    	staffService.deleteStaff(params);
    }
    
    /* 직원 수정 */
    @RequestMapping(value = "/updateStaff")
    @ResponseBody
    public void updateStaff(@RequestParam HashMap<String,String> params){
    	staffService.updateStaff(params);
    }    
    
  
}
