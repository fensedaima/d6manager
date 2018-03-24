package com.jy.service.dsix.squareclasses;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jy.entity.dsix.squareclasses.Square;
import com.jy.repository.dsix.comments.CommentsDao;
import com.jy.repository.dsix.squareclasses.SquareDAO;
import com.jy.service.base.BaseServiceImp;



@Service("SquareService")
public class SquareServiceImp extends BaseServiceImp<Square> implements SquareService {
	@Autowired
	private SquareDAO squareDAO;
	@Autowired
	private CommentsDao commentsDao;
	
	@Override
	public int insertSquare(Square o) throws Exception {
		int res=0;
		o.setUpdatetime(String.valueOf(new Date().getTime()));
		//查询数据库是否已经存在用户名
		if(StringUtils.isNotBlank(o.getTitle())){
			squareDAO.insert(o);	
			res=1;
		}
		return res;
	}
	
	@Override
	@Transactional
	public int deleteSquare(Square o) {
		int res=0;
		//事务删除
		if(commentsDao.findCountByClassesname(o.getIds())==0){
			squareDAO.delete(o);
			res =1;
		}
		return res;
	}
}
