package com.jy.service.dsix.squareclasses;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jy.entity.dsix.squareclasses.Squareclasses;
import com.jy.repository.dsix.squareclasses.SquareClassesDAO;
import com.jy.repository.dsix.squareclasses.SquareDAO;
import com.jy.service.base.BaseServiceImp;



@Service("SquareClassessService")
public class SquareClassesServiceImp extends BaseServiceImp<Squareclasses> implements SquareClassessService {
	@Autowired
	private SquareClassesDAO squareClassesDAO;
	
	@Autowired
	private SquareDAO squareDAO;
	
	@Override
	public int insertSquareClassess(Squareclasses o) throws Exception {
		int res=0;
		String classesname=o.getClassesname();
		o.setUpdatetime(String.valueOf(new Date().getTime()));
		if(StringUtils.isNotBlank(classesname)&&(squareClassesDAO.findCountByClassesname(classesname)==0)){
			squareClassesDAO.insert(o);	
			res=1;
		}
		return res;
	}
	
	@Override
	@Transactional
	public int deleteSquareclasses(Squareclasses o) {
		int res=0;
		//事务删除
		if(squareDAO.findCountByClassesname(o.getIds())==0){
			squareClassesDAO.delete(o);
			res =1;
		}
		return res;
	}

	@Override
	public List<Squareclasses> findauto() {
		// TODO Auto-generated method stub
		return squareClassesDAO.findauto();
	}
}
