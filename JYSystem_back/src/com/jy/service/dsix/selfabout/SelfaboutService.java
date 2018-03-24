package com.jy.service.dsix.selfabout;

import com.jy.entity.dsix.selfabout.Selfabout;
import com.jy.service.base.BaseService;

public interface SelfaboutService extends BaseService<Selfabout> {
	
	public void OK(Integer id);
	public void NOT(Integer id);
}

