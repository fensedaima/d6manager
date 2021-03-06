<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html >
<html lang="en">
<head>
<%@include file="../../common/includeBaseSet.jsp" %>
<%@include file="../../common/includeSystemSet.jsp" %>
<link rel="stylesheet" href="${jypath}/static/plugins/viewer/css/boxImg.css" />
<script src="${jypath}/static/plugins/viewer/js/boxImg.js"></script>
<!-- <script type="text/javascript">
var ue;
function reurl(){ 
	ue=UE.getEditor('makesurecontent');
	} 
setTimeout('reurl()',500);
</script> -->

</head>
<body>
<div class="page-content">
		<div class="row-fluid">	
			<div class="col-xs-12">
					<form id="baseForm" class="form-inline" method="POST" onsubmit="return false;">
					<div class="row">
						<div class="widget-main">	
								<input type="text" name="content" placeholder="评论内容"   class="input-large">
							&nbsp;&nbsp;<span id="selectisValid"><label></label>选择日期：<input name="beginTime"   value="" class="date-picker required" type="text" placeholder="开始日期" >	
						~<input name="endTime" value="" class="date-picker" type="text" placeholder="结束日期" >		
						&nbsp;&nbsp;<span id="selectlogType"></span>													
							&nbsp;&nbsp;<button id='searchBtn' class="btn btn-warning  btn-xs" title="过滤" type="button" onclick="getCommentsList(1);$('#reset').trigger('click');"><i class="icon-search bigger-110 icon-only"></i></button>
						</div>				
					</div>
					<input type='hidden' class='pageNum' name='pageNum' value='1'/>
					<input type='hidden' class='pageSize'  name='pageSize' value='10'/>
					</form>
					<table id="baseTable" class="table table-striped table-bordered table-hover" >
						<thead>
							<tr>
								<th style="width:5%"  class="center hidden-480">编号</th>
								<th style="width:10%" class="center">评论人员</th>
								<th style="width:25%" class="center">相关动态</th>
								<th style="width:15%"  class="center "><i class="icon-time bigger-110 hidden-480"></i>评论时间</th>
								<th style="width:25%"  class="center hidden-480">评论内容</th>
								<th style="width:8%" class="center">操作</th> 
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<div class="row">
						<div class="col-sm-4">
							<div class="dataTables_info customBtn" >
								<a href="#" id="reset" title="重置" class="lrspace3" ><i class='icon-repeat color-red bigger-220'></i></a>
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
<script src="${jypath}/static/js/system/dsix/comments/comments.js"></script>		
</body>
</html>