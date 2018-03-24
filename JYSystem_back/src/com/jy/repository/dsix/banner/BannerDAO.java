package com.jy.repository.dsix.banner;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jy.entity.dsix.banner.Banner;
import com.jy.entity.dsix.upuser.Userclasses;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;
@JYBatis
public interface BannerDAO   extends BaseDao<Banner>{
}