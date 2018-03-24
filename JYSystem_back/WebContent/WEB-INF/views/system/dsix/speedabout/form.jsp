<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="${jypath}/static/plugins/webuploader/css/webuploader.css" />
<link rel="stylesheet" href="${jypath}/static/css/system/jquery/jquery-ui-timepicker-addon.css" />
<script src="${jypath}/static/plugins/webuploader/js/webuploader.nolog.min.js"></script>

<script src="${jypath}/static/js/bootstrap/locales/jquery-ui-timepicker-addon.js"></script>
<script src="${jypath}/static/js/bootstrap/locales/jquery-ui-timepicker-zh-CN.js"></script>
<script src="${jypath}/static/plugins/webuploader/js/webuploader.nolog.min.js"></script>
<style>  
    #filePicker div:nth-child(2){width:100%!important;height:100%!important;}  
</style> 
<style>  
    #picfilePicker div:nth-child(2){width:100%!important;height:100%!important;}  
</style> 
<style>
.ui-autocomplete{
       z-index: 11111;
}
</style>
<!-- 编辑框-->
		<%-- <script type="text/javascript" charset="utf-8">window.UEDITOR_HOME_URL = "${jypath}/static/plugins/ueditor/";</script>
		<script type="text/javascript" charset="utf-8" src="${jypath}/static/plugins/ueditor/ueditor.config.js"></script>
		<script type="text/javascript" charset="utf-8" src="${jypath}/static/plugins/ueditor/ueditor.all.js"></script> --%>
		<!-- 编辑框-->
		<script type="text/javascript">
		jQuery(function() {
			
			 var options = {
				        host : "http://upload.qiniu.com",
				        tokenUrl : jypath +'/backstage/tool/webuploader/getqiniutoken',
				        mockToken : false,
				       mockTokenValue : "tdTCtQ1EIxHeCI_NB3qk0k3fKUeG-5yxux32K6x2:upyyqkQPYIrAhrJSgHiBbgF2vT8=:eyJzY29wZSI6Imp5c3lzdGVtIiwiZGVhZGxpbmUiOjE1MTUyMjI2MzN9",
				       hash : true
				    }
			 
		    var $ = jQuery;
		        // Web Uploader实例
		        var uploader;
			    var picuploader;
		    // 初始化Web Uploader
		    uploader = WebUploader.create({
		        // 自动上传。
		        auto: true,
		        // swf文件路径
		        swf: jypath + '/static/plugins/webuploader/js/Uploader.swf',
		        // 文件接收服务端。
		        server: options.host,
		        // 选择文件的按钮。可选。
		        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
		        pick: '#filePicker',
		        // 只允许选择文件，可选。
		        accept: {
		            title: 'Images',
		            extensions: 'gif,jpg,jpeg,bmp,png',
		            mimeTypes: 'image/*'
		        },
		        fileSingleSizeLimit: 4 * 1024 * 1024,   // 单文件的最大限制1M  
		      //不压缩文件
		   		compress: null,
		   		fileNumLimit:9999,
		   	    duplicate :true 
		    });
		    
		    picuploader = WebUploader.create({
		        // 自动上传。
		        auto: true,
		        // swf文件路径
		        swf: jypath + '/static/plugins/webuploader/js/Uploader.swf',
		        // 文件接收服务端。
		        server: options.host,
		        // 选择文件的按钮。可选。
		        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
		        pick: '#picfilePicker',
		        // 只允许选择文件，可选。
		        accept: {
		            title: 'Images',
		            extensions: 'gif,jpg,jpeg,bmp,png',
		            mimeTypes: 'image/*'
		        },
		        fileSingleSizeLimit: 4 * 1024 * 1024 ,   // 单文件的最大限制1M  
		      //不压缩文件
		   		compress: null,
		   		fileNumLimit:9999,
		   	    duplicate :true
		    });
		    
		    uploader.onError = function( code ) {
		    	if(code=="F_EXCEED_SIZE"){
		    		JY.Model.error("单张图片大小最多4M");
		    	}
	        };

	        picuploader.onError = function( code ) {
		    	if(code=="F_EXCEED_SIZE"){
		    		JY.Model.error("单张图片大小最多4M");
		    	}
	        };
	        
		    uploader.on("uploadStart", function(file){
		        if(!options.mockToken) {
		            GetToken(options.tokenUrl, file);
		        } else {
		            uploader.options.formData = {
		                token : options.mockTokenValue
		            }
		            token = options.mockTokenValue;
		        }
		    });
		    
		    picuploader.on("uploadStart", function(file){
		        if(!options.mockToken) {
		        	picGetToken(options.tokenUrl, file);
		        } else {
		        	picuploader.options.formData = {
		                token : options.mockTokenValue
		            }
		            token = options.mockTokenValue;
		        }
		    });
		    
		    uploader.on("beforeFileQueued", function(file){
		        var savePath=$("#savePath").val();
		        var array=savePath.split(",");
		        if(array.length>8){
		        	JY.Model.error("最多上传9张图片");
		        	return false;
		        }
		    });
		   
		    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
		    uploader.on('uploadSuccess', function(file,json) {
		    	var imgsrc="http://p22l7xdxa.bkt.clouddn.com/"+json.key;
		        	$("#imagelist").append("<img  width='100' height='100' src='"+imgsrc+"' nodedelete='true' modal='zoomImg'/> ");
		        	var savePath=$("#savePath").val();
		        	
		        	if(JY.Object.notNull(savePath)){
		        		savePath+=","+imgsrc;
		        	}else{
		        		savePath=imgsrc;
		        	}
		        	$("#savePath").val(savePath);
		        	batch();
		    });
		    
		 // 文件上传成功，给item添加成功class, 用样式标记上传成功。
		    picuploader.on('uploadSuccess', function(file,json) {
		    	var imgsrc="http://p22l7xdxa.bkt.clouddn.com/"+json.key;
	        	$("#innerimg").attr("src",imgsrc);
	        	
	        	$("#picsavePath").val(imgsrc);
		    });
		    
		    function GetToken(tokenUrl, file) {
		    	$.ajax({
		            async:false,
		            type: 'get',
		            url: tokenUrl,
		            success: function (res) {
		                token = $.parseJSON(res).resMsg;
		                if(options.hash) {
		                    uploader.options.formData = {
		                        token : token,
		                    }
		                } else {
		                    uploader.options.formData = {
		                        token : token,
		                        key: file.name
		                    }
		                }
		            }
		        });
		    }
		    
		    function picGetToken(tokenUrl, file) {
		    	$.ajax({
		            async:false,
		            type: 'get',
		            url: tokenUrl,
		            success: function (res) {
		                token = $.parseJSON(res).resMsg;
		                if(options.hash) {
		                	picuploader.options.formData = {
		                        token : token,
		                    }
		                } else {
		                	picuploader.options.formData = {
		                        token : token,
		                        key: file.name
		                    }
		                }
		            }
		        });
		    }
		    
		    $("#beginTime").datetimepicker({//添加选择日期功能  
	            numberOfMonths:1,//显示几个月  
	            showButtonPanel:true,//是否显示按钮面板  
	            dateFormat: 'yy-mm-dd',//日期格式  
	            showSecond: true,  
                timeFormat: 'HH:mm:ss',  
                stepHour: 1,  
                stepMinute: 1,  
                stepSecond: 1 ,
	            clearText:"清除",//清除日期的按钮名称  
	            closeText:"关闭",//关闭选择框的按钮名称  
	            yearSuffix: '年', //年的后缀  
	            showMonthAfterYear:true,//是否把月放在年的后面  
	            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],  
	            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
	            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
	            dayNamesMin: ['日','一','二','三','四','五','六']
	            });  
		  
		  $("#endTime").datetimepicker({//添加选择日期功能  
	            numberOfMonths:1,//显示几个月  
	            showButtonPanel:true,//是否显示按钮面板  
	            dateFormat: 'yy-mm-dd',//日期格式  
	            showSecond: true,  
                timeFormat: 'HH:mm:ss',  
                stepHour: 1,  
                stepMinute: 1,  
                stepSecond: 1 , 
	            clearText:"清除",//清除日期的按钮名称  
	            closeText:"关闭",//关闭 选择框的按钮名称  
	            yearSuffix: '年', //年的后缀  
	            showMonthAfterYear:true,//是否把月放在年的后面  
	            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],  
	            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
	            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
	            dayNamesMin: ['日','一','二','三','四','五','六']
	            });  
		})
		</script>
