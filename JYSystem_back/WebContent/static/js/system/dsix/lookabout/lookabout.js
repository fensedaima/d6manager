$(function () {
	
	$("#lookstate").chosen(); 
	
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
	
	//下拉框
	getbaseList();
	//增加回车事件
	$("#baseForm").keydown(function(e){
		 keycode = e.which || e.keyCode;
		 if (keycode==13) {
			 search();
		 } 
	});
	$('#addBtn').on('click', function(e) {
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		cleanForm();	
		createselect();
	    JY.Model.editwithsize("auDiv","新增",1000,800,function(){
			 if(JY.Validate.form("auForm")){
				 if($("#auForm input[name$='userid']").val()==""){
					JY.Model.error("请选择会员");
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
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/lookabout/add',null,function(data){
					 that.dialog("close");
				     layer.msg(data.resMsg);search();
				 });
			 }	
		});
	});
	
	
	//清除
	$('#reset').on('click', function(e){
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
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
                 	$("#auForm input[name$='city']").val(JY.Object.notEmpty(vo.city));
                 	$("#auForm input[name$='nianling']").val(JY.Object.notEmpty(vo.nianling));
                 	$("#auForm input[name$='shengao']").val(JY.Object.notEmpty(vo.shengao));
                 	$("#auForm input[name$='tizhong']").val(JY.Object.notEmpty(vo.tizhong));
                 	$("#auForm input[name$='xingzuo']").val(JY.Object.notEmpty(vo.xingzuo));
                 	$("#auForm input[name$='gexingqianming']").val(JY.Object.notEmpty(vo.gexingqianming));
                 	$("#auForm textarea[name$='duifangyaoqiu']").val(JY.Object.notEmpty(vo.duifangyaoqiu));
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
                 	createselect(vo);
                 }
         	});
         } 
     });    	 
});

function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init){
	if(init==1)$("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/lookabout/findByPage',null,function(data){
		 $("#baseTable tbody").empty();
        	 var obj=data.obj;
        	 var list=obj.list;
        	 var results=list.results;
        	 var permitBtn=obj.permitBtn;
         	 var pageNum=list.pageNum,pageSize=list.pageSize,totalRecord=list.totalRecord;
        	 var html="";
    		 if(results!=null&&results.length>0){
        		 var leng=(pageNum-1)*pageSize;//计算序号
        		 for(var i = 0;i<results.length;i++){
            		 var l=results[i];
            		 html+="<tr>";
            		 html+="<td class='center'>"+(i+leng+1)+"</td>";
            		 html+="<td class='center'>"+l.loginName+"</td>";
            		 html+="<td class='center'>"+l.name+"</td>";
//            		 if(l.looktype=="1")
//            		     html+="<td class='center'><font color='green'>官方推荐</font></td>";
//            		 else
//            			 html+="<td class='center'><font color='red'>自主发布</font></td>";
            		 html+="<td class='center'><font color='red'>"+JY.Object.notEmpty(l.userhandlookwhere=="全部"?"【海外全部】":l.userhandlookwhere)+"</font>&nbsp;<font color='blue'>"+JY.Object.notEmpty(l.userlookwhere=="全部"?"【国内全部】":l.userlookwhere)+"</font></td>";
            		 
            		 if(l.lookstate=="1")
            		     html+="<td class='center'>未选择</td>";
            		 if(l.lookstate=="2")
            			 html+="<td class='center'>已觅约</td>";
            		 if(l.lookstate=="3")
            			 html+="<td class='center'>已下线</td>";
            		 if(l.lookstate=="4")
            			 html+="<td class='center'>私下推荐</td>";
            		 
            		 if(l.lookhomepage=="1")
            		     html+="<td class='center'><span class='label label-sm label-success'>是</span></td>";
            		 else
            			 html+="<td class='center'><span class='label label-sm arrowed-in'>否</span></td>";
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getbaseList");
        	 }else{
        		html+="<tr><td colspan='7' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
 	 
    	 JY.Model.loadingClose();
	 });
}

function del(ids){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/lookabout/del',{ids:ids},function(data){
			layer.msg(data.resMsg);search();
		});
	});
}

