package com.jy.repository.dsix.selfabout;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.selfabout.Selfabout;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;

@JYBatis
public interface SelfaboutDao extends BaseDao<Selfabout> {

	public void OK(@Param("ids")Integer ids);
	public void NO(@Param("ids")Integer ids);
}
