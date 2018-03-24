$(function() {

	$("#speedstate").chosen();
	
//	$("#thebeginTime").datetimepicker({
//		format:'yyyy-mm-dd',language:'zh-CN',weekStart:1,todayBtn:1,autoclose: 1,todayHighlight: 1,startView: 2,minView:2,
//      }).on('changeDate', function(ev){
//    	  	var beginTime=$("#thebeginTime").val();
//    	  	$("#theendTime").datetimepicker('setStartDate',beginTime);
//    	 });
//	
//	$("#theendTime").datetimepicker({
//		format: 'yyyy-mm-dd',language:'zh-CN',weekStart: 1,todayBtn:1,autoclose:1,todayHighlight:1,startView:2,minView:2,
//	}).on('changeDate', function(ev){
//	  	var endTime=$("#theendTime").val();
//	  	$("#thebeginTime").datetimepicker('setEndDate',endTime);
//	 });
	
	 $("#thebeginTime").datetimepicker({//添加选择日期功能  
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
	  
	  $("#theendTime").datetimepicker({//添加选择日期功能  
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

	// 下拉框
	getbaseList();
	// 增加回车事件
	$("#baseForm").keydown(function(e) {
		keycode = e.which || e.keyCode;
		if (keycode == 13) {
			search();
		}
	});
	$('#addBtn').on(
			'click',
			function(e) {
				// 通知浏览器不要执行与事件关联的默认动作
				e.preventDefault();
				cleanForm();
				createselect();
				JY.Model.editwithsize("auDiv", "新增", 1000, 800, function() {
					if (JY.Validate.form("auForm")) {
						if($("#auForm input[name$='userid']").val()==""){
							JY.Model.error("请选择会员");
							return false;
						 }
						if($("#auForm textarea[name$='speedcontent']").val()==""){
							JY.Model.error("请填写速约内容");
							return false;
			    		}
							var savePath=$("#savePath").val();
					        var array=savePath.split(",");
					        if(array.length>9){
					        	JY.Model.error("最多上传9张内容图片");
					        	return false;
					        }
						if($("#picsavePath").val()==""){
							JY.Model.error("请选择封面图片");
							return false;
						}
						
						var that = $(this);
						JY.Ajax.doRequest("auForm", jypath+ '/backstage/speedabout/add', null, function(data) {
							that.dialog("close");
							layer.msg(data.resMsg);search();
						});
					}
				});
			});

	// 清除
	$('#reset').on('click', function(e) {
		// 通知浏览器不要执行与事件关联的默认动作
		e.preventDefault();
		$("#thebeginTime").val("");
		$("#theendTime").val("");
		$("#baseForm input[name$='keyWord']").val("");
		$("#baseForm input[name$='userclassesid']").val("");
	});
	
	$( "#userid" ).autocomplete({    
        source: function( request, response ) {  
              $.ajax({    
                  url: jypath +'/backstage/account/findauto',    
                  data:{"name": $("#userid").val()},  
                  type: "POST",    
                  dataType: "json",    
                  success: function(data){   
               	       var dataArray=[]; 
                   	   var reslist = data.obj; 
                   	   
                   	   response($.map(reslist,function(item){  
                              var name = item.name;  
                              return {  
                            	  label:"【昵称】"+JY.Object.notEmpty(item.name)+"  【手机号】"+JY.Object.notEmpty(item.phone)+"  【会员编号】"+JY.Object.notEmpty(item.loginName),//下拉框显示值  
                                  value:item.loginName,//选中后，填充到下拉框的值  
                                  id:item.accountId//选中后，填充到id里面的值  
                              }  
                          }));  
                  }    
          });   
        },
        max: 12,    //列表里的条目数  
        minChars: 1,    //自动完成激活之前填入的最小字符  
        width: 400,     //提示的宽度，溢出隐藏  
        scrollHeight: 300,   //提示的高度，溢出显示滚动条  
        matchContains: false,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示  
        autoFill: true,    //自动填充  
        minLength: 0,
        select : function(event, ui) {  
            JY.Ajax.doRequest(null,jypath +'/backstage/account/findauto',{accountId:ui.item.id},function(data){
        		var reslist = data.obj; 
        		for(var i=0; i<reslist.length; i++){ 
                    var vo = reslist[i]; 
                    $("#auForm input[name$='xingquaihao']").val(JY.Object.notEmpty(vo.xingquaihao));
                	$("#auForm input[name$='zhiye']").val(JY.Object.notEmpty(vo.zhiye));
                	$("#auForm input[name$='speedcity']").val(JY.Object.notEmpty(vo.speedcity));
                	$("#auForm input[name$='nianling']").val(JY.Object.notEmpty(vo.nianling));
                	$("#auForm input[name$='shengao']").val(JY.Object.notEmpty(vo.shengao));
                	$("#auForm input[name$='tizhong']").val(JY.Object.notEmpty(vo.tizhong));
                	$("#auForm input[name$='xingzuo']").val(JY.Object.notEmpty(vo.xingzuo));
                	$("#auForm input[name$='gexingqianming']").val(JY.Object.notEmpty(vo.gexingqianming));
                	$("#auForm input[name$='userid']").val(JY.Object.notEmpty(vo.accountId));
                	$("#auForm input[name$='sex']").val(JY.Object.notEmpty(vo.sex));
                	$("#auForm input[name$='loginName']").val(JY.Object.notEmpty(vo.loginName));
                	$("#auForm input[name$='zuojia']").val(JY.Object.notEmpty(vo.zuojia));
                	
                	var checked=JY.Object.notEmpty(vo.sex);
                 	if(checked=="1"){
                 		$("#thesex").html("男");
                 	}else{
                 		$("#thesex").html("女");
                 	}
                	
                	$("#auForm input[name$='screen'][value='"+(JY.Object.notNull(vo.screen)?vo.screen:"0")+"']").parent("label").trigger("click");
                	
                	$("#userSelect").empty();
                	$("#userSelect").append("<select  name='userclassesid' id='userclassesid' style='width:75%;'></select>");
                	JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/findauto',{sex:vo.sex},function(data){
                		var reslist = data.obj; 
                		var theselect=$("#userclassesid");
                		for(var i=0; i<reslist.length; i++){ 
                            var thevo = reslist[i]; 
                            if(typeof(vo)=="undefined"){
                            	theselect.append("<option value='" + thevo.ids + "'>" + thevo.classesname + "</option>");
                            }else{
                            	 if(thevo.ids==vo.userclassesid){
                                 	theselect.append("<option value='" + thevo.ids + "' selected='selected'>" + thevo.classesname + "</option>");
                                 }else{
                                 	theselect.append("<option value='" + thevo.ids + "'>" + thevo.classesname + "</option>");
                                 }
                            }
                        }
                		theselect.chosen();
                		theselect.trigger("liszt:updated");
                	});
                	
                }
        	});
        } 
    }); 
});

function search() {
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init) {
	if (init == 1)
		$("#baseForm .pageNum").val(1);
	JY.Model.loading();
	JY.Ajax
			.doRequest(
					"baseForm",
					jypath + '/backstage/speedabout/findByPage',
					null,
					function(data) {
						$("#baseTable tbody").empty();
						var obj = data.obj;
						var list = obj.list;
						var results = list.results;
						var permitBtn = obj.permitBtn;
						var pageNum = list.pageNum, pageSize = list.pageSize, totalRecord = list.totalRecord;
						var html = "";
						if (results != null && results.length > 0) {
							var leng = (pageNum - 1) * pageSize;// 计算序号
							for (var i = 0; i < results.length; i++) {
								var l = results[i];
								html += "<tr>";
								html += "<td class='center'>"+ (i+leng+1) + "</td>";
								html += "<td class='center'>"+ JY.Object.notEmpty(l.speednumber)+ "</td>";
								html += "<td class='center'>"+ JY.Object.notEmpty(l.loginName) + "</td>";
//								html += "<td class='center'>"+ JY.Object.notEmpty(l.beginTime)+ "</td>";
//								html += "<td class='center'>"+ JY.Object.notEmpty(l.endTime)+ "</td>";
//								if (l.speedtype == "1")
//									html += "<td class='center'><font color='green'>官方推荐</font></td>";
//								else
//									html += "<td class='center'><font color='red'>自主发布</font></td>";
								html+="<td class='center'><font color='red'>"+JY.Object.notEmpty(l.handspeedwhere=="全部"?"【海外全部】":l.handspeedwhere)+"</font>&nbsp;<font color='blue'>"+JY.Object.notEmpty(l.speedwhere=="全部"?"【国内全部】":l.speedwhere)+"</font></td>";

								if (l.speedstate == "1")
									html += "<td class='center'>救火</td>";
								if (l.speedstate == "2")
									html += "<td class='center'>征求</td>";
								if (l.speedstate == "3")
									html += "<td class='center'>急约</td>";
								if (l.speedstate == "4")
									html += "<td class='center'>旅行约</td>";

								if (l.speedhomepage == "1")
									html += "<td class='center'><span class='label label-sm label-success'>是</span></td>";
								else
									html += "<td class='center'><span class='label label-sm arrowed-in'>否</span></td>";
								html += JY.Tags.setFunction(l.ids, permitBtn);
								html += "</tr>";
							}
							$("#baseTable tbody").append(html);
							JY.Page.setPage("baseForm", "pageing", pageSize,
									pageNum, totalRecord, "getbaseList");
						} else {
							html += "<tr><td colspan='7' class='center'>没有相关数据</td></tr>";
							$("#baseTable tbody").append(html);
							$("#pageing ul").empty();// 清空分页
						}

						JY.Model.loadingClose();
					});
}

function del(ids) {
	JY.Model.confirm("确认删除吗？", function() {
		JY.Ajax.doRequest(null, jypath + '/backstage/speedabout/del', {
			ids : ids
		}, function(data) {
			layer.msg(data.resMsg);search();
		});
	});
}

function check(ids) {
	cleanFormmakesure();
	JY.Ajax.doRequest(null, jypath + '/backstage/speedabout/find', {
		ids : ids
	}, function(data) {
		setFormmakesure(data);
		JY.Model.editwithsizemakesure("makesure", "审核", 1000, 800, function() {
			if (JY.Validate.form("makesureForm")) {
				var that = $(this);
				JY.Ajax.doRequest("makesureForm", jypath
						+ '/backstage/speedabout/updateshenhe', {
					ids : ids,
					speedmakesure : 1
				}, function(data) {
					that.dialog("close");
					 layer.msg("审核通过");search();
				});
			}
		}, function() {
			if (JY.Validate.form("makesureForm")) {
				var that = $(this);
				JY.Ajax.doRequest("makesureForm", jypath
						+ '/backstage/speedabout/updateshenhe', {
					ids : ids,
					speedmakesure : 0
				}, function(data) {
					that.dialog("close");
					 layer.msg("审核不通过");search();
				});
			}
		});
	});
}

function edit(ids) {
	cleanForm();
	JY.Ajax.doRequest(null, jypath + '/backstage/speedabout/find', {
		ids : ids
	}, function(data) {
		setForm(data);
		createselect(data.obj);
		JY.Model.editwithsize("auDiv", "修改", 1000, 800, function() {
			if (JY.Validate.form("auForm")) {
				var that = $(this);
				if($("#auForm input[name$='userid']").val()==""){
					JY.Model.error("请选择会员");
					return false;
				 }
				if($("#auForm textarea[name$='speedcontent']").val()==""){
					JY.Model.error("请填写速约内容");
					return false;
	    		}
				var savePath=$("#savePath").val();
		        var array=savePath.split(",");
		        if(array.length>9){
		        	JY.Model.error("最多上传9张内容图片");
		        	return false;
		        }
				if($("#picsavePath").val()==""){
					JY.Model.error("请选择封面图片");
					return false;
				}
				JY.Ajax.doRequest("auForm", jypath
						+ '/backstage/speedabout/update', null, function(data) {
					that.dialog("close");
					layer.msg(data.resMsg);search();
				});
			}
		});
	});
}

////////////////////////////////////////////////////////////cleanFormmakesure////////////////////////////////////////////////////////////
function cleanFormmakesure() {
	JY.Tags.d6cleanForm("makesureForm");
	$("#makesureinnerimg").attr("src", jypath +"/static/images/system/d6wait.png");
	$("#makesurecity").html("");
	$("#makesurezhiye").html("");
	$("#makesurename").html("");
	$("#makesurenianling").html("");
	$("#makesureshengao").html("");
	$("#makesuretizhong").html("");
	$("#makesurexingzuo").html("");
	$("#makesuregexingqianming").html("");
	$("#makesureclassesname").html("");
	$("#makesurecreateTime").html("");
	$("#makesuresex").html("");
	$("#makesurespeedcontent").val("");
	
	$("#makesurespeedmakesure").html("审核通过");
}
////////////////////////////////////////////////////////////cleanForm////////////////////////////////////////////////////////////
function cleanForm() {
	JY.Tags.d6cleanForm("auForm");
	$("#auForm input[name$='speednumber']").val("");
	$("#auForm input[name$='speedtype']").val("1");
	$("#imagelist").empty();
	$("#thesex").html("男");
	$("#auForm input[name$='speedstate'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='speedhomepage'][value='0']").parent("label").trigger("click");
	$("#auForm input[name$='screen'][value='0']").parent("label").trigger("click");
	$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#userid").removeAttr("disabled");
	$("#auForm input[name$='speedorder']").val((new Date()).valueOf());
	$("#zhiding").prop("checked",false);
	batch();
	//ue.setContent("");
}
////////////////////////////////////////////////////////////deleteimage////////////////////////////////////////////////////////////
function deleteimage(obj) {
	var savePath = $("#savePath").val();
	var deletepath = $(obj).attr("src");
	if (savePath.indexOf(deletepath) == 0) {
		savePath = savePath.replace(deletepath + ",", "");
		savePath = savePath.replace(deletepath, "");
	} else {
		savePath = savePath.replace("," + deletepath, "");
	}
	$(obj).remove();
	$("#savePath").val(savePath);
}
// //////////////////////////////////////////////////////////setFormmakesure////////////////////////////////////////////////////////////
function setFormmakesure(data) {
	var l = data.obj;

	$("#makesurespeednumber").html(l.speednumber);
	$("#makesurecity").html(l.speedcity);
	$("#makesurezhiye").html(JY.Object.notEmpty(l.zhiye));
	$("#makesurename").html(JY.Object.notEmpty(l.name));
	$("#makesurenianling").html(JY.Object.notEmpty(l.nianling));
	$("#makesureshengao").html(JY.Object.notEmpty(l.shengao));
	$("#makesuretizhong").html(JY.Object.notEmpty(l.tizhong));
	$("#makesurexingzuo").html(JY.Object.notEmpty(l.xingzuo));
	$("#makesuregexingqianming").html(JY.Object.notEmpty(l.gexingqianming));

	$("#makesureclassesname").html(JY.Object.notEmpty(l.classesname));
	$("#makesurecreateTime").html(JY.Object.notEmpty(l.createTime));
	if (l.sex == "1")
		$("#makesuresex").html("男");
	else
		$("#makesuresex").html("女");

	
	$("#makesurespeedcontent").val(l.speedcontent);
	
	if(l.speedpics==null||l.speedpics==""){
		$("#makesureinnerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#makesureinnerimg").attr("src",l.speedpics);
	}
	
	if(l.speedmakesure=="1")
	$("#makesurespeedmakesure").html("审核通过");
	else
	$("#makesurespeedmakesure").html("审核不通过");
	
	batch();
}
// //////////////////////////////////////////////////////////setform////////////////////////////////////////////////////////////
function setForm(data) {
	var l = data.obj;
	$("#userid").attr("disabled","disabled");
	$("#auForm input[name$='ids']").val(l.ids);
	$("#auForm input[name$='speednumber']").val(l.speednumber);
	$("#auForm input[name$='userid']").val(l.userid);
	$("#auForm input[name$='speedorder']").val(l.speedorder);
	$("#auForm input[name$='speedtype']").val(l.speedtype);
	$("#auForm input[name$='xingquaihao']").val(JY.Object.notEmpty(l.xingquaihao));
	$("#auForm input[name$='zhiye']").val(JY.Object.notEmpty(l.zhiye));
	$("#auForm input[name$='speedcity']").val(JY.Object.notEmpty(l.speedcity));
	$("#auForm input[name$='nianling']").val(JY.Object.notEmpty(l.nianling));
	$("#auForm input[name$='shengao']").val(JY.Object.notEmpty(l.shengao));
	$("#auForm input[name$='tizhong']").val(JY.Object.notEmpty(l.tizhong));
	$("#auForm input[name$='sex']").val(JY.Object.notEmpty(l.sex));
	$("#auForm input[name$='xingzuo']").val(JY.Object.notEmpty(l.xingzuo));
	$("#auForm input[name$='gexingqianming']").val(JY.Object.notEmpty(l.gexingqianming));
	$("#auForm input[name$='screen'][value='"+(JY.Object.notNull(l.screen)?l.screen:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='beginTime']").val(JY.Object.notEmpty(l.beginTime));
	$("#auForm input[name$='endTime']").val(JY.Object.notEmpty(l.endTime));
	$("#auForm input[name$='zuojia']").val(JY.Object.notEmpty(l.zuojia));

	var checked = JY.Object.notEmpty(l.speedstate);
	if (checked == "1") {
		$("#auForm input[name$='speedstate'][value='1']").parent("label").trigger("click");
	}
	if (checked == "2") {
		$("#auForm input[name$='speedstate'][value='2']").parent("label").trigger("click");
	}
	if (checked == "3") {
		$("#auForm input[name$='speedstate'][value='3']").parent("label").trigger("click");
	}
	if (checked == "4") {
		$("#auForm input[name$='speedstate'][value='4']").parent("label").trigger("click");
	}

	if(l.sex=="1")
	$("#thesex").html("男");
	else
	$("#thesex").html("女");

	$("#auForm input[name$='speedhomepage'][value='"+ (JY.Object.notNull(l.speedhomepage) ? l.speedhomepage: "0") + "']").parent("label").trigger("click");

//	ue.addListener('ready', function(editor) {
//		ue.setContent(JY.Object.notEmpty(l.speedcontent));
//	});
//	ue.setContent(JY.Object.notEmpty(l.speedcontent));
	
	$("#auForm textarea[name$='speedcontent']").val(l.speedcontent);

	$("#imagelist").empty();
	
	if (l.coverurl != null&&l.coverurl!="") {
		var coverurlarray = l.coverurl.split(",");
		for (var i = 0; i < coverurlarray.length; i++) {
			$("#imagelist").append("<img  width='100' height='100' src='" + coverurlarray[i]+ "' nodedelete='true' modal='zoomImg'/> ");
		}
	}

	$("#auForm input[name$='coverurl']").val(JY.Object.notEmpty(l.coverurl));
	$("#auForm input[name$='speedpics']").val(JY.Object.notEmpty(l.speedpics));
	
	if(l.speedpics==null||l.speedpics==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#innerimg").attr("src",l.speedpics);
	}
	
	batch();
}
// //////////////////////////////////////////////////////////createselect////////////////////////////////////////////////////////////
function createselect(l) {
	$("#userSelect").empty();
	$("#userSelect").append("<select  name='userclassesid' id='userclassesid' style='width:75%;'></select>");
	JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/findauto',{sex:typeof(l)=="undefined"?1:l.sex},function(data){
		var reslist = data.obj; 
		var theselect=$("#userclassesid");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
            }else{
            	 if(vo.ids==l.userclassesid){
                 	theselect.append("<option value='" + vo.ids + "' selected='selected'>" + vo.classesname + "</option>");
                 }else{
                 	theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
                 }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
	
	$("#guoneidiqu").empty();
	$("#guoneidiqu").append("<select  name='speedwhere' id='speedwhere' multiple='multiple' style='width:65%;'></select> ");
	
	$("#guowaidiqu").empty();
	$("#guowaidiqu").append("<select  name='handspeedwhere' id='handspeedwhere' multiple='multiple' style='width:65%;'></select> ");
	
	if(typeof(l)!="undefined"){
		$("#userid").val(l.loginName);
	}
	
	if(typeof(l)!="undefined"&&l.speedwhere!=null&&l.speedwhere=="全部"){
		$("#gnquanbu").prop("checked", true);
	}
	else{
		$("#gnquanbu").prop("checked",false);
	}
	
	if(typeof(l)!="undefined"&&l.handspeedwhere!=null&&l.handspeedwhere=="全部"){
		$("#gwquanbu").prop("checked", true);
	}
	else{
		$("#gwquanbu").prop("checked",false);
	}

	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/findauto',{paramKey:0},function(data){
		var reslist = data.obj; 
		var theselect=$("#speedwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.speedwhere!=null&&l.speedwhere.indexOf(vo.paramName)>=0){
                	theselect.append("<option value='" + vo.paramName + "' selected='selected'>" + vo.paramName + "</option>");
                }else{
                	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
                }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
	
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/findauto',{paramKey:1},function(data){
		var reslist = data.obj; 
		var theselect=$("#handspeedwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.handspeedwhere!=null&&l.handspeedwhere.indexOf(vo.paramName)>=0){
                	theselect.append("<option value='" + vo.paramName + "' selected='selected'>" + vo.paramName + "</option>");
                }else{
                	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
                }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
}
