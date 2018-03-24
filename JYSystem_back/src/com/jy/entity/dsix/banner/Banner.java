package com.jy.entity.dsix.banner;

import org.apache.ibatis.type.Alias;

import com.jy.entity.base.BaseEntity;

@Alias("BaseBanner")
public class Banner extends BaseEntity {

	private static final long serialVersionUID = 1L;

	private Integer ids;

	private String picurl;

	private String newsid;

	private int bannerorder;

	private String bannerkey;

	private String createTime;

	private String title;

	public String getBannerkey() {
		return bannerkey;
	}

	public void setBannerkey(String bannerkey) {
		this.bannerkey = bannerkey;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getIds() {
		return ids;
	}

	public void setIds(Integer ids) {
		this.ids = ids;
	}

	public String getPicurl() {
		return picurl;
	}

	public void setPicurl(String picurl) {
		this.picurl = picurl;
	}

	public String getNewsid() {
		return newsid;
	}

	public void setNewsid(String newsid) {
		this.newsid = newsid;
	}

	public int getBannerorder() {
		return bannerorder;
	}

	public void setBannerorder(int bannerorder) {
		this.bannerorder = bannerorder;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}