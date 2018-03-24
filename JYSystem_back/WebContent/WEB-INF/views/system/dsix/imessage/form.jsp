<%@ page contentType="text/html;charset=UTF-8" %>
<div id="auDiv" hidden="true" align="left">
	<form id="auForm" method="POST" onsubmit="return false;" >
		<td colspan="2" class="ui-state-error"></td>
		<table id="table_report" class="table table-striped table-bordered table-hover">
			<tr>
				<td style="width:15%"><font color="red">*</font>消息标题</td>
				<td><input type="text" jyValidate="required" style="width:95%;" maxlength="70" name="title" id="title"  placeholder="这里输入标题" title="标题"/></td>
			</tr>
			<tr>
				<td style="width:15%;"><font color='blue'>国内地区：</font></td>
				<td><font color='red'>输入自动查询</font> &nbsp;&nbsp;&nbsp;<span id="guoneidiqu"></span>&nbsp;&nbsp;&nbsp;<input type="checkbox" id="gnquanbu" name="gnquanbu" value="全部"/>&nbsp;全部 
			</tr>
			<tr>
				<td style="width:15%;"><font color='blue'>海外地区：</font></td>
				<td><font color='red'>输入自动查询</font> &nbsp;&nbsp;&nbsp;<span id="guowaidiqu"></span>&nbsp;&nbsp;&nbsp;<input type="checkbox" id="gwquanbu" name="gwquanbu" value="全部" />&nbsp;全部 
			</tr>
			<tr>
				<td style="width:15%;">推送性别:</td>
				<td>
					<label> <input class="ace" type="radio" name="sex" value="1" checked="checked"> <span class="lbl">男</span></label> 
					<label> <input class="ace" type="radio" name="sex" value="0"> <span class="lbl">女</span></label> 
				</td>
			</tr>
			<tr>
				<td style="width:15%">会员等级：</td>
				<td id="userSelect"></td>
			</tr>
			<tr>
				<td style="width:15%;">消息详情:</td>
				<td id="nr">
					<textarea  style="width:95%;height:280px" name="content" id="content"></textarea>
				</td>
			</tr>
		</table>
	</form>
</div>
