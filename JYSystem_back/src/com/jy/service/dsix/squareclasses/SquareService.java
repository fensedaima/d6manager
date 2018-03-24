package com.jy.service.dsix.squareclasses;

import com.jy.entity.dsix.squareclasses.Square;
import com.jy.service.base.BaseService;


public interface SquareService extends BaseService<Square>{
	
	
    public int insertSquare(Square account) throws Exception;
    
	public int deleteSquare(Square o) ;
}
