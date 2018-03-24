package com.jy.controller.dsix.lookabout;

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
import com.jy.entity.dsix.lookabout.Lookabout;
import com.jy.entity.system.account.Account;
import com.jy.service.dsix.imessage.ImessageService;
import com.jy.service.dsix.lookabout.LookaboutService;
import com.jy.service.system.account.AccountService;

@Controller
@RequestMapping("/backstage/lookabout/")
public class LookaboutController extends BaseController<Lookabout>{
	
	@Autowired
	private LookaboutService service;
	
	@Autowired
	private AccountService accountservice;
	
	@Autowired
	private ImessageService messageservice;
	
	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/lookabout/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}
	
	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Lookabout> page,Lookabout o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/lookabout/index"))){
			try {
				Page<Lookabout> accounts=service.findByPage(o, page);
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
	public AjaxRes add(Lookabout o,Account a,String gnquanbu,String gwquanbu) throws Exception{
		AjaxRes ar=getAjaxRes();
			try {
				if(gnquanbu!=null&&gnquanbu.equals("全部")){
					a.setUserlookwhere("全部");
				}
				else{
					if(a.getUserlookwhere()==null||a.getUserlookwhere().trim().length()==0){
						a.setUserlookwhere("");
					}
				}
				
				if(gwquanbu!=null&&gwquanbu.equals("全部")){
					a.setUserhandlookwhere("全部");
				}
				else{
					if(a.getUserhandlookwhere()==null||a.getUserhandlookwhere().trim().length()==0){
						a.setUserhandlookwhere("");
					}
				}
				
				a.setAccountId(o.getUserid());
				accountservice.update(a);
				int res=service.insertLookabout(o);
				if(res==1)ar.setSucceedMsg(Const.SAVE_SUCCEED);
				else ar.setFailMsg("数据有误，请重试");	
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.SAVE_FAIL);
			}
			
			//开始消息推送
			Imessage imessage=new Imessage();
			
			if(a.getUserlookwhere()!=null&&a.getUserlookwhere().trim().length()>0){
				imessage.setLookwhere(a.getUserlookwhere());
				if(!a.getUserlookwhere().trim().equalsIgnoreCase("全部")){
					a.setGnquanbu(Arrays.asList(a.getUserlookwhere().split(",")));
					a.setUserlookwhere(null);
				}else{
					a.setGnquanbu(null);
				}
			}
			
			if(a.getUserhandlookwhere()!=null&&a.getUserhandlookwhere().trim().length()>0){
				imessage.setHandlookwhere(a.getUserhandlookwhere());
				if(!a.getUserhandlookwhere().trim().equalsIgnoreCase("全部")){
					a.setGwquanbu(Arrays.asList(a.getUserhandlookwhere().split(",")));
					a.setUserhandlookwhere(null);
				}else{
					a.setGwquanbu(null);
				}
				
			}
			
			imessage.setCreateTime(String.valueOf(new Date().getTime()));
			imessage.setUserid(AccountShiroUtil.getCurrentUser().getAccountId());
			imessage.setTitle("最新觅约");
			//默认普通
			imessage.setClassesid(a.getUserclassesid());
			
			final String innserStr=a.getCity()+(a.getSex().equals("1")?"男生":"女生")+"发布一条最新觅约";
			
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
								sendAndroidCustomizedcastFile(androidsb,"最新觅约",innserStr);
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
	public AjaxRes update(Lookabout o,Account a,String gnquanbu,String gwquanbu,String zhiding){
		
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				if(gnquanbu!=null&&gnquanbu.equals("全部")){
					a.setUserlookwhere("全部");
				}
				else{
					if(a.getUserlookwhere()==null||a.getUserlookwhere().trim().length()==0){
						a.setUserlookwhere("");
					}
				}
				
				if(gwquanbu!=null&&gwquanbu.equals("全部")){
					a.setUserhandlookwhere("全部");
				}
				else{
					if(a.getUserhandlookwhere()==null||a.getUserhandlookwhere().trim().length()==0){
						a.setUserhandlookwhere("");
					}
				}
				
				if(o.getLookstate()!=null&&o.getLookstate().trim().equalsIgnoreCase("2")){
					o.setCoverurl("http://106.14.39.87:8888/JYSystem/static/images/system/d6looksuccessneirong.png");//内容
					o.setLookpics("http://106.14.39.87:8888/JYSystem/static/images/system/d6looksuccessfengmian.png");//封面
				}
				if(o.getLookstate()!=null&&o.getLookstate().trim().equalsIgnoreCase("4")){
					o.setCoverurl("http://106.14.39.87:8888/JYSystem/static/images/system/yinsibig.png");//内容
					o.setLookpics("http://106.14.39.87:8888/JYSystem/static/images/system/yinsismall.png");//封面
				}
				if(zhiding!=null&&zhiding.equals("置顶排序")){
					o.setCreateTime(String.valueOf(new Date().getTime()));
					o.setLookorder(o.getCreateTime());
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
	
	@ControllerOptLog(desc="删除")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(Lookabout o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){
			try {
				service.deleteLookabout(o);
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
	public AjaxRes find(Lookabout o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				List<Lookabout> list=service.find(o);
				Lookabout acount =list.get(0);
				ar.setSucceed(acount);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}
		return ar;
	}
}
