package com.jy.repository.dsix.userclasses;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.upuser.Userclasses;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
@JYBatis
public interface UserClassesDAO   extends BaseDao<Userclasses>{
    int deleteByPrimaryKey(Integer ids);

    void insert(Userclasses record);

    int updateByPrimaryKey(Userclasses record);
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesname(@Param("classesname")String classesname);
    
    public List<Userclasses> findauto(Userclasses o);	
}