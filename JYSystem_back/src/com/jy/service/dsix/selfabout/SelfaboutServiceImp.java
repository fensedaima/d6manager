package com.jy.service.dsix.selfabout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.entity.dsix.selfabout.Selfabout;
import com.jy.repository.dsix.comments.CommentsDao;
import com.jy.service.base.BaseServiceImp;

@Service("SelfaboutService")
public class SelfaboutServiceImp extends BaseServiceImp<Selfabout> implements SelfaboutService {
	
	@Autowired
	private CommentsDao commentsDao;
	
	@Override
	public void OK(Integer ids) {
		commentsDao.editIsShow(ids);
	}

	@Override
	public void NOT(Integer ids) {
		commentsDao.editShow(ids);
	}


}
