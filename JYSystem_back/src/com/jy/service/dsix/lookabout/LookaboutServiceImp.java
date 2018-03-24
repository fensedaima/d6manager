package com.jy.service.dsix.lookabout;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jy.entity.dsix.lookabout.Lookabout;
import com.jy.repository.dsix.lookabout.LookaboutDAO;
import com.jy.service.base.BaseServiceImp;



@Service("LookaboutService")
public class LookaboutServiceImp extends BaseServiceImp<Lookabout> implements LookaboutService {
	@Autowired
	private LookaboutDAO squareDAO;
	
	@Override
	public int insertLookabout(Lookabout o) throws Exception {
		int res=1;
		o.setCreateTime(String.valueOf(new Date().getTime()));
	    squareDAO.insert(o);	
		return res;
	}
	
	@Override
	@Transactional
	public void deleteLookabout(Lookabout o) {
		//事务删除
		squareDAO.delete(o);
	}
}
