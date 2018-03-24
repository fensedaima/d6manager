<%@ page contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="${jypath}/static/plugins/webuploader/css/webuploader.css" />
<script src="${jypath}/static/plugins/webuploader/js/webuploader.nolog.min.js"></script>
<style>  
    #filePicker div:nth-child(2){width:100%!important;height:100%!important;}  
</style> 
<style>  
     .edui-popup-content.edui-default{height: auto !important;}
</style> 

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
		   		fileNumLimit:9999,
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
		<td colspan="2" class="ui-state-error">
		<input type="hidden" name="ids" >
		<input type="hidden" name="createUser" >
		<input type="hidden" id="savePath" readonly="readonly" name="picUrl" >
		</td>
		<table id="table_report" class="table table-striped table-bordered table-hover">
			<tr>
				<td style="width:15%;"><font color="red">*</font>碎片标识：</td>
				<td><input type="text" jyValidate="required"  style="width:90%;" maxlength="70" name="piecesMark" id="piecesMark" value="" placeholder="这里输入标识" title="标识"/></td>
			</tr>
			<tr>
				<td><font color="red">*</font>标题：</td>
				<td><input type="text" jyValidate="required"  style="width:90%;" maxlength="500" name="title" id="title" value="" placeholder="这里输入标题" title="标题"/></td>
			</tr>
			<tr>
				<td><font color="red">*</font>关键字:</td>
				<td>
				<input type="text" jyValidate="required"   style="width:90%;" maxlength="500" name="keywork" id="keywork" value="" title="关键字"/>
				</td>
			</tr>
			<tr>
				<td>扩展1:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext1"  value="" title="扩展"/>
				</td>
			</tr>
			<tr>
				<td>扩展2:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext2"  value="" title="扩展"/>
				</td>
			</tr>
			<tr>
				<td>扩展3:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext3"  value="" title="扩展"/>
				</td>
			</tr>
			<tr>
				<td>扩展4:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext4"  value="" title="扩展"/>
				</td>
			</tr>
			<tr>
				<td>扩展5:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext5"  value="" title="扩展"/>
				</td>
			</tr>
			<tr>
				<td>扩展6:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext6"  value="" title="关键字"/>
				</td>
			</tr>
			<tr>
				<td>扩展7:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext7"  value="" title="关键字"/>
				</td>
			</tr>
			<tr>
				<td>扩展8:</td>
				<td>
				<input type="text"  style="width:90%;" maxlength="500" name="ext8"  value="" title="关键字"/>
				</td>
			</tr>
			<tr>
				<td>描述:</td>
				<td id="nr">
					<textarea  style="width:90%;height:80px" name="description" id="description"></textarea>
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><div id="filePicker">碎片图</div></td>
				<td id="imagelist"></td>
			</tr>
			<tr>
				<td>排序:</td>
				<td><input type="number" style="width:50%;" jyValidate="numrangeth" name="sortId" min='1' max='99999' maxlength="5" jyValidate="required,numrangeth" onkeyup='this.value=this.value.replace(/\D/g,&apos;&apos;)' >&nbsp;&nbsp;<font color="red">输入任意自然数</font></td>
			</tr>
			<tr>
				<td>内容说明:</td>
				<td id="nr">
					<textarea  style="width:68%;height:190px" name="content" id="content"></textarea>
				</td>
			</tr>
		</table>
	</form>
</div>
</html>