package com.jy.controller.system.account;

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
import com.jy.common.utils.base.MD5;
import com.jy.common.utils.tree.entity.ZNodes;
import com.jy.controller.base.BaseController;
import com.jy.entity.system.account.Account;
import com.jy.service.system.account.AccountService;

@Controller
@RequestMapping("/backstage/account/")
public class AccountController extends BaseController<Account>{

	@Autowired
	private AccountService service;

	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/account/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping("list")	
	public String list(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/user/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping(value="roleTree", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes roleTree(){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/account/index"))){
			try {
				List<ZNodes> list=service.getRoles();
				ar.setSucceed(list);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}	
		return ar;
	}
		
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Account> page,Account o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/account/index"))){
			try {
				Page<Account> accounts=service.findByPage(o, page);
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
	
	@RequestMapping(value="userFindByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes userFindByPage(Page<Account> page,Account o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/account/list"))){
			try {
				o.setRoleId(Const.PHONE_USER_ROLE_ID);
				Page<Account> accounts=service.findByPage(o, page);
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
	
	@ControllerOptLog(desc="新增用户")
	@RequestMapping(value="add", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes add(Account o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_FUNCTION))){			
			try {
				if(o.getPicUrl()==null||o.getPicUrl().trim().length()==0){
					if(o.getSex()!=null&&o.getSex().trim().equalsIgnoreCase("1")){
						o.setPicUrl("http://106.14.39.87:8888/JYSystem/static/images/system/d6boy.png");
					}
					if(o.getSex()!=null&&o.getSex().trim().equalsIgnoreCase("0")){
						o.setPicUrl("http://106.14.39.87:8888/JYSystem/static/images/system/d6girl.png");
					}
				}
				int res=service.insertAccount(o);
				if(res==1)ar.setSucceedMsg(Const.SAVE_SUCCEED);
				else ar.setFailMsg("用户编号已存在");	
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
		}
		return ar;
	}
	
	@ControllerOptLog(desc="新增用户")
	@RequestMapping(value="upuseradd", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes upuseradd(Account o,String gnquanbu,String gwquanbu){
		AjaxRes ar=getAjaxRes();
		
		if(o.getLoginName()==null||o.getLoginName().trim().length()==0){
			ar.setFailMsg("用户编号不能为空");
			return ar;
		}
		
			try {
				if(gnquanbu!=null&&gnquanbu.equals("全部")){
					o.setUserlookwhere("全部");
				}
				else{
					if(o.getUserlookwhere()==null||o.getUserlookwhere().trim().length()==0){
						o.setUserlookwhere("");
					}
				}
				
				if(gwquanbu!=null&&gwquanbu.equals("全部")){
					o.setUserhandlookwhere("全部");
				}
				else{
					if(o.getUserhandlookwhere()==null||o.getUserhandlookwhere().trim().length()==0){
						o.setUserhandlookwhere("");
					}
				}
				if(o.getPicUrl()==null||o.getPicUrl().trim().length()==0){
					if(o.getSex()!=null&&o.getSex().trim().equalsIgnoreCase("1")){
						o.setPicUrl("http://106.14.39.87:8888/JYSystem/static/images/system/d6boy.png");
					}
					if(o.getSex()!=null&&o.getSex().trim().equalsIgnoreCase("0")){
						o.setPicUrl("http://106.14.39.87:8888/JYSystem/static/images/system/d6girl.png");
					}
				}
				int res=service.insertAccountupsuer(o);
				if(res==1){
					ar.setSucceedMsg(Const.SAVE_SUCCEED);
				}
				if(res==2){
					ar.setFailMsg("手机号已存在");	
				} 
				if(res==0){
					ar.setFailMsg("用户编号已存在");	
				} 
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
		return ar;
	}
	
	@RequestMapping(value="delBatch", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes delBatch(String chks){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_FUNCTION))){		
			try {
				service.deleteBatchAccount(chks);
				ar.setSucceedMsg(Const.DEL_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DEL_FAIL);
			}
		}
		return ar;
	}
	
	@RequestMapping(value="find", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes find(Account o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				List<Account> list=service.find(o);
				Account acount =list.get(0);
				ar.setSucceed(acount);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}
		return ar;
	}
	
	@ControllerOptLog(desc="更新用户")
	@RequestMapping(value="update", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes update(Account o,String gnquanbu,String gwquanbu){
		
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				
				if(o.getLoginName()==null||o.getLoginName().trim().length()==0){
					ar.setFailMsg("用户编号不能为空");
					return ar;
				}
				if(gnquanbu!=null&&gnquanbu.equals("全部")){
					o.setUserlookwhere("全部");
				}
				else{
					if(o.getUserlookwhere()==null||o.getUserlookwhere().trim().length()==0){
						o.setUserlookwhere("");
					}
				}
				
				if(gwquanbu!=null&&gwquanbu.equals("全部")){
					o.setUserhandlookwhere("全部");
				}
				else{
					if(o.getUserhandlookwhere()==null||o.getUserhandlookwhere().trim().length()==0){
						o.setUserhandlookwhere("");
					}
				}
				SimpleDateFormat myFmt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				o.setUpdateTime(myFmt.format(new Date()));
				if(o.getPassword()!=null&&o.getPassword().trim().length()>0){
					String pwrsMD5=MD5.md5(o.getPassword());//第一次加密md5，
					o.setPassword(pwrsMD5);	
				}
				service.update(o);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				ar.setFailMsg("用户编号已存在");	
			}
		}	
		return ar;
	}
	
	@ControllerOptLog(desc="删除用户")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(Account o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				service.deleteAccount(o);
				ar.setSucceedMsg(Const.DEL_SUCCEED);
			} catch (Exception e) {
				ar.setFailMsg("该用户下有数据，不得删除");
			}
		}	
		return ar;
	}
	
	@RequestMapping(value="resetPwd", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes resetPwd(Account o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {		
				o.setPassword(getPageData().getString("pwd"));
				int res=service.sysResetPwd(o);
				if(res==1) ar.setSucceedMsg(Const.UPDATE_SUCCEED);
				else ar.setFailMsg(Const.UPDATE_FAIL);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		}
		return ar;
	}
	
	@RequestMapping(value="setSetting", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes setSetting(String skin){
		AjaxRes ar=getAjaxRes();
		try {
			service.setSetting(skin);
			ar.setSucceedMsg(Const.UPDATE_SUCCEED);
		} catch (Exception e) {
			logger.error(e.toString(),e);
			ar.setFailMsg(Const.UPDATE_FAIL);
		}
		return ar;
	}
	
	@RequestMapping(value="getPerData", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes getPerData(){
		AjaxRes ar=getAjaxRes();
		try {
			Account account=service.getPerData();
			ar.setSucceed(account);
		} catch (Exception e) {
			logger.error(e.toString(),e);
			ar.setFailMsg(Const.DATA_FAIL);
		}
		return ar;
	}
	
	@RequestMapping(value="setHeadpic", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes setHeadpic(Account o){
		AjaxRes ar=getAjaxRes();
		try {
			service.setHeadpic(o);
			ar.setSucceedMsg(Const.UPDATE_SUCCEED);
		} catch (Exception e) {
			logger.error(e.toString(),e);
			ar.setFailMsg(Const.UPDATE_FAIL);
		}
		return ar;
	}
	
	@RequestMapping(value="setPerData", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes setPerData(Account o){
		AjaxRes ar=getAjaxRes();
		try {
			service.setPerData(o);
			ar.setSucceedMsg(Const.UPDATE_SUCCEED);
		} catch (Exception e) {
			logger.error(e.toString(),e);
			ar.setFailMsg(Const.UPDATE_FAIL);
		}
		return ar;
	}
	
	@RequestMapping(value="preResetPWD", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes resetPWD(String opwd,String npwd,String qpwd){
		AjaxRes ar=getAjaxRes();
		try {
			int res=service.preResetPwd(opwd,npwd,qpwd);
			if     (res==1)ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			else if(res==2)ar.setFailMsg("密码不正确");			
			else if(res==3)ar.setFailMsg("两次密码不一致");			
		} catch (Exception e) {
			logger.error(e.toString(),e);
			ar.setFailMsg(Const.UPDATE_FAIL);
		}
		return ar;
	}
	
	@RequestMapping(value="findauto", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findauto(Account o){
		AjaxRes ar=getAjaxRes();
			try {
				List<Account> list=service.findauto(o);
				ar.setSucceed(list);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		return ar;
	}
	
}
