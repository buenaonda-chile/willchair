package com.willchair.Mapper;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.NoticeVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeMapper {
    
    public int getTotalNotice();

    public int getTotalActive();

	public int getTotalActiveN();

    public List<NoticeVo> getNoticeList(HashMap<String,Object> params);

    public void saveNewNotice(NoticeVo vo);
	
	public void deleteNotice(HashMap<String,String>params);
	
	public void updateNotice(HashMap<String,String> params);
}
