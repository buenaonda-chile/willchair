package com.willchair.Util;

import java.util.Date;

public class FUpUtil {
    public static String name(String name){
        String filename = "";
        String fpost = "";
        if(name.indexOf('.') >= 0) {
            fpost = name.substring(name.indexOf('.'));
            filename = new Date().getTime() + fpost;
        }else {
            filename = new Date().getTime() + ".back";
        }
        return filename;
    }
}
