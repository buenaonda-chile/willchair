package com.willchair.Service;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.NoticeVo;

public interface NoticeService {
    
    public int getTotalNotice();

    public int getTotalActive();

    public int getTotalActiveN();

    public List<NoticeVo> getNoticeList(HashMap<String,Object> params);
    
    public void saveNewNotice(NoticeVo vo);
    
    public void deleteNotice( HashMap<String,String> params);
    
    public void updateNotice(HashMap<String,String> params);

}
