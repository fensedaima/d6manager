package com.jy.repository.dsix.squareclasses;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.squareclasses.Square;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
@JYBatis
public interface SquareDAO   extends BaseDao<Square>{
    int deleteByPrimaryKey(Integer ids);

    void insert(Square record);

    int updateByPrimaryKey(Square record);
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesname(@Param("classesid") String classesid);
}