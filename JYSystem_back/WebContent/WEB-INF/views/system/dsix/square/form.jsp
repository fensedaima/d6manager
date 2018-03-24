<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="${jypath}/static/plugins/webuploader/css/webuploader.css" />
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
		        fileSingleSizeLimit: 4 * 1024 * 1024 ,   // 单文件的最大限制1M  
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
		})
		</script> 
<div id="auDiv" hidden="true" align="left">
	<form id="auForm" method="POST" onsubmit="return false;" >
		<td colspan="2" class="ui-state-error">
		<input type="hidden" name="ids" >
		<input type="hidden" name="userid">
		<input type="hidden" id="savePath" readonly="readonly" name="coverurl" >
		</td>
		<table id="table_report" class="table table-striped table-bordered table-hover" >
			<tr>
				<td style="width:15%;"><font color="red">*</font>选择会员：</td>
				<td><input type="text" jyValidate="required" style="width:70%;" id="userid" maxlength="15" placeholder="会员昵称" title="会员昵称"/>&nbsp;&nbsp;&nbsp;<font color='red'>输入会员昵称自动匹配</font></td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>文章标题：</td>
				<td><input  type="text" jyValidate="required" style="width:95%;" name="title" id="title" maxlength="70" placeholder="这里输入标题" title="标题"/></td>
			</tr>
			<tr>
				<td style="width:15%;">广场分类：</td>
				<td id="squareSelect"></td>
			</tr>
			<tr>
				<td style="width:15%;">首页推荐:</td>
				<td>
					<label> <input class="ace" type="radio" name="homepagerecommend" value="1" checked="checked"> <span class="lbl">是</span></label> 
					<label> <input class="ace" type="radio" name="homepagerecommend" value="0"> <span class="lbl">否</span></label> 
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>排序:</td>
				<td><input type="number" style="width:70%;" jyValidate="required,numrangeth" name="orders" min='1' max='99999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
			</tr>
			<tr>
				<td><div id="picfilePicker">封面</div></td>
				<td>
					<img id="innerimg" width="100" height="100" nodedelete='false' modal='zoomImg'/>
					<input type="hidden" id="picsavePath" readonly="readonly" name="squarepics" >
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><div id="filePicker">内容图</div></td>
				<td id="imagelist"></td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>文章内容:</td>
				<td id="nr">
					<textarea  style="width:95%;height:190px" name="content" id="content"></textarea>
				</td>
			</tr>
		</table>
	</form>
</div>
</html>