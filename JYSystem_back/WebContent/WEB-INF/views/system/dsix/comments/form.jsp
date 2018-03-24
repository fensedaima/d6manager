<%@ page contentType="text/html;charset=UTF-8"%>
<div id="auDiv" hidden="true">
	<form id="auForm" method="POST" onsubmit="return false;">
		<table id="table_report"
			class="table table-striped table-bordered table-hover">
			<tr>
				<td style="width: 15%;">编号：</td>
				<td><span id="ids"></span></td>
				<td style="width: 15%;">状态：</td>
				<td><span id="isShow"></span></td>
			</tr>
			<tr>
				<td style="width: 15%;">用户姓名:</td>
				<td><span id="memberName" /></span></td>
				<td style="width: 15%;">评论时间:</td>
				<td><span id="createTime" /></span></td>
			</tr>
			<tr>
				<td style="width: 15%;">详细内容:</td>
				<td id="nr" colspan="5"><textarea
						style="width: 93%; height: 80px; border: 0px" name="content"
						id="content" disabled="disabled"></textarea></td>
			</tr>
		</table>
	</form>
</div>
