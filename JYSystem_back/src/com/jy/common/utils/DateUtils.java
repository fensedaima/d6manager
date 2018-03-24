package com.jy.common.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.time.DateFormatUtils;

/**
 * <li>日期工具类, 继承org.apache.commons.lang.time.DateUtils类</li>
 */
public class DateUtils extends org.apache.commons.lang3.time.DateUtils {
	
	
	/**
	 * <li>参数数组</li><br/>
	 * 0:yyyyMMdd<br/>1:yyyy-MM-dd<br/>2:yyyy-MM-dd HH:mm<br/>3:yyyy-MM-dd HH:mm:ss<br/>4:yyyy/MM/dd<br/>
	 * 5:yyyy/MM/dd HH:mm<br/>6:yyyy/MM/dd HH:mm:ss<br/>7:HH:mm:ss[时间]<br/>8:yyyy[年份]<br/>9:MM[月份]<br/>
	 * 10.dd[天]<br/>11.E[星期几]<br/>
	 */
	public static String[] parsePatterns = {"yyyyMMdd","yyyy-MM-dd","yyyy-MM-dd HH:mm","yyyy-MM-dd HH:mm:ss", 
		"yyyy/MM/dd","yyyy/MM/dd HH:mm","yyyy/MM/dd HH:mm:ss","HH:mm:ss","yyyy","MM","dd","E"};
	/**
	 * <li>得到当前日期字符串 格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"</li>
	 *  @param  pattern 可参考参数组parsePatterns
	 */
	public static String getDate(String pattern) {
		return DateFormatUtils.format(new Date(), pattern);
	}	
	/**
	 * <li>得到日期字符串 默认格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"</li>
	 * @param  date    日期类  
	 * @param  pattern 可参考参数组parsePatterns
	 */
	public static String formatDate(Date date, Object... pattern) {
		String formatDate = null;
		if (pattern != null && pattern.length > 0) {
			formatDate = DateFormatUtils.format(date, pattern[0].toString());
		} else {
			formatDate = DateFormatUtils.format(date,parsePatterns[1]);
		}
		return formatDate;
	}	
	/**
	 * <li>日期型字符串转化为日期 格式</li>
	 * { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" }
	 */
	public static Date parseDate(Object str) {
		if (str == null){
			return null;
		}
		try {
			return parseDate(str.toString(), parsePatterns);
		} catch (ParseException e) {
			return null;
		}
	}
	/**
	 * <li>获取过去的天数</li>
	 * @param date
	 * @return
	 */
	public static long pastDays(Date date) {
		long t = new Date().getTime()-date.getTime();
		return t/(24*60*60*1000);
	}
	/**
	 * <li>获取输入日期开始时间</li>
	 * @param date
	 * @return
	 */
	public static Date getDateStart(Date date) {
		if(date==null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date= sdf.parse(formatDate(date, "yyyy-MM-dd")+" 00:00:00");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	/**
	 * <li>获取输入日期结束时间</li>
	 * @param date
	 * @return
	 */
	public static Date getDateEnd(Date date) {
		if(date==null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date= sdf.parse(formatDate(date, "yyyy-MM-dd") +" 23:59:59");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	/**
	 * <li>按输入日期加分钟</li>
	 * @param date   日期
	 * @param recordPeriodMinute 分钟数
	 * @return
	 */
	public static Date addMinutes(Date recordTime, int recordPeriodMinute) {
		Calendar c = Calendar.getInstance();
		c.setTime(recordTime);
		c.add(Calendar.MINUTE, recordPeriodMinute);
		return c.getTime();
	}
	/**
	 * <li>按输入日期加毫秒</li>
	 * @param date   日期
	 * @param recordPeriodSecond 毫秒数
	 * @return
	 */
	public static Date addSeconds(Date recordTime, int recordPeriodSecond) {
		Calendar c = Calendar.getInstance();
		c.setTime(recordTime);
		c.add(Calendar.SECOND, recordPeriodSecond);
		return c.getTime();
	}
	/**
	 * <li>校验日期是否合法</li>
	 * @param date 日期
	 * @return
	 */
	public static boolean isValidDate(String date) {
		DateFormat fmt = new SimpleDateFormat(parsePatterns[1]);
		try {
			fmt.parse(date);
			return true;
		} catch (Exception e) {
			// 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
			return false;
		}
	}	
	  /**
     * <li>时间相减得到相差年数</li>
     * @param startTime 开始日期
     * @param endTime   结束日期
     * @return
     */
	public static int getDiffYear(String startTime,String endTime) {
		DateFormat fmt = new SimpleDateFormat(parsePatterns[1]);
		try {
			int years=(int) (((fmt.parse(endTime).getTime()-fmt.parse(startTime).getTime())/ (1000 * 60 * 60 * 24))/365);
			return years;
		} catch (Exception e) {
			e.printStackTrace();
			// 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
			return 0;
		}
	}
	  /**
     * <li>功能描述：时间相减得到天数</li>
     * @param startTime 开始日期
     * @param endTime   结束日期
     * @return
     */
    public static long getDaySub(String startTime,String endTime){
        long day=0;
        SimpleDateFormat format = new SimpleDateFormat(parsePatterns[1]);
        Date beginDate = null;
        Date endDate = null;   
            try {
				beginDate = format.parse(startTime);
				endDate= format.parse(endTime);
			} catch (ParseException e) {
				e.printStackTrace();
			}
            day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);   
        return day;
    }
    /**
     * <li>得到n天之后的日期</li>
     * @param days
     * @return
     */
    public static String getAfterDayDate(String days) {
    	int daysInt = Integer.parseInt(days); 	
        Calendar canlendar = Calendar.getInstance(); 
        canlendar.add(Calendar.DATE, daysInt); // 日期减 如果不够减会将月变动
        Date date = canlendar.getTime();
        SimpleDateFormat sdfd = new SimpleDateFormat((parsePatterns[3]));
        String dateStr = sdfd.format(date);     
        return dateStr;
    }
    
    /**
     * <li>得到n天之后是周几</li>
     * @param days
     * @return
     */
    public static String getAfterDayWeek(String days) {
    	int daysInt = Integer.parseInt(days);	
        Calendar canlendar = Calendar.getInstance(); 
        canlendar.add(Calendar.DATE, daysInt); // 日期减 如果不够减会将月变动
        Date date = canlendar.getTime();     
        SimpleDateFormat sdf = new SimpleDateFormat(parsePatterns[11]);
        String dateStr = sdf.format(date);
        return dateStr;
    }
    /**
	 * 把时间根据时、分、秒转换为时间段
	 * @param  Object  可选其1值{ "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" }
	 * @author String ？日前或？小时前或？分钟前？秒前
	 */
	public static String getTimes(Object str){
		String resultTimes = "";
		Date now;
		Date date=parseDate(str);
		now = new Date();
		long times = now.getTime() - date.getTime();
		long day = times / (24 * 60 * 60 * 1000);
		long hour = (times / (60 * 60 * 1000) - day * 24);
		long min = ((times / (60 * 1000)) - day * 24 * 60 - hour * 60);
		long sec = (times / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
		StringBuffer sb = new StringBuffer();
		if(day>0){
			sb.append(day + "日前");
		}else if (hour > 0) {
			sb.append(hour + "小时前");
		} else if (min > 0) {
			sb.append(min + "分钟前");
		} else if (sec >0){
			sb.append(sec + "秒前");
		}else if(times>=0){
			sb.append(times + "毫秒前");
		}else{
			sb.append("超前毫秒数:"+times);
		}
		resultTimes = sb.toString();
	    return resultTimes;
	}
		
    /** 
     * 将微信消息中的CreateTime转换成标准格式的时间Date
     * @param createTime 消息创建时间 
     * @return 
     */  
    public static Date formatTime(long createTime) {  
    	long msgCreateTime =createTime*1000L;  
        return new Date(msgCreateTime);  
    }
    
    /** 
     * 时间戳转换成日期格式字符串 
     * @param seconds 精确到秒的字符串 
     * @param formatStr 
     * @return 
     */  
    public static String timeStamp2Date(String seconds,String format) {  
        if(seconds == null || seconds.isEmpty() || seconds.equals("null")){  
            return "";  
        }  
        if(format == null || format.isEmpty()){
            format = "yyyy-MM-dd HH:mm:ss";
        }   
        SimpleDateFormat sdf = new SimpleDateFormat(format);  
        return sdf.format(new Date(Long.valueOf(seconds+"000")));  
    }  
    /** 
     * 日期格式字符串转换成时间戳 
     * @param date 字符串日期 
     * @param format 如：yyyy-MM-dd HH:mm:ss 
     * @return 
     */  
    public static String date2TimeStamp(String date_str,String format){  
        try {  
            SimpleDateFormat sdf = new SimpleDateFormat(format);  
            return String.valueOf(sdf.parse(date_str).getTime()/1000);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return "";  
    }  
      
    /** 
     * 取得当前时间戳（精确到秒） 
     * @return 
     */  
    public static String timeStamp(){  
        long time = System.currentTimeMillis();
        String t = String.valueOf(time/1000);  
        return t;  
    }  

    public static void main(String[] args) {  
//        String timeStamp = timeStamp();  
//        System.out.println("timeStamp="+timeStamp); //运行输出:timeStamp=1470278082
//        System.out.println(System.currentTimeMillis());//运行输出:1470278082980
//        //该方法的作用是返回当前的计算机时间，时间的表达格式为当前计算机时间和GMT时间(格林威治时间)1970年1月1号0时0分0秒所差的毫秒数
//        
//        String date = timeStamp2Date(timeStamp, "yyyy-MM-dd HH:mm:ss");  
//        System.out.println("date="+date);//运行输出:date=2016-08-04 10:34:42
//        
//        String timeStamp2 = date2TimeStamp(date, "yyyy-MM-dd HH:mm:ss");  
//        System.out.println(timeStamp2);  //运行输出:1470278082
//        
//        System.out.println(getTimes("2015-11-11"));
    	
    	System.out.println(new Date("2015-11-11").toGMTString());
    }  
	
//	public static void main(String[] args) {
//		System.out.println(getTimes("2015-11-11"));
//	}
}
