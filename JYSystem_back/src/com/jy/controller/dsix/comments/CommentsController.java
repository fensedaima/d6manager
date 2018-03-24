package com.jy.controller.dsix.comments;

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
import com.jy.entity.dsix.comments.Comments;
import com.jy.service.dsix.comments.CommentsService;

/**
 *  评论管理
 */
@Controller
@RequestMapping("/backstage/comments/")
public class CommentsController extends BaseController<Comments> {
	
	@Autowired
	private CommentsService service;

	@RequestMapping("index")	
	public String index(Model model){
		if(doSecurityIntercept(Const.RESOURCES_TYPE_MENU)){
			model.addAttribute("permitBtn", getPermitBtn(Const.RESOURCES_TYPE_FUNCTION));	
			return "/system/dsix/comments/list";
		}
		return Const.NO_AUTHORIZED_URL;
	}

	@RequestMapping(value="findByPage", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes findByPage(Page<Comments> page,Comments info){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_MENU,"/backstage/comments/index"))){
			try {
				Page<Comments> comment=service.findByPage(info, page);
				Map<String, Object> p=new HashMap<String, Object>();
				p.put("permitBtn",getPermitBtn(Const.RESOURCES_TYPE_BUTTON));
				p.put("list",comment);		
				ar.setSucceed(p);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}	
		return ar;
	}
	
	@ControllerOptLog(desc="删除用户")
	@RequestMapping(value="del", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes del(Integer plid){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				Comments info=new Comments();
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
	
	@ControllerOptLog(desc="修改显示状态")
	@RequestMapping(value="editIsShow", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes editIsShow(Integer plid){
		AjaxRes ar=getAjaxRes();
			try {
				Comments info=new Comments();
				info.setIds(plid);
				info.setIsShow("1");
				service.update(info);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		return ar;
	}
	
	@ControllerOptLog(desc="修改显示状态")
	@RequestMapping(value="editShow", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes editShow(Integer plid){
		AjaxRes ar=getAjaxRes();
			try {
				Comments info=new Comments();
				info.setIds(plid);
				info.setIsShow("0");
				service.update(info);
				ar.setSucceedMsg(Const.UPDATE_SUCCEED);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.UPDATE_FAIL);
			}
		return ar;
	}
	
	@RequestMapping(value="find", method=RequestMethod.POST)
	@ResponseBody
	public AjaxRes find(Comments o){
		AjaxRes ar=getAjaxRes();
		if(ar.setNoAuth(doSecurityIntercept(Const.RESOURCES_TYPE_BUTTON))){	
			try {
				List<Comments> list=service.find(o);
				Comments comment =list.get(0);
				ar.setSucceed(comment);
			} catch (Exception e) {
				logger.error(e.toString(),e);
				ar.setFailMsg(Const.DATA_FAIL);
			}
		}
		return ar;
	}
}
