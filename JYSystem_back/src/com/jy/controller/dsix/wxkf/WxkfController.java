package com.jy.controller.dsix.wxkf;

import java.text.SimpleDateFormat;
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
import com.jy.common.utils.security.AccountShiroUtil;
import com.jy.controller.base.BaseController;
import com.jy.entity.dsix.wxkf.Wxkf;
import com.jy.service.dsix.wxkf.WxkfService;


@Controller
@RequestMapping("/backstage/wxkf/")
public class WxkfController extends BaseController<Wxkf> {
	
	@Autowired
	private WxkfService service;
	
	SimpleDateFormat myFmt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/wxkf/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	
	@ControllerOptLog(desc="新增用户")
	@RequestMapping(value="add", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes add(Wxkf o){
		AjaxRes ar=getAjaxRes();
			try {
				o.setUpdateTime(myFmt.format(new Date()));
				o.setCreateTime(myFmt.format(new Date()));
				o.setUserid(AccountShiroUtil.getCurrentUser().getAccountId());
				
				if(o.getKfPic()==null||o.getKfPic().trim().length()==0){
					o.setKfPic("http://106.14.39.87:8888/JYSystem/static/images/system/d6upuser.png");
				}
				
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
	public AjaxRes find(Wxkf o){
		AjaxRes ar=getAjaxRes();
			try {
				List<Wxkf> list=service.find(o);
				Wxkf wxkf =list.get(0);
				ar.setSucceed(wxkf);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		return ar;
	}
	
	@ControllerOptLog(desc="更新用户")
	@RequestMapping(value="update", method=RequestMethod.POST) 
	@ResponseBody
	public AjaxRes update(Wxkf o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				
				o.setUpdateTime(myFmt.format(new Date()));
				o.setUserid(AccountShiroUtil.getCurrentUser().getAccountId());
				service.update(o);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		}
		return ar;
	}
	
	
	@ControllerOptLog(desc="删除用户")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(String kfid){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				service.deleteWxkf(kfid);
				ar.setSucceedMsg(Const.DEL_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DEL_FAIL);
			}
		}
		return ar;
	}
	
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Wxkf> page,Wxkf o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/wxkf/index"))){
			try {
				Page<Wxkf> wxkfs=service.findByPage(o, page);
				Map<String, Object> p=new HashMap<String, Object>();
				p.put("permitBtn",getPermitBtn(Const.RESOURCES_TYPE_BUTTON));
				p.put("list",wxkfs);		
				ar.setSucceed(p);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}	
		return ar;
	}
}
