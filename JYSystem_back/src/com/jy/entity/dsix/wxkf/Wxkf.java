package com.jy.entity.dsix.wxkf;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("Wxkf")
public class Wxkf extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer ids;
	private String kfName;
	private String kfPic;
	private String description;
	private String userid;
	private String createusername;
	private String status;
	private String createTime;
	private String updateTime;
	private String beginTime;
	private String endTime;
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getCreateusername() {
		return createusername;
	}
	public void setCreateusername(String createusername) {
		this.createusername = createusername;
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
	public Integer getIds() {
		return ids;
	}
	public void setIds(Integer ids) {
		this.ids = ids;
	}
	public String getKfName() {
		return kfName;
	}
	public void setKfName(String kfName) {
		this.kfName = kfName;
	}
	public String getKfPic() {
		return kfPic;
	}
	public void setKfPic(String kfPic) {
		this.kfPic = kfPic;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	
}
