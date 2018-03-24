package com.jy.service.system.dict;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.entity.system.dict.SysDict;
import com.jy.repository.system.dict.SysDictDao;
import com.jy.service.base.BaseServiceImp;
@Service("SysDictService")
public class SysDictServiceImp extends BaseServiceImp<SysDict> implements SysDictService {
	
	@Autowired
	private SysDictDao sysDictDao;
	
	@Override
	public List<SysDict> findauto(SysDict o) {
		// TODO Auto-generated method stub
		return sysDictDao.findauto(o);
	}

	@Override
	public int syscount(SysDict o) {
		// TODO Auto-generated method stub
		
		int countaccount=sysDictDao.countaccount(o);
		int countselfabout=sysDictDao.countselfabout(o);
		int countspeedabout=sysDictDao.countspeedabout(o);
		
		return countaccount+countselfabout+countspeedabout;
	}
}
