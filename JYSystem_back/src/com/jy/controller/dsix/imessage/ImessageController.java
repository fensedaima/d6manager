package com.jy.controller.dsix.imessage;

import java.text.SimpleDateFormat;
import java.util.Arrays;
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
import com.jy.entity.dsix.imessage.Imessage;
import com.jy.entity.system.account.Account;
import com.jy.service.dsix.imessage.ImessageService;
import com.jy.service.system.account.AccountService;

@Controller
@RequestMapping("/backstage/imessage/")
public class ImessageController extends BaseController<Imessage> {
	
	@Autowired
	private ImessageService service;
	
	@Autowired
	private AccountService accountservice;
	

	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/imessage/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Imessage> page,Imessage imessage){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/imessage/index"))){
			try {
				Page<Imessage> imess=service.findByPage(imessage, page);
				Map<String, Object> p=new HashMap<String, Object>();
				p.put("permitBtn",getPermitBtn(Const.RESOURCES_TYPE_BUTTON));
				p.put("list",imess);		
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
	public AjaxRes add(final Imessage o,String gnquanbu,String gwquanbu) throws Exception{
		AjaxRes ar=getAjaxRes();
		Account account=new Account();
		if(gnquanbu!=null&&gnquanbu.equals("全部")){
			o.setLookwhere("全部");
		}
		else{
			if(o.getLookwhere()==null||o.getLookwhere().trim().length()==0){
				o.setLookwhere("");
			}
		}
		
		if(gwquanbu!=null&&gwquanbu.equals("全部")){
			o.setHandlookwhere("全部");
		}
		else{
			if(o.getHandlookwhere()==null||o.getHandlookwhere().trim().length()==0){
				o.setHandlookwhere("");
			}
		}
			try {
				o.setCreateTime(String.valueOf(new Date().getTime()));
				o.setUserid(AccountShiroUtil.getCurrentUser().getAccountId());
				service.insert(o);
				ar.setSucceedMsg(Const.SAVE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
			
			
			if(o.getLookwhere()!=null&&o.getLookwhere().trim().length()>0){
				if(!o.getLookwhere().trim().equalsIgnoreCase("全部")){
					account.setGnquanbu(Arrays.asList(o.getLookwhere().split(",")));
					account.setUserlookwhere(null);
				}
				else{
					account.setGnquanbu(null);
				}
			}
			
			if(o.getHandlookwhere()!=null&&o.getHandlookwhere().trim().length()>0){
				if(!o.getHandlookwhere().trim().equalsIgnoreCase("全部")){
					account.setGwquanbu(Arrays.asList(o.getHandlookwhere().split(",")));
					account.setUserhandlookwhere(null);
				}else{
					account.setGwquanbu(null);
				}
			}
			
			account.setSex(o.getSex());
			account.setUserclassesid(o.getClassesid());
			//首先推送Android的用户
			account.setDevicetype("android");
			final List<Map<String, String>> androidlist=accountservice.getRegionHashMap(account);
			 
			new Thread() {
	             public void run() {
	     			if(androidlist!=null&&androidlist.size()>0){
	     				StringBuffer androidsb=new StringBuffer();
	     				for (int i = 0; i < androidlist.size(); i++) {
	     					Map<String, String> innermap=androidlist.get(i);
	     					androidsb.append("\n");
	     					androidsb.append(String.valueOf(innermap.get("id")));
	     				}
	     				try {
							sendAndroidCustomizedcastFile(androidsb,o.getTitle(),o.getContent());
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
	     			} 
	             }
	        }.start();
			
			
			//再推送ios的用户
	        account.setDevicetype("ios");
	        
	        final List<Map<String, String>> ioslist=accountservice.getRegionHashMap(account);			
			new Thread() {
	             public void run() {
	     			if(ioslist!=null&&ioslist.size()>0){
	     				StringBuffer iossb=new StringBuffer();
	     				for (int i = 0; i < ioslist.size(); i++) {
	     					Map<String, String> innermap=ioslist.get(i);
	     					iossb.append("\n");
	     					iossb.append(String.valueOf(innermap.get("id")));
	     				}
	     				try {
							sendIOSCustomizedcast(iossb,o.getContent());
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
	     			}
	             }
			}.start();
			
			account.setImessageids(String.valueOf(o.getIds()));
			
			accountservice.updateimessage(account);
			
		return ar;
	}
	
	@ControllerOptLog(desc="删除信息")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(Integer plid){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){		
			try {
				Imessage info=new Imessage();
				info.setIds(plid);
				service.delete(info);
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
	public AjaxRes find(Imessage o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				List<Imessage> list=service.find(o);
				Imessage message =list.get(0);
				ar.setSucceed(message);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}
		return ar;
	}
}
