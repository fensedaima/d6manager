package com.jy.service.dsix.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jy.entity.dsix.comments.Comments;
import com.jy.repository.dsix.comments.CommentsDao;
import com.jy.service.base.BaseServiceImp;

@Service("CommentsService")
public class CommentsServiceImp extends BaseServiceImp<Comments> implements CommentsService {
	
	@Autowired
	private CommentsDao commentsDao;
	
	@Override
	public void editIsShow(Integer ids) {
		commentsDao.editIsShow(ids);
	}

	@Override
	public void editShow(Integer ids) {
		commentsDao.editShow(ids);
	}


}
