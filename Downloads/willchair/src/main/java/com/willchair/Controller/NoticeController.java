package com.willchair.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.willchair.Service.NoticeService;
import com.willchair.Vo.NoticeVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    
    @Autowired
    NoticeService noticeService;

    @RequestMapping(value = "/noticeInfo", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveLocation(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalNotice", noticeService.getTotalNotice());
        req.setAttribute("totalActive", noticeService.getTotalActive());
        req.setAttribute("totalActiveN", noticeService.getTotalActiveN());
    	
        return "notice";
    }

    /**공지 등록 */
    @RequestMapping(value = "/saveNewNotice")
    public void saveNewStaff(HttpServletRequest req, HttpServletResponse res){
        NoticeVo noticeInfo = new NoticeVo();
        //HttpSession session = req.getSession();

        noticeInfo.setTitle(req.getParameter("title"));
        noticeInfo.setContent(req.getParameter("content"));
        noticeInfo.setCretId("testUser");
        try{
            noticeService.saveNewNotice(noticeInfo);
        }catch(Exception e){
            e.toString();
        }
    }
    
    @RequestMapping(value = "/getNoticeList")
    @ResponseBody
    public List<NoticeVo> getLocationList(@RequestParam HashMap<String,Object> params){
    	
    	List<NoticeVo> noticeList = noticeService.getNoticeList(params);
    	
    	return noticeList;
    }

    @RequestMapping(value = "/updateNotice")
    @ResponseBody
    public void updateNotice(@RequestParam HashMap<String,String> params){
        noticeService.updateNotice(params);
    }    
}
