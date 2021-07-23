package com.willchair.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.willchair.Mapper.NoticeMapper;
import com.willchair.Service.NoticeService;
import com.willchair.Vo.NoticeVo;
import com.willchair.Util.Util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl implements NoticeService{
    
    @Autowired
    NoticeMapper noticeMapper;

    @Override
    public int getTotalNotice() {
        return noticeMapper.getTotalNotice();
    }

    @Override
    public int getTotalActive() {
        return noticeMapper.getTotalActive();
    }

    @Override
    public int getTotalActiveN() {
        return noticeMapper.getTotalActiveN();
    }

    @Override
    public List<NoticeVo> getNoticeList(HashMap<String,Object> params) {
        if(params.get("inq") != null)
        params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
        
        return noticeMapper.getNoticeList(params);
    }
    
    @Override
    public void saveNewNotice(NoticeVo vo) {
      
        noticeMapper.saveNewNotice(vo);
    }
    
    @Override
    public void deleteNotice( HashMap<String,String> params) {
        noticeMapper.deleteNotice(params);
    }
    
    @Override
    public void updateNotice(HashMap<String,String> params) {
        noticeMapper.updateNotice(params);
    }
}
