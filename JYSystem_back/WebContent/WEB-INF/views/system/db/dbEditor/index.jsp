<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html >
<html lang="en">
<head>
<%@include file="../../common/includeBaseSet.jsp" %>
<%@include file="../../common/includeSystemSet.jsp" %>
</head>
<body>
	<div class="page-content">
		<div class="row-fluid">		
			<div class="col-xs-12">
				<label >
					<button class="btn btn-xs btn-white btn-info btn-bold" onclick="executeSQL()">
						<i class="ace-icon icon-play color-green bigger-120"></i> 运行
					</button>
					
				</label> 	
				<label >
					<button class="btn btn-xs btn-white btn-info btn-bold" onclick="exportExl()">
						<i class="ace-icon icon-table color-dark-green bigger-120"></i> 导出
					</button>	
				</label> 		 
				<textarea id="sqlStr" class="form-control" style="height:250px;"
				placeholder="输入sql语句（目前只支持第一个“;”前的sql）"></textarea>
			</div>
			<div class="col-xs-12">
				<div class="tabbable">
					<ul class="nav nav-tabs" id="myTab">
						<li id="infoLi" class="active">
							<a data-toggle="tab" href="#information" aria-expanded="true"> 信息</a>
						</li>
						<li id="reslistLi" class="">
							<a data-toggle="tab" href="#resultList" aria-expanded="false"> 结果 </a>
						</li>
					</ul>

					<div class="tab-content">
						<div id="information" class="tab-pane fade active in"></div>

						<div id="resultList" class="tab-pane fade">
							<form id="baseForm" class="form-inline" method="POST" onsubmit="return false;">
								<input type='hidden' class='pageNum' name='pageNum' value='1'/>
								<input type='hidden' class='pageSize'  name='pageSize' value='5'/>
							</form>
							<div style="width: 100%; overflow: auto;">
								<table id="baseTable" class="table table-striped table-bordered table-hover">
									<thead></thead>
									<tbody></tbody>
								</table>
							</div>
							<div class="row">
								<div class="col-sm-8">
									<!--设置分页位置-->
									<div id="pageing" class="dataTables_paginate paging_bootstrap">
										<ul class="pagination"></ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<%@include file="../../common/dialog.jsp" %>	
	</div>
	<script src="${jypath}/static/js/system/db/dbEditor.js"></script>
</body>
</html>