package com.jy.service.dsix.lookabout;

import com.jy.entity.dsix.lookabout.Lookabout;
import com.jy.service.base.BaseService;


public interface LookaboutService extends BaseService<Lookabout>{
	
	
    public int insertLookabout(Lookabout account) throws Exception;
    
	public void deleteLookabout(Lookabout o) ;
}