function check(ids){
	cleanFormmakesure();
	JY.Ajax.doRequest(null,jypath +'/backstage/lookabout/find',{ids:ids},function(data){
		setFormmakesure(data);
	    JY.Model.editwithsizemakesure("makesure","审核",1000,800,function(){
	    	if(JY.Validate.form("makesureForm")){
				var that =$(this);
				JY.Ajax.doRequest("makesureForm",jypath +'/backstage/lookabout/update',{ids:ids,lookmakesure:1},function(data){
				    that.dialog("close");
				    layer.msg("审核通过");search();
				});
			}	
	    },
	    function(){
	    	if(JY.Validate.form("makesureForm")){
				var that =$(this);
				JY.Ajax.doRequest("makesureForm",jypath +'/backstage/lookabout/update',{ids:ids,lookmakesure:0},function(data){
				    that.dialog("close");
				    layer.msg("审核不通过");search();
				});
			}	
	    }
	    );    
	});
}

function edit(ids){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/lookabout/find',{ids:ids},function(data){
	    setForm(data);   
	    createselect(data.obj);
	    JY.Model.editwithsize("auDiv","修改",1000,800,function(){
	    	if(JY.Validate.form("auForm")){
				var that =$(this);
				    if($("#auForm input[name$='userid']").val()==""){
						JY.Model.error("请选择会员");
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
				JY.Ajax.doRequest("auForm",jypath +'/backstage/lookabout/update',null,function(data){
				    that.dialog("close");
				    layer.msg(data.resMsg);search();
				});
			}	
	    });
	});
}

