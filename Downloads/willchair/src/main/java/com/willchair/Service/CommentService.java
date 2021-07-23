package com.willchair.Service;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.CommentVo;

public interface CommentService {
    
    public int getTotalComment();

    public int getTotalCommentY();

    public int getTotalCommentN();

    public List<CommentVo> getCommentList(HashMap<String,Object> params);

    public void updateComment(HashMap<String,String> params);

}
