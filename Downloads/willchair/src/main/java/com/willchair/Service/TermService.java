package com.willchair.Service;

import java.util.HashMap;

public interface TermService {

    public String getTermService();

    public void saveTermService(HashMap<String,String> params);

    public String getTermLocate();

    public void saveTermLocate(HashMap<String,String> params);

    public String getTermPrivate();

    public void saveTermPrivate(HashMap<String,String> params);
}
