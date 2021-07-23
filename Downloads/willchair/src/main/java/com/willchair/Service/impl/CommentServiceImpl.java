package com.willchair.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.willchair.Mapper.CommentMapper;
import com.willchair.Service.CommentService;
import com.willchair.Vo.CommentVo;
import com.willchair.Util.Util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService{
    
    @Autowired
    CommentMapper commentMapper;

    @Override
    public int getTotalComment() {
        return commentMapper.getTotalComment();
    }

    @Override
    public int getTotalCommentY() {
        return commentMapper.getTotalCommentY();
    }

    @Override
    public int getTotalCommentN() {
        return commentMapper.getTotalCommentN();
    }

    @Override
    public List<CommentVo> getCommentList(HashMap<String,Object> params) {
        if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
        return commentMapper.getCommentList(params);
    }

    @Override
    public void updateComment(HashMap<String,String> params) {
        commentMapper.updateComment(params);
    }

}
