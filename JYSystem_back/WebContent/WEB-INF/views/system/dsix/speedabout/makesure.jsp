<%@ page contentType="text/html;charset=UTF-8" %>

<div id="makesure" hidden="true" align="left">
	<form id="makesureForm" method="POST" onsubmit="return false;" >
		<table id="table_report" class="table table-striped table-bordered table-hover">
		    <tr>
		    	<td style="width:15%;" align="center" rowspan="4"><img id="makesureinnerimg" width="100" height="100" nodedelete="false" modal="zoomImg"/></td> 
				<td style="width:15%;" align="left" colspan="2"><strong>速约编号：<span id="makesurespeednumber"><span><strong></td> 
				<td style="width:15%;" align="left" colspan="2"><strong>审核状态：<span id="makesurespeedmakesure"><span><strong></td>
			</tr>
			<tr>
				<td style="width:15%;" align="left">昵称：<span id="makesurename"><span></td> 
				<td style="width:15%;" align="left">会员等级：<span id="makesureclassesname"><span></td> 
				<td style="width:15%;" align="left">身高：<span id="makesureshengao"><span></td> 
				<td style="width:15%;" align="left">体重：<span id="makesuretizhong"><span></td> 
			</tr>	
			<tr>
				<td style="width:15%;" align="left">注册时间：<span id="makesurecreateTime"><span></td> 
				<td style="width:15%;" align="left">性别：<span id="makesuresex"><span></td> 
				<td style="width:15%;" align="left">年龄：<span id="makesurenianling"><span></td> 
				<td style="width:15%;" align="left">职业：<span id="makesurezhiye"><span></td> 
			</tr>
			<tr>
				<td style="width:15%;" align="left">星座：<span id="makesurexingzuo"><span></td> 
				<td style="width:15%;" align="left">个性签名：<span id="makesuregexingqianming"><span></td> 
				<td style="width:15%;" align="left" colspan="2">城市：<span id="makesurecity"><span></td> 
			</tr>
			<tr>
				<td style="width:15%;" align="left">内容详情：</td>
				<td colspan="4"><textarea  style="width:95%;height:190px"  id="makesurespeedcontent"></textarea></td>
			</tr>
		</table>
	</form>
</div>
</html>