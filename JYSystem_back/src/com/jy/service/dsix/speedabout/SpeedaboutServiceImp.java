package com.jy.service.dsix.speedabout;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jy.entity.dsix.speedabout.Speedabout;
import com.jy.repository.dsix.speedabout.SpeedaboutDAO;
import com.jy.service.base.BaseServiceImp;



@Service("SpeedaboutService")
public class SpeedaboutServiceImp extends BaseServiceImp<Speedabout> implements SpeedaboutService {
	@Autowired
	private SpeedaboutDAO squareDAO;
	
	@Override
	public int insertSpeedabout(Speedabout o) throws Exception {
		int res=0;
		o.setCreateTime(String.valueOf(new Date().getTime()));
		if(StringUtils.isNotBlank(o.getspeednumber())&&(squareDAO.findCountByLoginName(o.getspeednumber())==0)){
			squareDAO.insert(o);	
			res=1;
		}
		return res;
	}
	
	@Override
	@Transactional
	public void deleteSpeedabout(Speedabout o) {
		//事务删除
		squareDAO.delete(o);
	}
	
	@Override
	public List<Speedabout> findauto() {
		// TODO Auto-generated method stub
		return squareDAO.findauto();
	}
}
