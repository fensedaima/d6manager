<%@ page contentType="text/html;charset=UTF-8" %>
<div id="auDiv" class="hide">
		<form id="auForm" method="POST" onsubmit="return false;" >
			<table id="table_report" class="table table-striped table-bordered table-hover">
				<tbody>
					<tr style="display:none">
						<td colspan="2" class="ui-state-error"><input type="hidden" name="id" ><input type="hidden" name="oldparamName" ></td>
					</tr>
					<tr >
						<td style="width:25%;"><font color="red">*</font>地区名：</td>
						<td >&nbsp;
						<input type="text" jyValidate="required" maxlength="64" style="width:75%;" name="paramName" class="FormElement ui-widget-content ui-corner-all"></td>
					</tr>
					<tr >
						<td >国内/海外：<br><font color='red'>(不可修改)</font></td>
						<td >&nbsp;
							<label> <input class="ace" type="radio" name="paramKey" value="0" checked="checked"> <span class="lbl">国内</span></label> 
							<label> <input class="ace" type="radio" name="paramKey" value="1"> <span class="lbl">海外</span></label> 
						</td>
					</tr>
					<tr rowpos="4"  >
						<td >热门地区：</td>
						<td >&nbsp;
							<label class="inline isValidCheckbox">
								<input type="checkbox" checked="checked" sh-isValid="" role="checkbox" class="FormElement ace ace-switch ace-switch-5" />	
								<span  class="lbl"></span>
								<!-- cb-isValid和Yes和No选择框配套使用-->
								<input type="hidden" hi-isValid=""  name="isValid" value="1" />
							</label>
						</td>
					</tr>
					<tr>
						<td><font color="red">*</font>排序:</td>
						<td>&nbsp;<input type="number" style="width:50%;" jyValidate="required,numrangeth" name="lookorder" id="lookorder" min='1' max='99999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
					</tr>
					<tr >
						<td style="width:25%;">描述：</td>
						<td >&nbsp;
						<textarea  rows="2" cols="10" maxlength="100" style="width:75%;height:90px" name="description" multiline="true" class="FormElement ui-widget-content ui-corner-all isSelect147"></textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>