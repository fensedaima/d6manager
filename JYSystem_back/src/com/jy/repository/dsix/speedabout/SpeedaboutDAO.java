package com.jy.repository.dsix.speedabout;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.speedabout.Speedabout;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
@JYBatis
public interface SpeedaboutDAO   extends BaseDao<Speedabout>{
    int deleteByPrimaryKey(Integer ids);

    void insert(Speedabout record);

    int updateByPrimaryKey(Speedabout record);
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesname(@Param("classesname")String classesname);
    
    
    public List<Speedabout> findauto();
    
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByLoginName(@Param("speednumber") String speednumber);
}