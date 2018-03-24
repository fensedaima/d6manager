package com.jy.service.dsix.speedabout;

import java.util.List;

import com.jy.entity.dsix.speedabout.Speedabout;
import com.jy.service.base.BaseService;


public interface SpeedaboutService extends BaseService<Speedabout>{
	
	
    public int insertSpeedabout(Speedabout account) throws Exception;
    
	public void deleteSpeedabout(Speedabout o) ;
	
	public List<Speedabout> findauto();
}
