package com.jy.repository.system.account;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jy.common.utils.tree.entity.ZNodes;
import com.jy.entity.system.account.Account;
import com.jy.entity.system.org.Position;
import com.jy.repository.base.BaseDao;
import com.jy.repository.base.JYBatis;


/**
 * 用户数据层
 */
@JYBatis
public interface AccountDao  extends BaseDao<Account>{
    /**
     * 根据登录帐号查找loginName和accountType，正常只有一条数据
     * and a.isvalid='1' and a.account_type='1'需要该条件
     * @param loginName
     * @return
     */
    public Account findFormatByLoginName(String loginName);
    /**
     * 根据登录帐号ID,正常只有一条数据
     * @param loginName
     * @return
     */
    public Account findAccountById(String accountId);
    /**
     * 设置个人化皮肤
     * @param o(需要ID和皮肤属性)
     */
    public void setSetting(Account o);
    /**
     * 获取个人资料
     * @param accountId 用户Id
     * @return
     */
    public Account getPerData(String accountId);
    /**
     * 设置个人资料
     * @param o(需要ID)
     */
    public void setPerData(Account o);
    /**
     * 设置头像
     * @param account
     * @return
     */
    public void setHeadpic(Account o);
    /**
     * 获得角色树
     * @return
     */
    public List<ZNodes> getRoles();
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByLoginName(@Param("loginName") String loginName);
    
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByPhone(@Param("phone") String phone);
    
    /**
     * 通过登录名查找用户数量
     * @param loginName 用户名
     * @return
     */
    public int findCountByClassesid(@Param("userclassesid") String userclassesid);
    
    
    /**
     * 密码重置
     * @param Account 
     * @return
     */
    public void resetPwd(Account o);
    

    public List<Position> getPoss(String accountId);
    
    public List<Account> findauto(Account o);	
    
    public List<Map<String, String>> getRegionHashMap(Account o); 
    
    /**
	 * 更新一个对象
	 * @param o 对象       
	 */
	public void update(Account o);
	
	public void updateimessage(Account o);
}
