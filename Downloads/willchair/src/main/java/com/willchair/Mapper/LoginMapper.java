package com.willchair.Mapper;

import com.willchair.Vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    public StaffVo getPassword(StaffVo vo);
    public void updateLoginTime(StaffVo vo);
}
