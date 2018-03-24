package com.jy.controller.dsix.speedabout;

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
import com.jy.entity.dsix.speedabout.Speedabout;
import com.jy.entity.system.account.Account;
import com.jy.service.dsix.imessage.ImessageService;
import com.jy.service.dsix.speedabout.SpeedaboutService;
import com.jy.service.system.account.AccountService;

@Controller
@RequestMapping("/backstage/speedabout/")
public class SpeedAboutController  extends BaseController<Speedabout>{
	
	@Autowired
	private SpeedaboutService service;
	
	@Autowired
	private AccountService accountservice;
	
	@Autowired
	private ImessageService messageservice;
	
	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/speedabout/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Speedabout> page,Speedabout o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/speedabout/index"))){
			try {
				Page<Speedabout> accounts=service.findByPage(o, page);
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
	public AjaxRes add(Speedabout o,Account a,String gnquanbu,String gwquanbu) throws Exception{
		AjaxRes ar=getAjaxRes();
		
		if(o.getspeednumber()==null||o.getspeednumber().trim().length()==0){
			ar.setFailMsg("速约编号不能为空");
			return ar;
		}
		
			try {
				if(gnquanbu!=null&&gnquanbu.equals("全部")){
					o.setspeedwhere("全部");
				}
				else{
					if(o.getspeedwhere()==null||o.getspeedwhere().trim().length()==0){
						o.setspeedwhere("");
					}
				}
				
				if(gwquanbu!=null&&gwquanbu.equals("全部")){
					o.setHandspeedwhere("全部");
				}
				else{
					if(o.getspeedwhere()==null||o.getspeedwhere().trim().length()==0){
						o.setHandspeedwhere("");
					}
				}
				
				a.setAccountId(o.getUserid());
				accountservice.update(a);
				int res=service.insertSpeedabout(o);
				if(res==1)ar.setSucceedMsg(Const.SAVE_SUCCEED);
				else ar.setFailMsg("数据有误，请重试");	
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
			
			//开始消息推送
			Imessage imessage=new Imessage();
			
			if(o.getspeedwhere()!=null&&o.getspeedwhere().trim().length()>0){
				imessage.setLookwhere(o.getspeedwhere());
				
				if(!o.getspeedwhere().trim().equalsIgnoreCase("全部")){
					a.setGnquanbu(Arrays.asList(o.getspeedwhere().split(",")));
					a.setUserlookwhere(null);
				}else{
					a.setGnquanbu(null);
					a.setUserlookwhere(o.getspeedwhere());
				}
			}
			
			if(o.getHandspeedwhere()!=null&&o.getHandspeedwhere().trim().length()>0){
				imessage.setHandlookwhere(o.getHandspeedwhere());
				
				if(!o.getHandspeedwhere().trim().equalsIgnoreCase("全部")){
					a.setGwquanbu(Arrays.asList(o.getHandspeedwhere().split(",")));
					a.setUserhandlookwhere(null);
				}else{
					a.setGwquanbu(null);
					a.setUserhandlookwhere(o.getHandspeedwhere());
				}
				
			}
			
			
			imessage.setCreateTime(String.valueOf(new Date().getTime()));
			imessage.setUserid(AccountShiroUtil.getCurrentUser().getAccountId());
			imessage.setTitle("最新速约");
			//默认普通
			imessage.setClassesid(a.getUserclassesid());
			String speedstate="救火";
			if(o.getspeedstate().equals("2")){
				speedstate="征求";
			}
			if(o.getspeedstate().equals("3")){
				speedstate="急约";
			}
			if(o.getspeedstate().equals("4")){
				speedstate="旅行约";
			}
			//救火   征求 急约 旅行约
			 final String innserStr=speedstate+","+o.getSpeedcity()+(a.getSex().equals("1")?"男生":"女生")+"发布一条"+speedstate+"信息";
			
			 if(a.getSex()!=null&&a.getSex().trim().equalsIgnoreCase("1")){
				 a.setSex("0");
        	 }else{
        		 a.setSex("1");
        	 }
			 
			imessage.setSex(a.getSex());
			imessage.setContent(innserStr);
			//首先推送Android的用户
			a.setDevicetype("android");
			//用户类别不要
			a.setUserclassesid(null);
			
			final List<Map<String, String>> androidlist=accountservice.getRegionHashMap(a);
			
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
								sendAndroidCustomizedcastFile(androidsb,"最新速约",innserStr);
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
	     			}
	             }
			 }.start();
			
			
			//再推送ios的用户
			a.setDevicetype("ios");
			
		    final List<Map<String, String>> ioslist=accountservice.getRegionHashMap(a);
			 
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
							sendIOSCustomizedcast(iossb,innserStr);
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
	     			}
	             }
			}.start();
			
			messageservice.insert(imessage);
			a.setImessageids(String.valueOf(imessage.getIds()));
			accountservice.updateimessage(a);
			
		return ar;
	}
	
	@ControllerOptLog(desc="更新")
	@RequestMapping(value="update", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes update(Speedabout o,Account a,String gnquanbu,String gwquanbu,String zhiding){
		AjaxRes ar=getAjaxRes();
		
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				
				if(o.getspeednumber()==null||o.getspeednumber().trim().length()==0){
					ar.setFailMsg("速约编号不能为空");
					return ar;
				}
				
				if(gnquanbu!=null&&gnquanbu.equals("全部")){
					o.setspeedwhere("全部");
				}
				else{
					if(o.getspeedwhere()==null||o.getspeedwhere().trim().length()==0){
						o.setspeedwhere("");
					}
				}
				
				if(gwquanbu!=null&&gwquanbu.equals("全部")){
					o.setHandspeedwhere("全部");
				}
				else{
					if(o.getHandspeedwhere()==null||o.getHandspeedwhere().trim().length()==0){
						o.setHandspeedwhere("");
					}
				}
				if(zhiding!=null&&zhiding.equals("置顶排序")){
					o.setCreateTime(String.valueOf(new Date().getTime()));
					o.setSpeedorder(o.getCreateTime());
				}
				
				service.update(o);
				a.setAccountId(o.getUserid());
				accountservice.update(a);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		}	
		return ar;
	}
	
	@ControllerOptLog(desc="更新")
	@RequestMapping(value="updateshenhe", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes updateshenhe(Speedabout o,Account a,String gnquanbu,String gwquanbu){
		AjaxRes ar=getAjaxRes();
			try {
				o.setCreateTime(String.valueOf(new Date().getTime()));
				service.update(o);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		return ar;
	}
	
	@ControllerOptLog(desc="删除")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(Speedabout o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				service.deleteSpeedabout(o);
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
	public AjaxRes find(Speedabout o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				List<Speedabout> list=service.find(o);
				Speedabout acount =list.get(0);
				ar.setSucceed(acount);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}
		return ar;
	}
	
}
