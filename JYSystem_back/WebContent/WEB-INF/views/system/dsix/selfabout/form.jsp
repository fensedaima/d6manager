<%@ page contentType="text/html;charset=UTF-8"%>
<div id="auDiv" hidden="true">
	<form id="auForm" method="POST" onsubmit="return false;">
	<input type="hidden" name="ids">
		<table id="table_report"
			class="table table-striped table-bordered table-hover">
			<tr>
				<td style="width: 10%;">编号：</td>
				<td style="width: 25%;"><span id="selfnumber"></span></td>
				
				<td style="width: 15%;">状态：</td>
				<td style="width: 15%;"><span id="isshow"></span></td>
			</tr>
			<tr>
				<td style="width: 10%;">昵称:</td>
				<td style="width: 25%;"><span id="name" /></span></td>
				<td style="width: 15%;">评论时间:</td>
				<td><span id="createTime" /></span></td>
			</tr>
			<tr>
				<td style="width: 15%;">城市：</td>
				<td colspan="3"><span id="city"></span></td>
			</tr>
			<tr>
				<td style="width: 15%;">国内：</td>
				<td colspan="3"><span id="lookwhere"></span></td>
			</tr>
			<tr>
				<td style="width: 15%;">国外：</td>
				<td colspan="3"><span id="handlookwhere"></span></td>
			</tr>
			<tr>
				<td style="width: 15%;">图片：</td>
				<td colspan="3" id="imagelist"></td>
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
