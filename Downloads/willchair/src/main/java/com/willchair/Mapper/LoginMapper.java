package com.willchair.Mapper;

import com.willchair.Vo.UserVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    public UserVo getPassword(UserVo vo);
    public void updateLoginTime(UserVo vo);
}
