<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html >
<html lang="en">
<head>
<%@include file="../../common/includeBaseSet.jsp" %>
<%@include file="../../common/includeSystemSet.jsp" %>
<link rel="stylesheet" href="${jypath}/static/plugins/viewer/css/boxImg.css" />
<script src="${jypath}/static/plugins/viewer/js/boxImg.js"></script>
</head>
<body>
<div class="page-content">
		<div class="row-fluid">	
			<div class="col-xs-12">
					<form id="baseForm" class="form-inline" method="POST" onsubmit="return false;">
					<div class="row">
						<div class="widget-main">	
						    <label>选择日期:</label>
							&nbsp;&nbsp;<input name="beginTime" id="thebeginTime" value="" jyValidate="required,datetime" class="date-picker" type="text" placeholder="开始时间" >					
							~ <input name="endTime" id="theendTime" value="" jyValidate="required,datetime" class="date-picker" type="text" placeholder="结束时间" >
							&nbsp;&nbsp;<input type="text" name="keyWord" placeholder="速约编号"   class="input-large">
							&nbsp;&nbsp;
							<input type="text" name="userclassesid" placeholder="会员编号"   class="input-large">
							&nbsp;&nbsp;
							状态:
							<select  data-placeholder="状态" name="speedstate" id="speedstate" class="chosen-select isSelect75">
							<option value="" selected="selected">全部</option>
							<option value="1" >救火</option>
							<option value="2">征求</option>
							<option value="3">急约</option>
							<option value="4">旅行约</option>
							</select>	
							&nbsp;&nbsp;<button id='searchBtn' class="btn btn-warning  btn-xs" title="查询" type="button" onclick="getbaseList(1);$('#reset').trigger('click');"><i class="icon-search bigger-110 icon-only"></i></button>
						</div>				
					</div>
					<input type='hidden' class='pageNum' name='pageNum' value='1'/>
					<input type='hidden' class='pageSize'  name='pageSize' value='10'/>
					</form>
					<table id="baseTable" class="table table-striped table-bordered table-hover" >
						<thead>
							<tr>
								<th style="width:5%"  class="center hidden-480">序号</th>
								<th style="width:10%" class="center">速约编号</th>
								<th style="width:18%" class="center hidden-480">会员编号</th>
								<!-- <th style="width:8%"  class="center "><i class="icon-time bigger-110 hidden-480"></i>开始</th>
								<th style="width:8%"  class="center "><i class="icon-time bigger-110 hidden-480"></i>结束</th> -->
								<!-- <th style="width:10%" class="center hidden-480">类型</th> -->
								<th style="width:25%"  class="center hidden-480">地区</th>
								<th style="width:8%" class="center hidden-480">状态</th>
								<th style="width:8%" class="center hidden-480">首页推荐</th>
								<th style="width:10%" class="center">操作</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<div class="row">
						<div class="col-sm-4">
							<div class="dataTables_info customBtn" >
								<a href="#" id="reset" title="重置" class="lrspace3" ><i class='icon-repeat color-red bigger-220'></i></a>
								<a href="#" id="addBtn" title="新增"  class="lrspace3" ><i  class='icon-plus-sign color-green bigger-220'></i></a>
							</div>
						</div>
						<div class="col-sm-8">
							<!--设置分页位置-->
							<div id="pageing" class="dataTables_paginate paging_bootstrap">
								<ul class="pagination"></ul>
							</div>
						</div>
					</div>
			<!-- #addorUpdateFrom -->
			<%@include file="form.jsp" %>
			<%@include file="makesure.jsp" %>
			<!-- #dialog-confirm -->
			<%@include file="../../common/dialog.jsp" %>	
			</div>
		</div>
	</div>	
<script src="${jypath}/static/js/system/dsix/speedabout/speedabout.js"></script>		
</body>
</html>