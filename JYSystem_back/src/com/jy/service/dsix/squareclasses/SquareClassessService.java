package com.jy.service.dsix.squareclasses;

import java.util.List;

import com.jy.entity.dsix.squareclasses.Squareclasses;
import com.jy.service.base.BaseService;


public interface SquareClassessService extends BaseService<Squareclasses>{
	
	
    public int insertSquareClassess(Squareclasses account) throws Exception;
    
	public int deleteSquareclasses(Squareclasses o) ;
	
	public List<Squareclasses> findauto();	
}
