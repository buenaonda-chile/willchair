package com.willchair.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.willchair.Service.CommentService;
import com.willchair.Vo.CommentVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/comment")
public class CommentController {
    
    @Autowired
    CommentService commentService;

    @RequestMapping(value = "/commentinfo", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveComment(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalComment", commentService.getTotalComment());
        req.setAttribute("totalCommentY", commentService.getTotalCommentY());
    	req.setAttribute("totalCommentN", commentService.getTotalCommentN());

        return "comment";
    }
    
    @RequestMapping(value = "/getCommentList")
    @ResponseBody
    public List<CommentVo> getCommentList(@RequestParam HashMap<String,Object> params){
    	
    	List<CommentVo> commentList = commentService.getCommentList(params);
    	
    	return commentList;
    }

    @RequestMapping(value = "/updateComment")
    @ResponseBody
    public void updateComment(@RequestParam HashMap<String,String> params){
        commentService.updateComment(params);
    }
}