<div id="auDiv" hidden="true" align="left">
	<form id="auForm" method="POST" onsubmit="return false;" >
		<input type="hidden" name="ids">
		<input type="hidden" name="userid">
		<input type="hidden" name="speedtype" value="1">
		<input type="hidden" id="savePath" readonly="readonly" name="coverurl" >
		<input type="hidden" id="sex" name="sex">
		<input type="hidden" id="loginName" name="loginName">
		
		<table id="table_report" class="table table-striped table-bordered table-hover">
			<tr>
				<td style="width:15%;"><font color="red">*</font>选择会员：</td>
				<td><input type="text" jyValidate="required" style="width:78%;" id="userid" maxlength="30" placeholder="会员编号 会员手机号" title="会员编号 会员手机号"/>&nbsp;&nbsp;&nbsp;<font color='red'>输入信息自动匹配</font></td>
			</tr>		
			<tr>
				<td style="width:15%;">状态：</td>
				<td>
					<label><input type="radio" class="ace" name="speedstate"  value="1" checked="checked"><span class="lbl">救火</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="speedstate"  value="2"><span class="lbl">征求</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="speedstate"  value="3"><span class="lbl">急约</span></label>
					<label><input type="radio" class="ace" name="speedstate"  value="4"><span class="lbl">旅行约</span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>编号：</td>
				<td><input type="text" jyValidate="required" style="width:95%;" name="speednumber" id="speednumber" maxlength="15" placeholder="编号" title="编号"/></td>
			</tr>
			<tr>
				<td style="width:15%;">兴趣爱好：</td>
				<td><input type="text" style="width:95%;" name="xingquaihao" id="xingquaihao"  placeholder="兴趣爱好" title="兴趣爱好" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">职业：</td>
				<td><input type="text"  style="width:95%;" name="zhiye" id="zhiye"  placeholder="职业" title="职业" maxlength="80"/></td>
			</tr>
			<tr>
				<td>性别:</td>
				<td>
					<span id="thesex"><span>
				</td>
			</tr>
			<tr>
				<td style="width:15%;">年龄：</td>
				<td><input type="text"  style="width:95%;" name="nianling" id="nianling"  placeholder="年龄" title="年龄" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">身高：</td>
				<td><input type="text"  style="width:95%;" name="shengao" id="shengao"  placeholder="身高" title="身高" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">体重：</td>
				<td><input type="text"  style="width:95%;" name="tizhong" id="tizhong"  placeholder="体重" title="体重" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">星座：</td>
				<td><input type="text" style="width:95%;" name="xingzuo" id="xingzuo"  placeholder="星座" title="星座" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">个性签名：</td>
				<td><input type="text" style="width:95%;" name="gexingqianming" id="gexingqianming"  placeholder="个性签名" title="个性签名" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">座驾：</td>
				<td><input type="text" style="width:95%;" name="zuojia" id="zuojia"  placeholder="座驾" title="座驾" maxlength="250"/></td>
			</tr>
			<tr>
				<td style="width:15%;">视频认证：</td>
				<td>
					<label><input type="radio" class="ace" name="screen"  value="1" ><span class="lbl">已经认证</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="screen"  value="0" checked="checked"><span class="lbl">没有认证</span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>城市：</td>
				<td><input type="text"  style="width:95%;" jyValidate="required" name="speedcity" id="speedcity"  placeholder="城市" title="城市" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;"><font color='blue'>国内地区：</font></td>
				<td><font color='red'>点击多选，输入查询</font> &nbsp;&nbsp;&nbsp;<span id="guoneidiqu"></span>&nbsp;&nbsp;&nbsp; <input type="checkbox" id="gnquanbu" name="gnquanbu" value="全部"/>&nbsp;全部
			</tr>
			<tr>
				<td style="width:15%;"><font color='blue'>海外地区：</font></td>
				<td><font color='red'>点击多选，输入查询</font> &nbsp;&nbsp;&nbsp;<span id="guowaidiqu"></span>&nbsp;&nbsp;&nbsp; <input type="checkbox" id="gwquanbu" name="gwquanbu" value="全部" />&nbsp;全部 
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>开始时间：</td>
				<td>
				<input type="text" style="width:30%;" jyValidate="required" name="beginTime"  id="beginTime" readonly="readonly" placeholder="开始时间" />
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>结束时间：</td>
				<td>
				<input type="text" style="width:30%;" jyValidate="required" name="endTime"  id="endTime" readonly="readonly" placeholder="结束时间" />
				</td>
			</tr>
			<tr>
				<td><font color="red">*</font>排序:</td>
				<td><input type="number" style="width:50%;" jyValidate="required,numrangeth" name="speedorder" id="speedorder" min='1' max='9999999999999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;
				<input type="checkbox" id="zhiding" name="zhiding" value="置顶排序"/>&nbsp;<font color='blue'>置顶排序</font> &nbsp;&nbsp;&nbsp;<font color='red'>新增的速约数据默认排在最前面</font></td>
			</tr>
			<tr>
				<td style="width:15%;">会员等级：</td>
				<td id="userSelect"></td>
			</tr>	
			<tr>
				<td>首页推荐:</td>
				<td>
					<label><input type="radio" class="ace" name="speedhomepage"  value="1"><span class="lbl">是</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="speedhomepage"  value="0" checked="checked"><span class="lbl">否</span></label>
				</td>
			</tr>
			<tr>
				<td><div id="picfilePicker">封面</div></td>
				<td>
					<img id="innerimg" width="100" height="100" nodedelete='false' modal='zoomImg'/>
					<input type="hidden" id="picsavePath" readonly="readonly" name="speedpics" >
				</td>
			</tr>
			<tr>
				<td><div id="filePicker">内容图</div></td>
				<td id="imagelist"></td>
			</tr>
			<tr>
				<td><font color="red">*</font>内容:</td>
				<td id="nr">
					<textarea  style="width:95%;height:190px" name="speedcontent" id="speedcontent"></textarea>
				</td>
			</tr>
		</table>
	</form>
</div>
</html>