package com.jy.service.dsix.userclasses;

import java.util.List;

import com.jy.entity.dsix.upuser.Userclasses;
import com.jy.service.base.BaseService;


public interface UserClassessService extends BaseService<Userclasses>{
	
	
    public int insertUserClassess(Userclasses account) throws Exception;
    
	public int deleteUserclasses(Userclasses o) ;
	
	public List<Userclasses> findauto(Userclasses o);	
}
