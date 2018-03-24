package com.jy.entity.dsix.upuser;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("BaseUserclasses")
public class Userclasses extends BaseEntity {

	private static final long serialVersionUID = 1L;

	private Integer ids;

	private String classesname;

	private String updatetime;

	private String keyWord;

	private String describes;

	private String flag;
	
	private String sex;
	
	private String talkcount;
	
	private String userclassesorder;
	
	public String getUserclassesorder() {
		return userclassesorder;
	}
	
	public void setUserclassesorder(String userclassesorder) {
		this.userclassesorder = userclassesorder;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getTalkcount() {
		return talkcount;
	}

	public void setTalkcount(String talkcount) {
		this.talkcount = talkcount;
	}

	public String getDescribes() {
		return describes;
	}

	public void setDescribes(String describes) {
		this.describes = describes;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public Integer getIds() {
		return ids;
	}

	public void setIds(Integer ids) {
		this.ids = ids;
	}

	public String getClassesname() {
		return classesname;
	}

	public void setClassesname(String classesname) {
		this.classesname = classesname;
	}

	public String getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}
}