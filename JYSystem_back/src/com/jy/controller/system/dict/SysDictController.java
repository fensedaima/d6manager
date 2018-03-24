package com.jy.controller.system.dict;

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
import com.jy.common.mybatis.Page;
import com.jy.common.utils.base.Const;
import com.jy.controller.base.BaseController;
import com.jy.entity.system.dict.SysDict;
import com.jy.service.system.dict.SysDictService;
/*
 * 系统字典
 */
@Controller
@RequestMapping("/backstage/sysDict/")
public class SysDictController extends BaseController<SysDict>{
	
	@Autowired
	public SysDictService service;
	/**
	 * 系统字典首页
	 */
	@RequestMapping("index")
	public String index(Model model) {	
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));		
			return "/system/dict/sys/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<SysDict> page,SysDict o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/sysDict/index"))){
			try {
				Page<SysDict> result=service.findByPage(o,page);
				Map<String, Object> p=new HashMap<String, Object>();
				p.put("permitBtn",getPermitBtn(Const.RESOURCES_TYPE_BUTTON));
				p.put("list",result);		
				ar.setSucceed(p);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}
		return ar;
	}
	
	@RequestMapping(value="add", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes add(SysDict o){
		AjaxRes ar=getAjaxRes();
			try {
				o.setId(get32UUID());
				o.setCreateTime(new Date());	
				service.insert(o);
				ar.setSucceedMsg(Const.SAVE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
		return ar;
	}
	
	@RequestMapping(value="find", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes find(SysDict o){
		AjaxRes ar=getAjaxRes();
			try {
				List<SysDict> list=service.find(o);
				SysDict obj=list.get(0);
				ar.setSucceed(obj);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		return ar;
	}
	
	@RequestMapping(value="update", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes update(SysDict o){
		AjaxRes ar=getAjaxRes();
			try {
				o.setUpdateTime(new Date());
				if(o.getParamName()!=null&&o.getParamName().trim().equals("全部")){
					ar.setFailMsg("名称不可包含【全部】关键字");
				}else{
					service.update(o);
					ar.setSucceedMsg(Const.UPDATE_SUCCEED);
				}
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		return ar;
	}
	
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(SysDict o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				List<SysDict> list=service.find(o);
				SysDict obj=list.get(0);
				
				if(service.syscount(obj)==0){
					service.delete(o);
					ar.setSucceedMsg(Const.DEL_SUCCEED);
				}
				else{
					ar.setFailMsg("该地区正在使用，不能删除");
				}
				
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DEL_FAIL);
			}
		}
		return ar;
	}
	
	@RequestMapping(value="findauto", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findauto(SysDict o){
		AjaxRes ar=getAjaxRes();
			try {
				List<SysDict> list=service.find(o);
				ar.setSucceed(list);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		return ar;
	}
}