////////////////////////////////////////////////////////////cleanFormmakesure////////////////////////////////////////////////////////////
function cleanFormmakesure(){
	JY.Tags.d6cleanForm("makesureForm");
	$("#makesureinnerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#makesurecity").html("");
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
	$("#makesurelookmakesure").html("");
}
////////////////////////////////////////////////////////////cleanForm////////////////////////////////////////////////////////////
function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#auForm input[name$='looktype']").val("1");
	$("#imagelist").empty();
	$("#thesex").html("男");
	$("#auForm input[name$='lookstate'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='lookhomepage'][value='0']").parent("label").trigger("click");
	$("#auForm input[name$='screen'][value='0']").parent("label").trigger("click");
	$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#userid").removeAttr("disabled");
	$("#auForm input[name$='lookorder']").val((new Date()).valueOf());
	$("#zhiding").prop("checked",false);
	batch();
	//ue.setContent("");
}
////////////////////////////////////////////////////////////deleteimage////////////////////////////////////////////////////////////
function deleteimage(obj){
	var savePath=$("#savePath").val();
	var deletepath=$(obj).attr("src");
	if(savePath.indexOf(deletepath)==0){
		savePath=savePath.replace(deletepath+",","");
		savePath=savePath.replace(deletepath,"");
	}else{
		savePath=savePath.replace(","+deletepath,"");
	}
	$(obj).remove();
	$("#savePath").val(savePath);
}
// //////////////////////////////////////////////////////////setFormmakesure////////////////////////////////////////////////////////////
function setFormmakesure(data){
	var l=data.obj;
	
	$("#makesureloginName").html(l.loginName);
	$("#makesurecity").html(l.city);
	$("#makesurezhiye").html(JY.Object.notEmpty(l.zhiye));
	$("#makesurename").html(JY.Object.notEmpty(l.name));
	$("#makesurenianling").html(JY.Object.notEmpty(l.nianling));
	$("#makesureshengao").html(JY.Object.notEmpty(l.shengao));
	$("#makesuretizhong").html(JY.Object.notEmpty(l.tizhong));
	$("#makesurexingzuo").html(JY.Object.notEmpty(l.xingzuo));
	$("#makesuregexingqianming").html(JY.Object.notEmpty(l.gexingqianming));
	$("#makesureclassesname").html(JY.Object.notEmpty(l.classesname));
	$("#makesurecreateTime").html(JY.Object.notEmpty(l.createTime));
	
	if(l.sex=="1")
	$("#makesuresex").html("男");
	else
	$("#makesuresex").html("女");
	
	if(l.lookpics==null||l.lookpics==""){
		$("#makesureinnerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#makesureinnerimg").attr("src",l.lookpics);
	}
	
	if(l.lookmakesure=="1")
	$("#makesurelookmakesure").html("审核通过");
	else
	$("#makesurelookmakesure").html("审核不通过");
	
	batch();
}
////////////////////////////////////////////////////////////setform////////////////////////////////////////////////////////////
function setForm(data){
	var l=data.obj;
	 $("#userid").attr("disabled","disabled");
	 $("#auForm input[name$='ids']").val(l.ids);
	 $("#auForm textarea[name$='duifangyaoqiu']").val(l.duifangyaoqiu);
	 $("#auForm input[name$='userid']").val(l.userid);
	 $("#auForm input[name$='lookorder']").val(l.lookorder);
	 $("#auForm input[name$='looktype']").val(l.looktype);
	$("#auForm input[name$='xingquaihao']").val(JY.Object.notEmpty(l.xingquaihao));
	$("#auForm input[name$='zhiye']").val(JY.Object.notEmpty(l.zhiye));
	$("#auForm input[name$='city']").val(JY.Object.notEmpty(l.city));
	$("#auForm input[name$='nianling']").val(JY.Object.notEmpty(l.nianling));
	$("#auForm input[name$='shengao']").val(JY.Object.notEmpty(l.shengao));
	$("#auForm input[name$='tizhong']").val(JY.Object.notEmpty(l.tizhong));
	$("#auForm input[name$='screen'][value='"+(JY.Object.notNull(l.screen)?l.screen:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='xingzuo']").val(JY.Object.notEmpty(l.xingzuo));
	$("#auForm input[name$='gexingqianming']").val(JY.Object.notEmpty(l.gexingqianming));
	$("#auForm input[name$='sex']").val(JY.Object.notEmpty(l.sex));
	$("#auForm input[name$='zuojia']").val(JY.Object.notEmpty(l.zuojia));
	
	var checked=JY.Object.notEmpty(l.lookstate);
	if(checked=="1"){
		$("#auForm input[name$='lookstate'][value='1']").parent("label").trigger("click");
	}
	if(checked=="2"){
		$("#auForm input[name$='lookstate'][value='2']").parent("label").trigger("click");
	}
	if(checked=="3"){
		$("#auForm input[name$='lookstate'][value='3']").parent("label").trigger("click");
	}
	if(checked=="4"){
		$("#auForm input[name$='lookstate'][value='4']").parent("label").trigger("click");
	}
	
	
	if(l.sex=="1")
	$("#thesex").html("男");
	else
	$("#thesex").html("女");
	
	$("#auForm input[name$='lookhomepage'][value='"+(JY.Object.notNull(l.lookhomepage)?l.lookhomepage:"0")+"']").parent("label").trigger("click");
	
	if(l.lookpics==null||l.lookpics==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#innerimg").attr("src",l.lookpics);
	}
	
	$("#imagelist").empty();
	if(l.coverurl!=null&&l.coverurl!=""){
		var coverurlarray=l.coverurl.split(",");
		for(var i=0;i<coverurlarray.length;i++){
			$("#imagelist").append("<img  width='100' height='100' nodedelete='true' modal='zoomImg' src='"+coverurlarray[i]+"'/> ");
		}
	}
	
	$("#auForm input[name$='coverurl']").val(JY.Object.notEmpty(l.coverurl));
	$("#auForm input[name$='lookpics']").val(JY.Object.notEmpty(l.lookpics));
	
	batch();
}
////////////////////////////////////////////////////////////createselect////////////////////////////////////////////////////////////
function createselect(l){
	
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
	$("#guoneidiqu").append("<select  name='userlookwhere' id='userlookwhere' multiple='multiple' style='width:65%;'></select> ");
	
	$("#guowaidiqu").empty();
	$("#guowaidiqu").append("<select  name='userhandlookwhere' id='userhandlookwhere' multiple='multiple' style='width:65%;'></select> ");
	
	if(typeof(l)!="undefined"){
		$("#userid").val(l.loginName);
	}
	
	if(typeof(l)!="undefined"&&l.userlookwhere!=null&&l.userlookwhere=="全部"){
		$("#gnquanbu").prop("checked", true);
	}
	else{
		$("#gnquanbu").prop("checked",false);
	}
	
	if(typeof(l)!="undefined"&&l.userhandlookwhere!=null&&l.userhandlookwhere=="全部"){
		$("#gwquanbu").prop("checked", true);
	}
	else{
		$("#gwquanbu").prop("checked",false);
	}
	
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/findauto',{paramKey:0},function(data){
		var reslist = data.obj; 
		var theselect=$("#userlookwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.userlookwhere!=null&&l.userlookwhere.indexOf(vo.paramName)>=0){
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
		var theselect=$("#userhandlookwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.userhandlookwhere!=null&&l.userhandlookwhere.indexOf(vo.paramName)>=0){
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
