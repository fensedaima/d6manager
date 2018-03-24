package com.jy.entity.dsix.squareclasses;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("BaseSquareclasses")
public class Squareclasses extends BaseEntity {

	private static final long serialVersionUID = 1L;

	private String ids;

	private String classesname;

	private String updatetime;

	private String keyWord;

	private String coverurl;

	private String squareclassesorder;

	public String getSquareclassesorder() {
		return squareclassesorder;
	}

	public void setSquareclassesorder(String squareclassesorder) {
		this.squareclassesorder = squareclassesorder;
	}

	public String getCoverurl() {
		return coverurl;
	}

	public void setCoverurl(String coverurl) {
		this.coverurl = coverurl;
	}

	public String getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getClassesname() {
		return classesname;
	}

	public void setClassesname(String classesname) {
		this.classesname = classesname;
	}

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}
}