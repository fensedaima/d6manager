package com.jy.entity.dsix.lookabout;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("BaseLookabout")
public class Lookabout extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer ids;

	private String lookstate;

	private String userid;

	private String loginName;

	private String userlookwhere;

	private String lookorder;

	private String lookhomepage;

	private String duifangyaoqiu;

	private String looktype;

	private String userhandlookwhere;

	private String coverurl;

	private String lookmakesure;

	private String lookpics;
	// user区

	private String name;

	private String picUrl;

	private String email;

	private String description;

	private Integer isValid;

	private String createTime;

	private String updateTime;

	private String keyWord;

	private String phone;

	private String userclassesid;

	private String classesname;

	private String sex;

	private String city;

	private String screen;

	private String xingquaihao;

	private String zhiye;

	private String nianling;

	private String shengao;

	private String tizhong;

	private String xingzuo;

	private String gexingqianming;
	
	private String zuojia;
	
	public String getZuojia() {
		return zuojia;
	}
	
	public void setZuojia(String zuojia) {
		this.zuojia = zuojia;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getLookpics() {
		return lookpics;
	}

	public void setLookpics(String lookpics) {
		this.lookpics = lookpics;
	}

	public String getLookmakesure() {
		return lookmakesure;
	}

	public void setLookmakesure(String lookmakesure) {
		this.lookmakesure = lookmakesure;
	}

	public String getCoverurl() {
		return coverurl;
	}

	public void setCoverurl(String coverurl) {
		this.coverurl = coverurl;
	}

	public String getXingzuo() {
		return xingzuo;
	}

	public void setXingzuo(String xingzuo) {
		this.xingzuo = xingzuo;
	}

	public String getGexingqianming() {
		return gexingqianming;
	}

	public void setGexingqianming(String gexingqianming) {
		this.gexingqianming = gexingqianming;
	}

	public String getLooktype() {
		return looktype;
	}

	public void setLooktype(String looktype) {
		this.looktype = looktype;
	}

	public String getScreen() {
		return screen;
	}

	public void setScreen(String screen) {
		this.screen = screen;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUserclassesid() {
		return userclassesid;
	}

	public void setUserclassesid(String userclassesid) {
		this.userclassesid = userclassesid;
	}

	public String getClassesname() {
		return classesname;
	}

	public void setClassesname(String classesname) {
		this.classesname = classesname;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getIsValid() {
		return isValid;
	}

	public void setIsValid(Integer isValid) {
		this.isValid = isValid;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public Integer getIds() {
		return ids;
	}

	public void setIds(Integer ids) {
		this.ids = ids;
	}

	public String getLookstate() {
		return lookstate;
	}

	public void setLookstate(String lookstate) {
		this.lookstate = lookstate;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getLookorder() {
		return lookorder;
	}
	
	public void setLookorder(String lookorder) {
		this.lookorder = lookorder;
	}

	public String getLookhomepage() {
		return lookhomepage;
	}

	public void setLookhomepage(String lookhomepage) {
		this.lookhomepage = lookhomepage;
	}

	public String getXingquaihao() {
		return xingquaihao;
	}

	public void setXingquaihao(String xingquaihao) {
		this.xingquaihao = xingquaihao;
	}

	public String getZhiye() {
		return zhiye;
	}

	public void setZhiye(String zhiye) {
		this.zhiye = zhiye;
	}

	public String getNianling() {
		return nianling;
	}

	public void setNianling(String nianling) {
		this.nianling = nianling;
	}

	public String getShengao() {
		return shengao;
	}

	public void setShengao(String shengao) {
		this.shengao = shengao;
	}

	public String getTizhong() {
		return tizhong;
	}

	public void setTizhong(String tizhong) {
		this.tizhong = tizhong;
	}

	public String getUserlookwhere() {
		return userlookwhere;
	}

	public void setUserlookwhere(String userlookwhere) {
		this.userlookwhere = userlookwhere;
	}

	public String getDuifangyaoqiu() {
		return duifangyaoqiu;
	}

	public void setDuifangyaoqiu(String duifangyaoqiu) {
		this.duifangyaoqiu = duifangyaoqiu;
	}

	public String getUserhandlookwhere() {
		return userhandlookwhere;
	}

	public void setUserhandlookwhere(String userhandlookwhere) {
		this.userhandlookwhere = userhandlookwhere;
	}
}