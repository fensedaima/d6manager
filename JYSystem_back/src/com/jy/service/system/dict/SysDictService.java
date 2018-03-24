package com.jy.service.system.dict;

import java.util.List;

import com.jy.entity.system.dict.SysDict;
import com.jy.service.base.BaseService;

public interface SysDictService extends BaseService<SysDict>{
	public List<SysDict> findauto(SysDict o);
	
	/**
	 * 统计数目
	 * @param o 对象      
	 * @return long
	 */
	public int syscount(SysDict o);
}
