package com.willchair.Mapper;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.CommentVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommentMapper {

    public int getTotalComment();

    public int getTotalCommentY();

    public int getTotalCommentN();

    public List<CommentVo> getCommentList(HashMap<String,Object> params);

    public void updateComment(HashMap<String,String> params);

}
