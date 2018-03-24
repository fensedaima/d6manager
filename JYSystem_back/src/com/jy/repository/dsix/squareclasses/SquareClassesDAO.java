package com.jy.repository.dsix.squareclasses;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.squareclasses.Squareclasses;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
@JYBatis
public interface SquareClassesDAO   extends BaseDao<Squareclasses>{
    int deleteByPrimaryKey(Integer ids);

    void insert(Squareclasses record);

    int updateByPrimaryKey(Squareclasses record);
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesname(@Param("classesname")String classesname);
    
    public List<Squareclasses> findauto();	
}