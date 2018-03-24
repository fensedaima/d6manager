package com.jy.entity.system.dict;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("SysDict")
public class SysDict extends BaseEntity {

	private static final long serialVersionUID = 1L;

	private String id;
	private String paramKey;
	private String paramName;
	private String oldparamName;
	private String description;
	private Integer isValid;
	private Date createTime;
	private Date updateTime;
	private Integer lookorder;

	public void setLookorder(Integer lookorder) {
		this.lookorder = lookorder;
	}

	public Integer getLookorder() {
		return lookorder;
	}

	public String getOldparamName() {
		return oldparamName;
	}

	public void setOldparamName(String oldparamName) {
		this.oldparamName = oldparamName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParamKey() {
		return paramKey;
	}

	public void setParamKey(String paramKey) {
		this.paramKey = paramKey;
	}

	public String getParamName() {
		return paramName;
	}

	public void setParamName(String paramName) {
		this.paramName = paramName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getIsValid() {
		return isValid;
	}

	public void setIsValid(Integer isValid) {
		this.isValid = isValid;
	}
}
