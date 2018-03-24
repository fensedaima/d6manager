<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="${jypath}/static/plugins/webuploader/css/webuploader.css" />
<script src="${jypath}/static/plugins/webuploader/js/webuploader.nolog.min.js"></script>
<style>  
    #filePicker div:nth-child(2){width:100%!important;height:100%!important;}  
</style>
		    
		 	<script type="text/javascript">
		jQuery(function() {
			
			 var options = {
				        host : "http://upload.qiniu.com",
				        tokenUrl : jypath +'/backstage/tool/webuploader/getqiniutoken',
				        mockToken : false,
				       mockTokenValue : "tdTCtQ1EIxHeCI_NB3qk0k3fKUeG-5yxux32K6x2:upyyqkQPYIrAhrJSgHiBbgF2vT8=:eyJzY29wZSI6Imp5c3lzdGVtIiwiZGVhZGxpbmUiOjE1MTUyMjI2MzN9",
				       hash : true
				    }
			 
		    var $ = jQuery,
		        // 优化retina, 在retina下这个值是2
		        ratio = window.devicePixelRatio || 1,
		        // 缩略图大小
		        thumbnailWidth = 100 * ratio,
		        thumbnailHeight = 100 * ratio,
		        // Web Uploader实例
		        uploader;
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
		   	    duplicate :true 
		    });
		    
		    uploader.onError = function( code ) {
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
		   
		    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
		    uploader.on('uploadSuccess', function(file,json) {
		    	var imgsrc="http://p22l7xdxa.bkt.clouddn.com/"+json.key;
		        	$("#innerimg").attr("src",imgsrc);
		        	$("#savePath").val(imgsrc);
		        	batch();
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
		})
		</script> 
		
<div id="kfDiv" hidden="true" align="left">
		<form id="kfForm" method="POST" onsubmit="return false;" >
			<table  id="table_report" class="table table-striped table-bordered table-hover">
					<tr style="display:none">
						<td colspan="2"><input type="hidden" name="ids" >
						</td>
					</tr>		
					<tr>
						<td style="width:15%;"><font color="red">*</font>微信号：</td>
						<td >
						<input type="text" jyValidate="required"  maxlength="50" style="width:95%" name="kfName" ></td>
					</tr>
					<tr>
						<td ><div id="filePicker">头像</div></td>
						<td>
							<img id="innerimg" width="100" height="100" nodedelete='false' modal='zoomImg'/>
							<input type="hidden" id="savePath" readonly="readonly" name="kfPic" >
						</td>
					</tr>
					<tr>
						<td >微信类型:</td>
						<td>
							<label> <input class="ace" type="radio" name="status" value="1" checked="checked"> <span class="lbl">官方微信</span></label> 
							<label> <input class="ace" type="radio" name="status" value="0"> <span class="lbl">加盟微信</span></label> 
						</td>
					</tr>
					<tr >
						<td style="width:15%;">描述：</td>
						<td >
						<textarea rows="2" cols="10" maxlength="1000" style="width:95%;height:190px" name="description" multiline="true" ></textarea>
						</td>
					</tr> 
			
			</table>
		</form>
</div>
	
