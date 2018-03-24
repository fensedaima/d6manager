package com.jy.repository.dsix.wxkf;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.wxkf.Wxkf;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
/**
 * 数据字典数据层
 */
@JYBatis
public interface WxkfDao extends BaseDao<Wxkf> {
	
	/**
	 * 查找客服信息
	 * @param keys 微信号 。日期
	 * 
	 * @return
	 */
	public List<Wxkf> findWxkf(@Param("kfName")String kfName,@Param("createTime")String createTime);
	
	/**
	 * 添加客服信息
	 * @param keys 
	 * 
	 * @return
	 */
	public void insert(Wxkf w);
	
	/**
	* 删除客服
	* @param kfId 数据字典Id
	*/
	public void deleteWxkf(@Param("KfId")String KfId);
	
}
