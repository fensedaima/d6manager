package com.jy.repository.system.dict;

import java.util.List;

import com.jy.entity.system.dict.SysDict;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
/**
 * 系统字典数据层
 */
@JYBatis
public interface SysDictDao extends BaseDao<SysDict>{
	public List<SysDict> findauto(SysDict o);
	/**
	 * 统计数目
	 * @param o 对象      
	 * @return long
	 */
	public int countlookabout(SysDict o);
	/**
	 * 统计数目
	 * @param o 对象      
	 * @return long
	 */
	public int countaccount(SysDict o);
	/**
	 * 统计数目
	 * @param o 对象      
	 * @return long
	 */
	public int countselfabout(SysDict o);
	/**
	 * 统计数目
	 * @param o 对象      
	 * @return long
	 */
	public int countspeedabout(SysDict o);
}
