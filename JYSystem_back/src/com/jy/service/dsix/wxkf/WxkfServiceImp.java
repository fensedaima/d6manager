package com.jy.service.dsix.wxkf;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.entity.dsix.wxkf.Wxkf;
import com.jy.repository.dsix.wxkf.WxkfDao;
import com.jy.service.base.BaseServiceImp;

@Service("WxkfService")
public class WxkfServiceImp extends BaseServiceImp<Wxkf> implements WxkfService {

	@Autowired
	private WxkfDao wxkfDao;
	


	@Override
	public List<Wxkf> getWxkfList(String kfName, String createTime) {
		return wxkfDao.findWxkf(kfName, createTime);
	}

	@Override
	public int deleteWxkf(String KfId) {
		 int res=0;
		 wxkfDao.deleteWxkf(KfId);
		 res=1;
		 return res;

	}

}
