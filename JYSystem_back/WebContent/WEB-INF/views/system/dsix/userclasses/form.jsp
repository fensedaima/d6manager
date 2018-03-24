<%@ page contentType="text/html;charset=UTF-8" %>
<div id="auDiv" hidden="true" align="left">
		<form id="auForm" method="POST" onsubmit="return false;" >
			<table id="table_report" class="table table-striped table-bordered table-hover">
					<tr style="display:none">
						<td colspan="2" class="ui-state-error"><input type="hidden" name="ids" ></td>
					</tr>
					<tr>
						<td style="width:20%;">会员状态:</td>
						<td>
							<label><input type="radio" class="ace" name="flag" value="1" checked="checked"><span class="lbl">启用</span></label>&nbsp;&nbsp;&nbsp;
							<label><input type="radio" class="ace" name="flag" value="0"><span class="lbl">禁用</span></label>
						</td>
					</tr>
					<tr >
						<td ><font color="red">*</font>会员等级：</td>
						<td >
						<input type="text" jyValidate="required" style="width:95%;" maxlength="8" name="classesname"></td>
					</tr>
					<tr>
						<td style="width:20%;">性别:</td>
						<td>
							<label> <input class="ace" type="radio" name="sex" value="1" checked="checked"> <span class="lbl">男</span></label> 
							<label> <input class="ace" type="radio" name="sex" value="0"> <span class="lbl">女</span></label> 
						</td>
					</tr>
					<tr>
						<td style="width:20%;"><font color="red">*</font>聊天次数:</td>
						<td><input type="number" style="width:50%;" jyValidate="required,numrangeth" name="talkcount" min='1' max='99999' maxlength="10" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
					</tr>
					<tr>
						<td><font color="red">*</font>排序:</td>
						<td><input type="number" style="width:50%;" jyValidate="required,numrangeth" name="userclassesorder" id="userclassesorder" min='1' max='99999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
					</tr>
					<tr>
						<td style="width:20%;">等级描述：</td>
						<td >&nbsp;
						<textarea rows="2" cols="10" name="describes" style="width:95%;height:100px" multiline="true"></textarea>
					</tr>
			</table>
		</form>
</div>
