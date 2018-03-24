package com.jy.entity.dsix.selfabout;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("BaseSelfabout")
public class Selfabout extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7287990668988571763L;

	private Integer ids;

	private String selfnumber;

	private String userid;

	private String isshow;

	private String selfpicurl;

	private String content;

	private String city;

	private String createTime;

	private String beginTime;
	private String endTime;
	
	private String loginName;
	
	private String name;
	
	private String lookwhere;
	
	private String handlookwhere;
	 
	public String getLookwhere() {
		return lookwhere;
	}

	public void setLookwhere(String lookwhere) {
		this.lookwhere = lookwhere;
	}

	public String getHandlookwhere() {
		return handlookwhere;
	}

	public void setHandlookwhere(String handlookwhere) {
		this.handlookwhere = handlookwhere;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public String getLoginName() {
		return loginName;
	}
	
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getIds() {
		return ids;
	}

	public void setIds(Integer ids) {
		this.ids = ids;
	}

	public String getSelfnumber() {
		return selfnumber;
	}

	public void setSelfnumber(String selfnumber) {
		this.selfnumber = selfnumber;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getIsshow() {
		return isshow;
	}

	public void setIsshow(String isshow) {
		this.isshow = isshow;
	}

	public String getSelfpicurl() {
		return selfpicurl;
	}
	
	public void setSelfpicurl(String selfpicurl) {
		this.selfpicurl = selfpicurl;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}