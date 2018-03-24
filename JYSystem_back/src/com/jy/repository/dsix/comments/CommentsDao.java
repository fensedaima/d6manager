package com.jy.repository.dsix.comments;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.comments.Comments;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;

@JYBatis
public interface CommentsDao extends BaseDao<Comments> {

	public void editIsShow(@Param("ids")Integer ids);
	public void editShow(@Param("ids")Integer ids);
	 /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesname(@Param("newsId") String newsId);
}
