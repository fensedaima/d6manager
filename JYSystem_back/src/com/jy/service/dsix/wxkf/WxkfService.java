package com.jy.service.dsix.wxkf;

import java.util.List;

import com.jy.entity.dsix.wxkf.Wxkf;
import com.jy.service.base.BaseService;

public interface WxkfService extends BaseService<Wxkf> {

	
    /**
     * 获得客服列表
     * @return
     */
    public List<Wxkf> getWxkfList(String kfName,String createTime);
    
    /**
	* 删除客服Id
	*/
	public int deleteWxkf(String KfId);
}
