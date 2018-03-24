package com.jy.entity.dsix.imessage;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("Imessage")
public class Imessage extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int ids;
	private String title;
	private String content;
	private String userid;
	private String lookwhere;
	private String handlookwhere;
	private String classesid;
	private String createTime;
	private String beginTime;
	private String endTime;
	private String sex;

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getHandlookwhere() {
		return handlookwhere;
	}

	public void setHandlookwhere(String handlookwhere) {
		this.handlookwhere = handlookwhere;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getIds() {
		return ids;
	}

	public void setIds(int ids) {
		this.ids = ids;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getClassesid() {
		return classesid;
	}

	public void setClassesid(String classesid) {
		this.classesid = classesid;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
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

	public String getLookwhere() {
		return lookwhere;
	}

	public void setLookwhere(String lookwhere) {
		this.lookwhere = lookwhere;
	}

}
