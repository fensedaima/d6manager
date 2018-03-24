package com.jy.controller.dsix.square;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jy.common.ajax.AjaxRes;
import com.jy.common.annotation.ControllerOptLog;
import com.jy.common.mybatis.Page;
import com.jy.common.utils.base.Const;
import com.jy.controller.base.BaseController;
import com.jy.entity.dsix.squareclasses.Square;
import com.jy.entity.dsix.squareclasses.Squareclasses;
import com.jy.service.dsix.squareclasses.SquareClassessService;
import com.jy.service.dsix.squareclasses.SquareService;

@Controller
@RequestMapping("/backstage/square/")
public class SquareController  extends BaseController<Square>{
	
	@Autowired
	private SquareService service;
	
	@Autowired
	private SquareClassessService squareClassessService;
	
	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/square/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Square> page,Square o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/square/index"))){
			try {
				Page<Square> accounts=service.findByPage(o, page);
				Map<String, Object> p=new HashMap<String, Object>();
				p.put("permitBtn",getPermitBtn(Const.RESOURCES_TYPE_BUTTON));
				p.put("list",accounts);		
				ar.setSucceed(p);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}	
		return ar;
	}
	
	
	@ControllerOptLog(desc="新增")
	@RequestMapping(value="add", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes add(Square o){
		AjaxRes ar=getAjaxRes();
			try {
				int res=service.insertSquare(o);
				if(res==1)ar.setSucceedMsg(Const.SAVE_SUCCEED);
				else ar.setFailMsg("数据有误，请重试");	
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
		return ar;
	}
	
	@ControllerOptLog(desc="更新")
	@RequestMapping(value="update", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes update(Square o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				o.setUpdatetime(String.valueOf(new Date().getTime()));
				service.update(o);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		}	
		return ar;
	}
	
	@ControllerOptLog(desc="删除")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(Square o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				int res=service.deleteSquare(o);
				if(res==0){
					ar.setFailMsg("该广场下有子数据,无法删除");
				}else{
					ar.setSucceedMsg(Const.DEL_SUCCEED);
				}
				
			} catch (Exception e) {
				ar.setFailMsg("该广场下有子数据,无法删除");
			}
		}	
		return ar;
	}
	
	@RequestMapping(value="find", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes find(Square o){
		AjaxRes ar=getAjaxRes();
			try {
				List<Square> list=service.find(o);
				Square acount =list.get(0);
				ar.setSucceed(acount);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		return ar;
	}
	
	@RequestMapping(value="findauto", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findauto(){
		AjaxRes ar=getAjaxRes();
			try {
				List<Squareclasses> list=squareClassessService.findauto();
				ar.setSucceed(list);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		return ar;
	}
}
