package com.jy.repository.dsix.lookabout;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.lookabout.Lookabout;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
@JYBatis
public interface LookaboutDAO   extends BaseDao<Lookabout>{
    int deleteByPrimaryKey(Integer ids);

    void insert(Lookabout record);

    int updateByPrimaryKey(Lookabout record);
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesname(@Param("classesname")String classesname);
    
}