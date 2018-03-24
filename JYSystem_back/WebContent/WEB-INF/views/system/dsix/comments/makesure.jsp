<%@ page contentType="text/html;charset=UTF-8" %>
<!-- 编辑框-->
		<%-- <script type="text/javascript" charset="utf-8">window.UEDITOR_HOME_URL = "${jypath}/static/plugins/ueditor/";</script>
		<script type="text/javascript" charset="utf-8" src="${jypath}/static/plugins/ueditor/ueditor.config.js"></script>
		<script type="text/javascript" charset="utf-8" src="${jypath}/static/plugins/ueditor/ueditor.all.js"></script> --%>
		
<div id="makesureauDiv" hidden="true" align="left">
	<form id="makesureauForm" method="POST" onsubmit="return false;" >
		<td colspan="2" class="ui-state-error">
		<input type="hidden" name="ids" >
		<input type="hidden" id="savePath" readonly="readonly" name="coverurl" >
		</td>
		<table id="table_report" class="table table-striped table-bordered table-hover" >
			<tr>
				<td style="width:15%;"><font color="red">*</font>文章标题：</td>
				<td><input  type="text" jyValidate="required"  readonly="readonly"  style="width:95%;" name="makesuretitle" id="makesuretitle" maxlength="70" placeholder="这里输入标题" title="标题"/></td>
			</tr>
			<tr>
				<td >广场分类：</td>
				<td id="squareSelect"></td>
			</tr>
			<tr>
				<td >首页推荐:</td>
				<td>
					<label> <input class="ace" type="radio" name="makesurehomepagerecommend" value="1" checked="checked" disabled="disabled"> <span class="lbl">是</span></label> 
					<label> <input class="ace" type="radio" name="makesurehomepagerecommend" value="0" disabled="disabled"> <span class="lbl">否</span></label> 
				</td>
			</tr>
			<tr>
				<td ><font color="red">*</font>排序:</td>
				<td><input type="number" style="width:70%;" readonly="readonly" jyValidate="required,numrangeth" name="makesureorders" min='1' max='99999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
			</tr>
			<tr>
				<td style="width:15%;">封面图</td>
				<td id="makesureimagelist"></td>
			</tr>
			<tr>
				<td >文章内容:</td>
				<td id="nr">
					<textarea style="width:95%;height:190px" name="makesurecontent" id="makesurecontent"></textarea>
				</td>
			</tr>
		</table>
	</form>
</div>
</html>