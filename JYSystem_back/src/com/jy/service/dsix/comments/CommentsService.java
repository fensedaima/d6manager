package com.jy.service.dsix.comments;

import com.jy.entity.dsix.comments.Comments;
import com.jy.service.base.BaseService;

public interface CommentsService extends BaseService<Comments> {
	
	public void editIsShow(Integer id);
	public void editShow(Integer id);
}

