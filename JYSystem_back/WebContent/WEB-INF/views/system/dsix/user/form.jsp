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
		<input type="hidden" name="accountId" >
		<input type="hidden" name="roleId" value="11" >
		<table id="table_report" class="table table-striped table-bordered table-hover">
			<tr>
				<td style="width:15%;">手机号：</td>
				<td>
				<input type="text" maxlength="30" style="width:50%;" name="phone" id="phone"  placeholder="手机号" />
				<label><input type="radio" class="ace" name="guoneiguowai"  value="1" checked="checked"><span class="lbl">国内手机号</span></label>&nbsp;&nbsp;&nbsp;
				<label><input type="radio" class="ace" name="guoneiguowai"  value="0"><span class="lbl">国外手机号</span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;"><font color="red">*</font>会员编号：</td>
				<td><input type="text" jyValidate="required" maxlength="10" style="width:95%;" name="loginName" id="loginName"/></td>
			</tr>
			<tr>
				<td style="width:15%;">昵称：</td>
				<td><input type="text"  maxlength="40" style="width:95%;" name="name" id="name"  placeholder="昵称" /></td>
			</tr>
			<tr>
				<td style="width:15%;">邮箱：</td>
				<td><input type="text" jyValidate="email" style="width:95%;" maxlength="100" name="email" id="email"  placeholder="邮箱" /></td>
			</tr>
			<tr>
				<td style="width:15%;">密码：</td>
				<td><input type="text"  style="width:95%;" name="password" id="password"  placeholder="初始密码123abc" maxlength="16"/></td>
			</tr>
			<tr>
				<td style="width:15%;">确认密码：</td>
				<td><input type="text"  style="width:95%;" name="sruepassword" id="surepassword"  placeholder="确认密码" maxlength="16"/></td>
			</tr>
			<tr>
				<td style="width:15%;">会员等级：</td>
				<td id="userSelect"></td>
			</tr>	
			<tr>
				<td style="width:15%;">性别：</td>
				<td>
					<label><input type="radio" class="ace" name="sex" value="1" checked="checked"><span class="lbl">男</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="sex" value="0"><span class="lbl">女</span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;">兴趣爱好：</td>
				<td><input type="text"  style="width:95%;" name="xingquaihao" id="xingquaihao"  placeholder="兴趣爱好" title="兴趣爱好" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">职业：</td>
				<td><input type="text" style="width:95%;" name="zhiye" id="zhiye"  placeholder="职业" title="职业" maxlength="80" /></td>
			</tr>
			<tr>
				<td style="width:15%;">城市：</td>
				<td><input type="text"  style="width:95%;" name="city" id="city"  placeholder="城市" title="城市" maxlength="80"/></td>
			</tr>
			<tr>
				<td>交友标准：</td>
				<td>
				<textarea  style="width:95%;height:190px" name="duifangyaoqiu" id="duifangyaoqiu"></textarea>
				</td>
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
				<td style="width:15%;">年龄：</td>
				<td><input type="text" style="width:95%;" name="nianling" id="nianling"  placeholder="年龄" title="年龄" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">身高：</td>
				<td><input type="text" style="width:95%;" name="shengao" id="shengao"  placeholder="身高" title="身高" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">体重：</td>
				<td><input type="text" style="width:95%;" name="tizhong" id="tizhong"  placeholder="体重" title="体重" maxlength="80"/></td>
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
				<td style="width:15%;">自我介绍：</td>
				<td><input type="text" style="width:95%;" name="ziwojieshao" id="ziwojieshao"  placeholder="自我介绍" title="自我介绍" maxlength="80"/></td>
			</tr>
			<tr>
				<td style="width:15%;">座驾：</td>
				<td><input type="text" style="width:95%;" name="zuojia" id="zuojia"  placeholder="座驾" title="座驾" maxlength="200"/></td>
			</tr>
			<tr>
				<td><div id="filePicker">头像</div></td>
				<td>
					<img id="innerimg" width="100" height="100" nodedelete='false' modal='zoomImg'/>
					<input type="hidden" id="savePath" readonly="readonly" name="picUrl" >
				</td>
			</tr>
			<tr>
				<td style="width:15%;">审核状态：</td>
				<td>
					<label><input type="radio" class="ace" name="isValid"  value="1" checked="checked"><span class="lbl">通过</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="isValid"  value="0"><span class="lbl">拒绝</span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;">视频认证：</td>
				<td>
					<label><input type="radio" class="ace" name="screen"  value="1" ><span class="lbl">已经认证</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="screen"  value="0" checked="checked"><span class="lbl">没有认证</span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;">注册类型：</td>
				<td>
					<label><input type="radio" class="ace" name="zizhuhoutai"  value="1" checked="checked"><span class="lbl"><font color='red'>后台发布（解锁部分权限）</font></span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="zizhuhoutai"  value="0" ><span class="lbl"><font color='red'>自主注册（前台注册用户，锁定部分权限）</font></span></label>
				</td>
			</tr>
			<tr>
				<td style="width:15%;">广场发布：</td>
				<td>
					<label><input type="radio" class="ace" name="canpublishsquare"  value="1" checked="checked"><span class="lbl">可以发布广场</span></label>&nbsp;&nbsp;&nbsp;
					<label><input type="radio" class="ace" name="canpublishsquare"  value="0" ><span class="lbl">不可以发布广场</span></label>
				</td>
			</tr>
		</table>
	</form>
</div>
</html>