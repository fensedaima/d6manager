package com.jy.entity.dsix.speedabout;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;
@Alias("Basespeedabout")
public class Speedabout    extends BaseEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer ids;

    private String speednumber;

    private String speedstate;

    private String userid;

    private String speedwhere;

    private String speedorder;

    private String speedhomepage;

    private String speedcontent;
    
    private String speedtype;
    
    private String handspeedwhere;
    
    private String coverurl;
    
    private String speedmakesure;
    
    private String beginTime;
    
    private String endTime;
    
    private String speedpics;
    
    private String speedcity;
    
    //user区

	private String name;
	
	private String loginName;

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
	
	public String getSpeedcity() {
		return speedcity;
	}
	
	public void setSpeedcity(String speedcity) {
		this.speedcity = speedcity;
	}
	
	public String getLoginName() {
		return loginName;
	}
	
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	
	public String getSpeedpics() {
		return speedpics;
	}
	
	public void setSpeedpics(String speedpics) {
		this.speedpics = speedpics;
	}
	
	public String getspeedmakesure() {
		return speedmakesure;
	}

	public void setspeedmakesure(String speedmakesure) {
		this.speedmakesure = speedmakesure;
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

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getGexingqianming() {
		return gexingqianming;
	}

	public void setGexingqianming(String gexingqianming) {
		this.gexingqianming = gexingqianming;
	}

	public String getspeedtype() {
		return speedtype;
	}
	
	public void setspeedtype(String speedtype) {
		this.speedtype = speedtype;
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

    public String getspeednumber() {
        return speednumber;
    }

    public void setspeednumber(String speednumber) {
        this.speednumber = speednumber;
    }

    public String getspeedstate() {
        return speedstate;
    }

    public void setspeedstate(String speedstate) {
        this.speedstate = speedstate;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getspeedwhere() {
        return speedwhere;
    }

    public void setspeedwhere(String speedwhere) {
        this.speedwhere = speedwhere;
    }

    public String getSpeedorder() {
		return speedorder;
	}
    public void setSpeedorder(String speedorder) {
		this.speedorder = speedorder;
	}

    public String getspeedhomepage() {
        return speedhomepage;
    }

    public void setspeedhomepage(String speedhomepage) {
        this.speedhomepage = speedhomepage;
    }

    public String getspeedcontent() {
        return speedcontent;
    }

    public void setspeedcontent(String speedcontent) {
        this.speedcontent = speedcontent;
    }

	public String getHandspeedwhere() {
		return handspeedwhere;
	}

	public void setHandspeedwhere(String handspeedwhere) {
		this.handspeedwhere = handspeedwhere;
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
    
    
}