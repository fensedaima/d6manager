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
<div id="auDiv" hidden="true" align="left">
		<form id="auForm" method="POST" onsubmit="return false;" >
		<input type="hidden" name="ids" >
		<input type="hidden" id="savePath" readonly="readonly" name="coverurl" >
			<table id="table_report" class="table table-striped table-bordered table-hover">
				<tbody>
					<tr>
						<td ><font color="red">*</font>分类名称：</td>
						<td >
						<input type="text" style="width:95%;" jyValidate="required"  maxlength="8" name="classesname"></td>
					</tr>
					<tr>
						<td><font color="red">*</font>排序:</td>
						<td><input type="number" style="width:50%;" jyValidate="required,numrangeth" name="squareclassesorder" id="squareclassesorder" min='1' max='99999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
					</tr>
					<tr>
						<td><div id="filePicker">封面</div></td>
						<td>
							<img id="innerimg" width="100" height="100" nodedelete='false' modal='zoomImg'/>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
</div>
